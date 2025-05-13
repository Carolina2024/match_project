import { useState } from "react";
import { FaPaw } from "react-icons/fa";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

const Contacto = () => {
  const [phone, setPhone] = useState("");

  return (
    <section className="max-w-3xl mx-auto flex flex-col items-center pb-22 pt-16 px-4 mt-14 bg-[#F9F9F9] rounded-4xl">
      <h2 className="text-primary text-3xl md:text-4xl font-bold font-secundary mb-8">
        Contacto
      </h2>

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg/20 p-8">
        <div className="flex items-center gap-4 mb-6 text-primary font-semibold font-secundary">
          <FaPaw className="text-2xl" />
          <span>¡Escríbenos!</span>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-lg font-normal text-[#0C0C0C] mb-1">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="w-full px-4 py-2 border border-primary rounded-full placeholder-[#CBCBCB] font-medium text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-lg font-normal text-[#0C0C0C] mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Tu e-mail"
              className="w-full px-4 py-2 border border-primary rounded-full placeholder-[#CBCBCB] font-medium text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-lg font-normal text-[#0C0C0C] mb-1">
              Número de teléfono
            </label>
            <PhoneInput
              country={"cl"}
              value={phone}
              onChange={(value) => setPhone(value)}
              inputStyle={{
                width: "100%",
                height: "40px",
                borderRadius: "9999px",
                border: "1px solid #F4A470",
                fontSize: "0.875rem",
                fontWeight: "500",
                outline: "none",
                color: "#0C0C0C",
                backgroundColor: "white",
                paddingLeft: "48px",
              }}
              buttonStyle={{
                height: "40px",
                borderTopLeftRadius: "9999px",
                borderBottomLeftRadius: "9999px",
                borderRight: "none",
                border: "1px solid #F4A470",
                backgroundColor: "white",
                boxShadow: "none",
                cursor: "pointer",
              }}
              containerStyle={{ width: "100%" }}
              dropdownStyle={{
                borderRadius: "12px",
                zIndex: 100,
              }}
              inputClass="placeholder-[#CBCBCB]"
              placeholder="Tu número"
            />
          </div>

          <div>
            <label className="block text-lg font-normal text-[#0C0C0C] mb-1">
              Mensaje
            </label>
            <textarea
              rows="10"
              placeholder="Escribe aquí tu mensaje"
              className="w-full px-4 py-2 border border-primary rounded-3xl placeholder-[#CBCBCB] font-medium text-sm outline-none resize-none"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-primary text-white font-bold text-base my-2 px-14 py-2 rounded-full hover:bg-tertiary transition cursor-pointer"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contacto;
