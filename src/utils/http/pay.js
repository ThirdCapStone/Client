import axios from "axios";

var options = {
  method: "POST",
  url: "https://api.tosspayments.com/v1/payments/confirm",
  headers: {
    Authorization: "Basic dGVzdF9za19aMFJuWVgydzUzMkxkalpLYW1Ock5leXFBcFFFOg==",
    "Content-Type": "aplication/json",
  },
  data: {
    paymentKey: "{PAYMENT_KEY}",
    amount: 100,
    orderId: "YBvN8NKG9orTghwOYZgOP",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
