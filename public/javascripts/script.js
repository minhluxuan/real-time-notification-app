const socket = io("http://localhost:3000");
const notificationArea = document.querySelector("#notificationArea");

const sendLocationButton = document.querySelector('#sendLocationButton');
sendLocationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((userPosition) => {
            socket.emit("getUserLocation", { latitude: userPosition.coords.latitude, longitude: userPosition.coords.longitude });
        });
    }
});

// socket.on("getShipper", (shipper) => {
//     const p = document.createElement("p");
//     p.innerText = shipper;
//     notificationArea.appendChild(p);
// });

// socket.on("notifyAll", (message) => {
//     const alert = document.createElement("p");
//     alert.innerText = message;
//     notificationArea.appendChild(alert);
// })