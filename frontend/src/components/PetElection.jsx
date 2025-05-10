import { useLocation } from "react-router-dom";
import { FiClock } from "react-icons/fi";
import { useState } from "react";

const steps = [
  { id: 1, label: "Solicitud enviada" },
  { id: 2, label: "Solicitud recibida" },
  { id: 3, label: "Respuesta" },
];

function PetElection() {
  const location = useLocation();
  const { nombre, foto } = location.state || {};
  const [activeStep, setActiveStep] = useState(1);

  const handleStepClick = (stepId) => {
    setActiveStep(stepId);
  };

  return (
    <div className="p-6 flex flex-col gap-2.5">
      <h1 className="text-3xl font-bold text-primary mb-4">
        ¡Que gran eleccion hiciste!
      </h1>
      <div className="items-center flex flex-col gap-1.5">
        <img
          src={foto}
          alt={nombre}
          className="w-40 h-40 object-cover rounded-xl"
        />
        <p className="mt-4 text-xl font-semibold">{nombre}</p>
        <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-primary text-white text-sm font-medium shadow-sm">
          <FiClock className="text-white text-base" />
          Proceso de adopción en curso
        </span>
      </div>
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
              <span
                className={`text-sm transition-colors duration-300 text-primary font-bold`}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="w-18 h-px bg-primary mx-2 mb-3" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PetElection;
