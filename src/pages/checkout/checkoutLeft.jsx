import { useEffect, useState } from "react";
import { TicketDiscount } from "iconsax-react";
import currencyFormat from "../../utils/currencyFormat";

//database
import couponData from "../../database/coupon.json";
import productData from "../../database/product.json";

function CheckoutLeft({ payment, setPayment }) {
  const delivery = 8000;
  const [price, setPrice] = useState(0);
  const [allprice, setAllPrice] = useState({});
  const [coupon, setCoupon] = useState(null);
  const [percent, setPercent] = useState(null);
  const [couponError, setCouponError] = useState(false);

  const couponSubmit = (e) => {
    e.preventDefault();
    let inputValue = e.target[0].value.trim().toLocaleLowerCase();
    const foundCoupon = couponData.find(
      (c) => c.name.toLocaleLowerCase() == inputValue
    );

    if (foundCoupon) {
      setCouponError(false);
      setPercent(foundCoupon.coupon);
      setCoupon(price * (foundCoupon.coupon / 100));
      setPayment(price - price * (foundCoupon.coupon / 100) + delivery);
      setAllPrice({
        coupon: 
      })
    } else {
      setCoupon(0);
      setPercent(0);
      setCoupon(null);
      setCouponError(true);
      setPayment(price + delivery);
    }
  };

  useEffect(() => {
    const total = productData.reduce(
      (acc, item) => acc + item.count * item.price,
      0
    );
    setAllPrice({
      coupon: 0,
      price: total,
      delivery: delivery,
      payment: total + delivery,
    });
    setPrice(total);
    setPayment(total + delivery);
  }, []);

  console.log(coupon);
  return (
    <div className="w-1/2 h-[100vh] bg-[#F8FAFC] p-[10%] py-[100px] overflow-auto webkit-scroll">
      <h2 className="text-2xl font-bold mb-6">Ваш заказ</h2>

      <ul className="border border-[#E3E8EF] rounded-[12px] py-4 mb-10">
        {productData.map((product, key) => (
          <li
            key={key + 1}
            className="flex px-6 gap-6 border-b border-[#E3E8EF] last:border-none pb-6 mb-4 last:pb-0"
          >
            <div className="w-[80px] h-[80px] relative">
              <img src="/image/Image.png" alt="img" />
              <span className="w-[20px] h-[20px] absolute top-[-8px] right-[-8px] border bg-white border-[#E3E8EF] rounded-[50%] flex items-center justify-center text-[12px] font-bold">
                {product.count}
              </span>
            </div>

            <div className="flex-grow-[1] py-2">
              <div className="w-full flex justify-between mb-3 text-base font-medium">
                <p>{product.title}</p>
                <p>{currencyFormat(product.price)} сум</p>
              </div>
              <p className="font-medium tex-base">
                <span className="text-[#677489] mr-1">Описание:</span>
                {product.desc}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="font-bold mb-2">Купон</h3>
      <form
        onSubmit={(e) => couponSubmit(e)}
        className={`relative flex items-center justify-between border-[2px] border-[#4B7DF3] p-3 px-4 rounded-[12px] ${
          couponError ? "mb-1" : "mb-8"
        }`}
      >
        <span className="flex">
          <TicketDiscount
            size="24"
            variant="Bold"
            className="mr-2"
            color="#4B7DF3"
          />
          <input
            id="coupon"
            type="text"
            placeholder="промокод"
            // onChange={(e) => setCoupon(e.target.value)}
            className="bg-transparent outline-none text-base font-medium uppercase"
          />
        </span>
        <button type="submit" className="primary-color font-bold">
          Применить
        </button>
      </form>
      {couponError && (
        <p className="text-[14px] mb-3 text-[#8c2727] font-medium">
          Промокод не найден
        </p>
      )}

      <div className="border-y border-[#E3E8EF py-6 mb-6">
        <p className="flex justify-between font-medium text-base mb-3">
          <span className="text-color">Сумма</span>
          <span>{currencyFormat(price)} сум</span>
        </p>
        <p className="flex justify-between font-medium text-base mb-3">
          <span className="text-color">Стоимость доставки</span>
          <span>{currencyFormat(8000)} сум</span>
        </p>
        <p className="flex justify-between font-medium text-base mb-3">
          <span className="text-color">
            Купон {percent != null && `(${percent}%)`}
          </span>
          <span>{currencyFormat(coupon)} сум</span>
        </p>
      </div>

      <p className="flex justify-between font-bold text-base mb-3">
        <span>Сумм к оплате</span>
        <span>{currencyFormat(payment)} сум</span>
      </p>
    </div>
  );
}

export default CheckoutLeft;
