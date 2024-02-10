const eventManager = require("../lib/eventManager");

eventManager.once("ioInitialize", (io) => {
    eventManager.on("notifyNewOrder", (order) => {
        io.emit("notifyNewOrder", order);
    });
    // Thiết lập trình xử lý sự kiện 'connection' và 'disconnect' trong io
    io.on("connection", (socket) => {
        console.log("Socket connected with ID: ", socket.id);
        socket.on("getDistance", (distance) => {
            console.log("Received distance from socket with ID ", socket.id, ": ", distance);
        });
        socket.on("disconnect", () => {
            console.log("Socket disconnected with ID: ", socket.id);
        });
    });
});



const getOrders = async (req, res) => {
    res.render("order");
}

const createNewOrder = async (req, res) => {
    eventManager.emit("notifyNewOrder", req.body);
    res.status(200).json({
        error: false,
        message: "Thành công.",
    });
}

module.exports = {
    getOrders,
    createNewOrder,
}