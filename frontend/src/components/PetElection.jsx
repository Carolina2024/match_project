import { FiClock, FiCheck } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getUserMatchs } from "../api/PetsUser";

function PetElection() {
  const [matchs, setMatchs] = useState({ name: "", foto: [], status: "" });
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, label: "Solicitud enviada" },
    { id: 2, label: "Solicitud en proceso" },
    {
      id: 3,
      label:
        matchs.status === "Aprobado"
          ? "Aprobada"
          : matchs.status === "Rechazado"
          ? "Rechazada"
          : "Estado final",
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const data = await getUserMatchs();
      const name = data.pet.name;
      const foto = data.pet.photoUrls;
      const status = data.status;

      setMatchs({ name, foto, status });

      let stepFromStatus = 1;
      switch (status) {
        case "Por revisar":
          stepFromStatus = 1;
          break;
        case "En proceso":
          stepFromStatus = 2;
          break;
        case "Aprobado":
        case "Rechazado":
          stepFromStatus = 3;
          break;
      }

      setActiveStep(stepFromStatus);
    }

    fetchData();

    return () => {
      if (matchs.status === "Aprobado" || matchs.status === "Rechazado") {
        localStorage.removeItem(`matchVisto-${matchs.petId}`);
        setMatchs({ name: "", foto: [], status: "", petId: null });
      }
    };
  }, [matchs.status, matchs.petId]);

  return (
    <div className="flex flex-col gap-2.5 justify-center items-center h-full">
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">
        {matchs.status === "Rechazado"
          ? "Lamentamos mucho que no se haya podido concretar la adopción..."
          : "¡Qué gran elección hiciste!"}
      </h1>
      <div className="items-center flex flex-col gap-3">
        <img
          src={matchs.foto?.[0] || "/fallback.jpg"}
          alt={matchs.name}
          className="w-50 h-50 object-cover rounded-[30%]"
        />
        <b>{matchs.name}</b>
        {matchs.status === "Rechazado" ? (
          <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-red-500 text-white text-sm font-medium shadow-sm">
            Solicitud rechazada
          </span>
        ) : matchs.status === "Aprobado" ? (
          <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-green-600 text-white text-sm font-medium shadow-sm">
            Solicitud aprobada
          </span>
        ) : (
          <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-primary text-white text-sm font-medium shadow-sm">
            <FiClock className="text-white text-base" />
            Proceso de adopción en curso
          </span>
        )}
      </div>

      <div className="flex items-center justify-center px-4 py-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Paso con círculo e ícono */}
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300
                ${
                  activeStep >= step.id
                    ? "bg-primary text-white"
                    : "border-2 border-primary text-transparent"
                }`}
              >
                {activeStep >= step.id && <FiCheck className="text-sm" />}
              </div>
              <span className="text-sm text-primary font-bold mt-2 text-center ">
                {step.label}
              </span>
            </div>

            {/* Línea conectora */}
            {index < steps.length - 1 && (
              <div className="h-0.5 bg-primary mx-4 w-16 sm:w-24 relative top-[-10px]" />
            )}
          </div>
        ))}
      </div>

      {matchs.status !== "Rechazado" && matchs.status !== "Aprobado" && (
        <div className="flex flex-col gap-1.5 justify-center text-center pt-7 pb-4">
          <p>Pronto nos contactaremos para darte los próximos detalles</p>
          <b className="text-tertiary">
            ¡Gracias por querer darle un hogar a {matchs.name}!
          </b>
        </div>
      )}
    </div>
  );
}

export default PetElection;
