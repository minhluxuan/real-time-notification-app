const eventManager = require("../lib/eventManager");

eventManager.once("ioInitialize", (io) => {
    eventManager.on("notifyNewOrder", (order) => {
        io.emit("notifyNewOrder", order);
    });
    // Thiết lập trình xử lý sự kiện 'connection' và 'disconnect' trong io
    const shippers = {};

    // Thiết lập trình xử lý sự kiện 'connection' và 'disconnect' trong io
    io.on("connection", (socket) => {
        console.log("Socket connected with ID: ", socket.id);
        
        socket.on("getUserLocation", (userCoords) => {
            // Emit notification to all shippers
            io.emit("notifyShippers", { userId: socket.id, userCoords });
        });

        socket.on("getShipperLocation", (shipperData) => {
            // Store shipper's location
            shippers[socket.id] = shipperData;
            const userCoords = shipperData.userCoords;

            // Calculate distances and find the nearest shipper
            let nearestShipper = null;
            let shortestDistance = Infinity;

            Object.keys(shippers).forEach(shipperId => {
                const shipperCoords = shippers[shipperId].shipperCoords;
                const distance = calculateDistance(userCoords, shipperCoords);

                if (distance < shortestDistance) {
                    shortestDistance = distance;
                    nearestShipper = shipperId;
                }
            });

            console.log("Nearest Shipper:", nearestShipper);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected with ID: ", socket.id);
            // Remove shipper from the list when disconnected
            delete shippers[socket.id];
        });
    });
});

function calculateDistance(coords1, coords2) {
    const latDiff = coords1.latitude - coords2.latitude;
    const lonDiff = coords1.longitude - coords2.longitude;
    return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
}

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