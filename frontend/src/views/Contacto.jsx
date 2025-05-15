import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaPaw } from "react-icons/fa";
import emailjs from "emailjs-com";
import SuccessModalContact from "../components/modals/SuccessModalContact";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!/^[A-Za-z\s]+$/.test(formData.nombre)) {
      newErrors.nombre = "Solo se permiten letras";
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Correo inválido";
    }
    if (formData.telefono.length < 7) {
      newErrors.telefono = "Número no válido";
    }
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "Mensaje requerido";
    }
    return newErrors;
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const templateParams = {
        from_name: formData.nombre,
        reply_to: formData.email,
        phone: formData.telefono,
        message: formData.mensaje,
      };

      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then(() => {
          setShowModal(true);
          setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
        })
        .catch((err) => console.error("EmailJS Error:", err));
    }
  };

  return (
    <section className="max-w-3xl mx-auto flex flex-col items-center pb-22 pt-16 px-4 -mt-6 mb-16 bg-[#F9F9F9] rounded-4xl">
      <h2 className="text-primary text-3xl md:text-4xl font-bold font-secundary mb-8">
        Contacto
      </h2>

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg/20 p-8">
        <div className="flex items-center gap-4 mb-6 text-primary font-semibold font-secundary">
          <FaPaw className="text-2xl" />
          <span>¡Escríbenos!</span>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block md:text-lg text-base font-normal text-[#0C0C0C] mb-1">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              className="w-full px-4 py-2 border border-primary rounded-full placeholder-[#CBCBCB] font-medium text-sm outline-none"
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
            )}
          </div>

          <div>
            <label className="block md:text-lg text-base font-normal text-[#0C0C0C] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Tu e-mail"
              className="w-full px-4 py-2 border border-primary rounded-full placeholder-[#CBCBCB] font-medium text-sm outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block md:text-lg text-base font-normal text-[#0C0C0C] mb-1">
              Número de teléfono
            </label>
            <PhoneInput
              country={"cl"}
              value={formData.telefono}
              onChange={(value) =>
                setFormData({ ...formData, telefono: value })
              }
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
              dropdownStyle={{ borderRadius: "12px", zIndex: 100 }}
              inputClass="placeholder-[#CBCBCB]"
              placeholder="Tu número"
            />
            {errors.telefono && (
              <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
            )}
          </div>

          <div>
            <label className="block md:text-lg text-base font-normal text-[#0C0C0C] mb-1">
              Mensaje
            </label>
            <textarea
              name="mensaje"
              rows="10"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Escribe aquí tu mensaje"
              className="w-full px-4 py-2 border border-primary rounded-3xl placeholder-[#CBCBCB] font-medium text-sm outline-none resize-none"
            />
            {errors.mensaje && (
              <p className="text-red-500 text-sm mt-1">{errors.mensaje}</p>
            )}
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

      {showModal && <SuccessModalContact onClose={() => setShowModal(false)} />}
    </section>
  );
};

export default Contacto;
