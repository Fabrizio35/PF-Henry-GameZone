const express = require("express");
const router = express.Router();

const { PaymentController } = require("../controllers/paymentController");
const PaymentService = require("../Services/paymentService");
const { sendMailHandler } = require("../handlers/paymentHandlers");

const PaymentInstance = new PaymentController(new PaymentService());

// router.get("/", function (req, res, next) {
//   return res.json({
//     "/payment": "generates a payment link",
    
//   });
// });

router.post("/", function (req, res, next) {
  PaymentInstance.postPaymentLink(req, res);
});

router.post("/sendEmail", sendMailHandler);

module.exports = router;