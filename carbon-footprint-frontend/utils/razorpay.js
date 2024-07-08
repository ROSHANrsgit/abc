import axios from "axios";
import { handleSuccessfulPayment } from "./paymentLogger.js";
import logo from "../src/assets/Images/Logo (1).svg";

export const updateOptionsWithOrderId = (
  orderId,
  setPaymentSuccess,
  amount,
  { name, email, phone, country, address }
) => {
  const options = {
    key: "rzp_live_M5qRGTbWOWb30x", // Enter the Key ID generated from the Dashboard
    amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "We Grow Forest Foundation",
    order_id: orderId, //This is a sample Order ID. Pass the id obtained in the response of Step 1
    description: "Test Transaction",
    image: { logo },
    handler: async function (response) {
      const verificationResult = await verifyPayment(
        response.razorpay_order_id,
        response.razorpay_payment_id,
        response.razorpay_signature
      );
      if (verificationResult.success) {
        setPaymentSuccess(true);
        handleSuccessfulPayment(name, amount, email, phone, country, address);
      }
    },
    prefill: {
      name: "Gaurav Kumar",
      email: "gaurav.kumar@example.com",
      contact: "9000090000",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };
  const rzp1 = new Razorpay(options);
  rzp1.on("payment.failed", function (response) {
    // alert(response.error.code);
    // alert(response.error.description);
    // alert(response.error.source);
    // alert(response.error.step);
    // alert(response.error.reason);
    // alert(response.error.metadata.order_id);
    // alert(response.error.metadata.payment_id);
  });
  return rzp1;
};

// create the orderId with the following settings
export const setSettings = (amount) => {
  const settings = {
    url: "http://calculator.carbonzero.day/create/orderId",
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      amount, // Example payload
    }),
  };
  return settings;
};

const verifyPayment = async (
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature
) => {
  try {
    const response = await axios.post(
      "http:/calculator.carbonzero.day/api/payment/verify",
      {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      }
    );
    // Assuming backend responds with JSON data containing verification result
    return response.data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error; // Rethrow the error to handle it further up the chain
  }
};
// AKfycbyVcJ7OkaZHXW_-AshTzU189uHd2egsVsbUZzsWOC8JI9R3Xw3O7rOHUsNzXIHhC7Pkvw