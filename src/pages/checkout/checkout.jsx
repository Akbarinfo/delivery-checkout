import { useState } from "react";
import CheckoutLeft from "./checkoutLeft";
import CheckoutRight from "./checkoutRight";

function Checkout() {
  const [payment, setPayment] = useState(0);

  console.log(payment);
  return (
    <section>
      <div className="flex">
        <CheckoutLeft payment={payment} setPayment={setPayment} />
        <CheckoutRight />
      </div>
    </section>
  );
}

export default Checkout;
