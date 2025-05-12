import { useLocation } from "react-router-dom";
import { FiClock } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getUserMatchs } from "../api/PetsUser";

const steps = [
  { id: 1, label: "Solicitud enviada" },
  { id: 2, label: "Solicitud en proceso" },
  { id: 3, label: "aprobada" },
];

function PetElection() {
  const location = useLocation();
  // const { nombre, foto } = location.state || {};
  const [matchs, setMatchs] = useState({ name: "", foto: [], status: "" });
  const [activeStep, setActiveStep] = useState(1);

  const handleStepClick = (stepId) => {
    setActiveStep(stepId);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getUserMatchs();
      const name = data[0].pet.name;
      const foto = data[0].pet.photoUrls;
      const status = data[0].status;

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
          stepFromStatus = 3;
          break;
        case "Rechazado":
          stepFromStatus = 0; // fuera del proceso
          break;
        default:
          stepFromStatus = 1;
      }

      if (status !== "rechazado") {
        setActiveStep(stepFromStatus);
      }
    }

    fetchData();
  }, []);

  return (
    <div className=" flex flex-col gap-2.5">
      <h1 className="text-3xl font-bold text-primary mb-4">
        ¡Que gran eleccion hiciste!
      </h1>
      <div className="items-center flex flex-col gap-3">
        <img
          src={matchs.foto}
          alt={matchs.name}
          className="w-50 h-50 object-cover rounded-[30%]"
        />
        <b>{matchs.name}</b>
        {matchs.status === "Rechazado" ? (
          <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-red-500 text-white text-sm font-medium shadow-sm">
            <FiClock className="text-white text-base" />
            Solicitud rechazada
          </span>
        ) : (
          <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-primary text-white text-sm font-medium shadow-sm">
            <FiClock className="text-white text-base" />
            Proceso de adopción en curso
          </span>
        )}
      </div>
      {matchs.status !== "Rechazado" && (
        <div className="flex justify-center items-center gap-0 py-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center ">
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setActiveStep(step.id)}
              >
                <div
                  className={`w-6 h-6 rounded-full mb-1 transition-all duration-300
            ${
              activeStep >= step.id
                ? "bg-primary"
                : "border-2 border-primary bg-transparent"
            }`}
                />
                <span className="text-sm transition-colors duration-300 text-primary font-bold">
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="w-18 h-px bg-primary mx-2 mb-3" />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-1.5 justify-center text-center pt-7 pb-7">
        <p>Pronto nos contactaremos para darte los próximos detalles</p>
        <b className="text-tertiary">¡Gracias por querer darle un hogar a {matchs.name}!</b>
      </div>
    </div>
  );
}

export default PetElection;
