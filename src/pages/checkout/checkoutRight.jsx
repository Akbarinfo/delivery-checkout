import Maps from "./map";
import { useState } from "react";
import { PatternFormat } from "react-number-format";
import { CgRadioChecked, CgRadioCheck } from "react-icons/cg";

//database
import cardsData from "../../database/cards.json";
import Modal from "./modal/Modal";

function CheckoutRight() {
  const [check, setCheck] = useState({ id: 1 });
  const [number, setNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [numberError, setNumberError] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (+number.includes("_") || number == "") {
      setNumberError(true);
    }

    if (!number.includes("_") && number != "") {
      setOpen(true);
    }
  };

  return (
    <>
      <div className="w-1/2 h-[100vh] p-[10%] py-[100px] overflow-auto webkit-scroll">
        <Maps />
        <form className="px-9" onSubmit={(e) => !open && onSubmit(e)}>
          <label htmlFor="name" className="w-full block mb-4">
            <span className="font-medium text-base mb-2 block">ФИО</span>
            <input
              required
              id="name"
              type="text"
              className="w-full rounded-[12px] border-[#E3E8EF] border outline-none text-base py-3 px-4"
            />
          </label>

          <label htmlFor="number" className="block mb-4">
            <span className="font-medium text-base mb-2 block">
              Номер телефона
            </span>

            <PatternFormat
              mask="_"
              required
              value={number}
              allowEmptyFormatting
              format="+998 (##) ### ####"
              onChange={(e) => {
                setNumber(e.target.value);
                if (!+number.includes("_")) {
                  setNumberError(false);
                }
              }}
              className={`w-full rounded-[12px] border outline-none text-base py-3 px-4 ${
                !numberError
                  ? "border-[#E3E8EF]"
                  : "border-[#E53835] text-[#e53835]"
              }`}
            />
          </label>

          <label htmlFor="card" className="block mb-4">
            <span className="flex justify-between font-medium text-base mb-3">
              <span className="block">Номер телефона</span>

              <button type="button" className="font-semibold primary-color">
                + Добавить новый
              </button>
            </span>

            <span className="w-full flex gap-3 overflow-x-auto webkit-scroll-touch pb-2 mb-4 select-none">
              {cardsData.map((card, key) => (
                <span
                  key={key + 2}
                  onClick={() => setCheck(card)}
                  className={`flex min-w-[220px] rounded-[12px] text-base py-3 px-4 flex-grow-1 items-center gap-5 cursor-pointer ${
                    check.id == card.id
                      ? "border-[#4b7df3] border-[2px]"
                      : "border-[2px]"
                  }`}
                >
                  <span>
                    <span className="flex gap-4 items-center text-lg">
                      {check.id == card.id ? (
                        <CgRadioChecked
                          className={`${
                            check.id == card.id && "primary-color"
                          }`}
                        />
                      ) : (
                        <CgRadioCheck />
                      )}

                      <p className="font-medium">**** {card.number}</p>
                    </span>
                    <p className="font-medium text-color text-right">
                      {card.name}
                    </p>
                  </span>

                  <span>
                    <img
                      src={card.logo}
                      alt={card.title}
                      className="max-w-[45px] object-cover"
                    />
                  </span>
                </span>
              ))}
            </span>
          </label>
          <label
            htmlFor="checkbox"
            className="flex items-center cursor-pointer mb-8"
          >
            <input
              required
              id="checkbox"
              name="checkbox"
              type="checkbox"
              className="mr-2 w-5 h-5 cursor-pointer"
            />
            <p className="text-color select-none">
              Я согласен с условиями оферты
            </p>
          </label>

          <button
            type="submit"
            className="w-full bg-[#4b7df3] p-[10px] border border-[#4b7df3] font-bold rounded-xl text-white"
          >
            Заказать
          </button>
        </form>
      </div>

      {open && <Modal number={number} setOpen={setOpen} />}
    </>
  );
}

export default CheckoutRight;
