const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create server
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: { origin: "*" }
});

// ================= MONGODB CONNECTION =================

// ⚠️ Use environment variable in production
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:harshini@cluster0.alt6u2l.mongodb.net/chat";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// ================= SCHEMA =================

const MessageSchema = new mongoose.Schema({
  content: String,
  timestamp: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  pinned: { type: Boolean, default: false }
});

const Message = mongoose.model("Message", MessageSchema);


// ================= ROUTES =================

// ✅ Root route (fix for "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// Send message
app.post("/send", async (req, res) => {
  if (!req.body.content) return res.status(400).send("Empty");

  const msg = new Message({ content: req.body.content });
  await msg.save();
  res.json(msg);
});

// Get messages
app.get("/messages", async (req, res) => {
  const msgs = await Message.find().sort({ timestamp: 1 });
  res.json(msgs);
});

// Delete for everyone
app.put("/delete/:id", async (req, res) => {
  await Message.findByIdAndUpdate(req.params.id, { deleted: true });
  res.send("Deleted");
});

// Pin message
app.put("/pin/:id", async (req, res) => {
  await Message.findByIdAndUpdate(req.params.id, { pinned: true });
  res.send("Pinned");
});


// ================= SOCKET =================

io.on("connection", (socket) => {

  console.log("User connected");

  socket.on("sendMessage", (msg) => {
    io.emit("receiveMessage", msg);
  });

  socket.on("deleteMessage", (id) => {
    io.emit("messageDeleted", id);
  });

  socket.on("pinMessage", (id) => {
    io.emit("messagePinned", id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

});


// ================= START SERVER =================

// ✅ IMPORTANT for Render
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});