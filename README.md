# 💬 Real-Time Chat Application

## 🚀 Overview

This is a full-stack **Real-Time Chat Application** built as part of the Adverayze hiring challenge.

The application supports:

* Sending and receiving messages
* Deleting messages (for self & for everyone)
* Pinning important messages
* Real-time updates using WebSockets

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Axios
* Socket.IO Client
* CSS (Custom styling)

### Backend

* Node.js
* Express.js
* Socket.IO
* MongoDB (Mongoose)

---

## 📁 Project Structure

```
chat-app/
 ├── backend/
 │    └── server.js
 └── frontend/
      └── frontend-app/
           ├── src/
           │    ├── App.jsx
           │    ├── App.css
           │    ├── main.jsx
           │    └── components/
           │         ├── ChatBox.jsx
           │         ├── Message.jsx
           │         ├── InputBox.jsx
           │         └── Pinned.jsx
```

---

## ⚙️ Backend Setup

### 1. Navigate to backend

```
cd backend
```

### 2. Install dependencies

```
npm install express mongoose cors socket.io
```

### 3. Start server

```
node server.js
```

### 4. Backend runs on:

```
http://localhost:5000
```

---

## 🎨 Frontend Setup

### 1. Navigate to frontend

```
cd frontend/frontend-app
```

### 2. Install dependencies

```
npm install
npm install axios socket.io-client
```

### 3. Start frontend

```
npm run dev
```

### 4. Open browser

```
http://localhost:5173
```

---

## 🔄 Application Flow

### 1. Sending Messages

* User enters message
* Frontend sends POST request → `/send`
* Backend stores message in MongoDB
* Socket emits event → all clients receive instantly

---

### 2. Receiving Messages (Real-Time)

* Socket listens for `receiveMessage`
* UI updates instantly without refresh

---

### 3. Delete for Everyone

* API call → `/delete/:id`
* Backend updates `deleted = true`
* Socket emits update → all users see "Message Deleted"

---

### 4. Delete for Me

* Handled in frontend
* Message ID stored in local state
* Hidden only for current user

---

### 5. Pin Messages

* API call → `/pin/:id`
* Backend updates `pinned = true`
* Displayed in separate "Pinned" section

---

## 🔌 API Endpoints

| Method | Endpoint    | Description                 |
| ------ | ----------- | --------------------------- |
| POST   | /send       | Send message                |
| GET    | /messages   | Fetch all messages          |
| PUT    | /delete/:id | Delete message for everyone |
| PUT    | /pin/:id    | Pin message                 |

---

## 🧠 Features Implemented

✅ Real-time messaging using Socket.IO
✅ Delete for me (client-side)
✅ Delete for everyone (server-side)
✅ Pin messages
✅ Clean UI (WhatsApp-style)
✅ Input validation
✅ Persistent data (MongoDB)

---

## 🧪 Testing

* Open app in **multiple tabs**
* Send message → appears instantly in all tabs
* Delete message → updates everywhere
* Pin message → appears in pinned section

---

## 📌 Important Notes

* MongoDB connection required
* Backend must run before frontend
* Ensure correct ports:

  * Backend → 5000
  * Frontend → 5173

---

## 🚀 Future Improvements

* User authentication (login system)
* Username display
* Typing indicator
* Unpin feature
* Dark mode

---

## 🧑‍💻 Author

**Harshini G**

---

## 🎯 Conclusion

This project demonstrates:

* Full-stack development
* Real-time communication
* REST API design
* Clean UI/UX implementation

