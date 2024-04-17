import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("get-document", (docId) => {
    // Simulate fetching the document content from the database
    const data = ""; // Assuming you'll fetch the content here
    socket.join(docId);
    socket.emit("load-document", data);
  });

  socket.on("send-changes", ({ id, content }) => {
    // Broadcast the changes to all clients in the same room
    io.to(id).emit("receive-changes", { id, content });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = 9000;
httpServer.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
