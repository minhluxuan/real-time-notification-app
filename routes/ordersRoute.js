const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/ordersController");

router.get('/', ordersController.getOrders);
router.post("/create", ordersController.createNewOrder);

module.exports = router;