const socket = io("http://localhost:3000");
const notificationArea = document.querySelector("#notificationArea");

socket.on("notifyShippers", (info) => {
    const alert = document.createElement("p");
    alert.innerText = info.userId + ": " + info.userCoords.latitude + ", " + info.userCoords.longitude;
    notificationArea.appendChild(alert);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            socket.emit("getShipperLocation", { 
                shipperCoords: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
                userCoords: info.userCoords,
            })
        });
    }
});