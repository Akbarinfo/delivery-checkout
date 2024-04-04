import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { PatternFormat } from "react-number-format";

export default function Modal({ number, setOpen }) {
  const [code, setCode] = useState();
  const [close, setClose] = useState(true);
  const [seconds, setSeconds] = useState(60);
  const [success, setSuccess] = useState(false);
  const [codeError, setCodeError] = useState(false);

  const closeHandler = () => {
    setClose(false);
    setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  const formatSeconds = (s) => {
    return s < 10 ? `0${s}` : s;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (code == undefined || code?.includes("_") || code == "") {
      setCodeError(true);
    } else {
      setSuccess(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1); // Har soniyadan keyin soniyani 1 ga kamaytirish
      }
    }, 1000); // 1 sekundga bir chaqiriladi

    return () => clearInterval(interval); // O'chirilganda intervalni tozalash
  }, [seconds]);

  return (
    <>
      <div
        className={`openPhoto__black ${close ? "" : "openPhoto__close"}`}
      ></div>
      <section className={`openPhoto ${close ? "" : "openPhoto__close-big"}`}>
        <div className="openPhoto__bigbox">
          <div className="relative flex justify-center items-center">
            <div className="relative w-[520px] bg-white rounded-2xl py-6 px-10 pb-9">
              <div className="flex justify-between items-center mb-9">
                <h2 className="text-2xl">
                  {!success ? "Подтверждение заказа" : "Заказ принят"}
                </h2>
                <button className="text-3xl" onClick={() => closeHandler()}>
                  <MdClose />
                </button>
              </div>

              {!success ? (
                <>
                  <p>Код потверждения отправлен на номер</p>
                  <p className="font-medium mb-6">{number}</p>

                  <form onSubmit={(e) => onSubmit(e)}>
                    <span className="block font-medium mb-2">
                      Введите код подтверждения
                    </span>

                    <PatternFormat
                      mask="_"
                      patternChar="_"
                      format="___-___"
                      onChange={(e) => {
                        setCode(e.target.value);
                        if (!code?.includes("_")) {
                          setCodeError(false);
                        }
                      }}
                      className={`w-full rounded-[12px] border-[#E3E8EF] border py-[10px] outline-none px-4 mb-6 ${
                        codeError ? "border-[#E53835]" : "border-[#ABBED1]"
                      }`}
                    />

                    {seconds != 0 ? (
                      <p className="mb-9">
                        Отправить повторно через
                        <b> 00:{formatSeconds(seconds)}</b>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSeconds(60)}
                        className="primary-color font-medium transition hover:opacity-90 mb-9"
                      >
                        Повторно отправить код
                      </button>
                    )}

                    <span className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-grow-[1] bg-[#4b7df3] rounded-xl border border-[#4b7df3] font-bold text-white py-[10px] px-4 transition hover:bg-transparent hover:text-[#4b7df3]"
                      >
                        Подтвердить
                      </button>
                      <button
                        type="button"
                        onClick={() => closeHandler()}
                        className="flex-grow-[1] bg-transparent rounded-xl border border-[#4b7df3] font-bold primary-color py-[10px] px-4 transition hover:bg-[#4b7df3] hover:text-white"
                      >
                        Назад
                      </button>
                    </span>
                  </form>
                </>
              ) : (
                <>
                  <div className="flex flex-col justify-center items-center mb-8">
                    <FiCheckCircle className="block text-6xl text-[#01B569] mb-6" />

                    <p className="font-medium text-3xl mb-4">Спасибо!</p>

                    <p className="max-w-[300px] text-center">
                      Ваш заказ успешно оформлен. Мы свяжемся с вами в ближайшее
                      время.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => closeHandler()}
                    className="bg-[#4b7df3] border border-[#4b7df3] rounded-xl w-full py-3 font-bold text-base text-white transition hover:bg-transparent hover:text-[#4b7df3]"
                  >
                    Вернуться на главную
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
