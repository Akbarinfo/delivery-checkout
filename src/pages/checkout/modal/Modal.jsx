import { useState } from "react";
import { MdClose } from "react-icons/md";
import { BsArrowRepeat } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { PatternFormat } from "react-number-format";

export default function Modal({ number, setOpen }) {
  const [close, setClose] = useState(true);
  const [success, setSuccess] = useState(false);

  function* countdown(seconds) {
    let currentSecond = seconds;
    while (currentSecond >= 0) {
      yield currentSecond--;
    }
  }

  const iterator = countdown(60); // 60 dan 0 gacha sanaydi

  let next = iterator.next();
  while (!next.done) {
    console.log(next.value); // Har bir orqaga sanaydigan sonni chiqaradi
    setTimeout(() => {
      next = iterator.next();
    }, 1000); // Har bir soniyadan so'ng qayta qaytuvchi funksiyani chaqirish
  }

  const closeHandler = () => {
    setClose(false);
    setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  return (
    <>
      <div
        className={`openPhoto__black ${close ? "" : "openPhoto__close"}`}
      ></div>
      <section className={`openPhoto ${close ? "" : "openPhoto__close-big"}`}>
        <div className="openPhoto__bigbox">
          <div className="relative flex justify-center items-center">
            <div className="relative w-[595px] bg-white rounded-2xl p-8">
              <div className="flex justify-between items-center mb-9">
                <h2 className="text-2xl">Подтверждение заказа</h2>
                <button onClick={() => closeHandler()} className="text-3xl">
                  <MdClose />
                </button>
              </div>

              <div className="">
                <p>Код потверждения отправлен на номер</p>
                <p className="font-medium mb-6">{number}</p>

                <form>
                  <span className="block font-medium mb-2">
                    Введите код подтверждения
                  </span>

                  <PatternFormat
                    value={23456}
                    patternChar="_"
                    format="___-___"
                    className="w-full rounded-[12px] border-[#E3E8EF] border py-[10px] outline-none px-4 mb-6"
                  />

                  <p className="">Отправить повторно через 00:53</p>
                </form>
              </div>

              <div
                className={`${
                  success && "flex justify-center items-center flex-col"
                }`}
              >
                {success && (
                  <div className="flex flex-col justify-center items-center mb-8">
                    <FiCheckCircle className="block text-6xl text-[#01B569] mb-6" />

                    <p className="text-color text-3xl gilroyM mb-5">
                      Вы успешно записались!
                    </p>
                    <p className="text-color gilroyR">
                      Желаем вам крепкого здоровья
                    </p>
                  </div>
                )}
              </div>
              {success && (
                <button
                  type="button"
                  onClick={() => closeHandler()}
                  className="bg-[#42b2fc] border border-[#42b2fc] rounded-lg w-full py-[14px] text-base text-white gilroyM transition hover:bg-transparent hover:text-[#42b2fc]"
                >
                  Закрыть
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
