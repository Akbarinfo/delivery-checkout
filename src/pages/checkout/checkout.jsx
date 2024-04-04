import CheckoutLeft from "./checkoutLeft";
import CheckoutRight from "./checkoutRight";

function Checkout() {
  return (
    <section>
      <div className="flex">
        <CheckoutLeft />
        <CheckoutRight />
      </div>
    </section>
  );
}

export default Checkout;
