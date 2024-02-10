const socket = io("http://localhost:3000");
const notificationArea = document.querySelector("#notificationArea");

const calculateDistanceAndSendToServer = (orderCoords) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((shipperPosition) => {
            const shipperLatitude = shipperPosition.coords.latitude;
            const shipperLongitude = shipperPosition.coords.longitude;

            const orderLatitude = orderCoords.latitude;
            const orderLongitude = orderCoords.longitude;

            const distance = Math.sqrt(Math.pow(orderLatitude - shipperLatitude, 2) + Math.pow(orderLongitude - shipperLongitude, 2));
            console.log(distance);
            socket.emit("getDistance", distance);
        });
    }
}

socket.on("notifyNewOrder", (order) => {
    const newOrder = document.createElement('p');
    const today = new Date();
    const time = today.getHours() + ':' + today.getMinutes() + "  " + today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
    const notification = time + " " + "Đơn hàng mới ở: " + order.source + "\n"
    + "Giao tới " + order.destination + '.';
    newOrder.innerText = notification;
    notificationArea.appendChild(newOrder);

    calculateDistanceAndSendToServer({ latitude: order.latitude, longitude: order.longitude });
});