import { loadTossPayments } from "@tosspayments/payment-sdk";
import "./pay.scss";
import { useEffect } from "react";

const ClinetKey = "test_ck_MGjLJoQ1aVZZjvmO6BwVw6KYe2RN";

const Test = () => {
  loadTossPayments(ClinetKey).then((TossPayments) => {
    TossPayments.requestPayment("카드", {
      amount: 100,
      orderId: "zxpGZgGcEAgLcB4t2pT6X",
      orderName: "테스트 결제",
      customerName: "테스트",
      successUrl: "http://localhost:3000/success",
      failUrl: "http://localhost:3000/fail",
    }).catch((error) => {
      if (error.code == "USER_CANCEL") {
      } else if (error.code === "INVALID_CARD_COMPANY") {
      }
    });

    TossPayments.requestPayment("가상계좌", {
      amount: 15000,
      orderId: "YBvN8NKG9orTghwOYZgOP",
      orderName: "토스 티셔츠 외 2건",
      customerName: "박토스",
      successUrl: "http://localhost:3000/success",
      failUrl: "http://localhost:3000/fail",
      validHours: 24,
      cashReceipt: {
        type: "소득공제",
      },
    }).catch((error) => {
      if (error.code == "USER_CANCEL") {
      } else if (error.code === "INVALID_CARD_COMPANY") {
      }
    });

    TossPayments.requestPayment("도서문화상품권", {
      amount: 15000,
      oorderId: "Rbm4bsSh_NjLef__9KaAz",
      orderName: "토스 티셔츠 외 2건",
      customerName: "박토스",
      successUrl: "http://localhost:3000/success",
      failUrl: "http://localhost:3000/fail",
    }).catch((error) => {
      if (error.code == "USER_CANCEL") {
      } else if (error.code === "INVALID_CARD_COMPANY") {
      }
    });

    TossPayments.requestBillingAuth("카드", {
      customerKey: "oaS3PTG3g9MnHAxbyu58d",
      successUrl: "http://localhost:3000/success",
      failUrl: "http://localhost:3000/fail",
    });

    return () => {
      if (TossPayments) {
        TossPayments.cancelPayment();
      }
    };
  });

  return <div>test</div>;
};

export default Test;
