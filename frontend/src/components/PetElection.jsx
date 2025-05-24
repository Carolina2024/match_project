import { FiCheck } from "react-icons/fi";
import { MdOutlineAlarm } from "react-icons/md";
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
          : "Respuesta",
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
    <div className="flex flex-col gap-2.5 justify-center items-center h-full -mt-12">
      <h1 className="md:text-4xl text-lg font-bold text-primary md:mb-6 mb-2 text-center font-secundary">
        {matchs.status === "Rechazado"
          ? "Lamentamos mucho que no se haya podido concretar la adopción..."
          : "¡Qué gran elección hiciste!"}
      </h1>
      <div className="items-center flex flex-col gap-5">
        <img
          src={matchs.foto?.[0] || "/fallback.webp"}
          alt={matchs.name}
          className="md:w-55 md:h-55 w-50 h-50 object-cover md:rounded-[30%] rounded-full"
        />
        <b className="font-bold md:text-2xl text-base">{matchs.name}</b>
        {matchs.status === "Rechazado" ? (
          <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-red-500 text-white text-sm font-medium shadow-sm">
            Solicitud rechazada
          </span>
        ) : matchs.status === "Aprobado" ? (
          <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-green-600 text-white text-sm font-medium shadow-sm">
            Solicitud aprobada
          </span>
        ) : (
          <span className="flex items-center gap-1 px-6 py-2 rounded-full bg-primary text-white md:text-xl text-sm font-bold shadow-sm mb-5">
            <MdOutlineAlarm className="text-white md:text-2xl text-sm font-bold" />
            Proceso de adopción en curso
          </span>
        )}
      </div>

      <div className="flex items-center justify-center px-4 py-4 sm:mr-8 mr-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`md:w-7 md:h-7 w-6 h-6 flex items-center justify-center mb-2 rounded-full transition-all duration-300
                ${
                  activeStep >= step.id
                    ? "bg-primary text-white"
                    : "border-1 border-primary text-transparent"
                }`}
              >
                {activeStep >= step.id && <FiCheck className="text-sm" />}
              </div>
              <span className="md:text-xl text-sm text-primary font-bold mt-2 text-center ">
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="h-0.25 bg-primary mx-auto w-16 sm:w-25 relative top-[-20px]" />
            )}
          </div>
        ))}
      </div>

      {matchs.status !== "Rechazado" && matchs.status !== "Aprobado" && (
        <div className="flex flex-col gap-1.5 justify-center text-center pt-7 pb-4 mt-2 italic md:text-2xl text-sm md:mx-0 mx-14 text-tertiary mb-8">
          <p className="font-semibold">
            Pronto nos contactaremos para contarte los próximos pasos.
          </p>
          <b className="font-extrabold">
            ¡Gracias por querer darle un hogar a {matchs.name}!
          </b>
        </div>
      )}
    </div>
  );
}

export default PetElection;
