import { useState } from "react";
import PropTypes from "prop-types";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import RegisterModalb from "./RegisterModalb";
import SuccessModalRegister from "./SuccessModalRegister";
import { registerAdopter } from "../../api/authService";
import PasswordRecovery from "./PasswordRecovery";
import RecoveryConfirmationModal from "./RecoveryConfirmationModal";

const AuthModalsController = ({
  isLoginOpen,
  setLoginOpen,
  isRegisterOpen,
  setRegisterOpen,
  isRegisterbOpen,
  setRegisterbOpen,
  isRecoverOpen,
  setRecoverOpen,
}) => {
  const [stepOneData, setStepOneData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showRecoveryConfirm, setShowRecoveryConfirm] = useState(false);
  const [serverError, setServerError] = useState("");

  const normalizeHomeType = (ht) => {
    if (ht.includes("pequeño")) return "Departamento pequeño";
    if (ht.includes("balcón") || ht.includes("perro"))
      return "Departamento grande";
    if (ht.includes("Casa") || ht.includes("mediana")) return "Casa grande";
    return ht;
  };

  const handleFullRegister = async (secondData) => {
    const first = stepOneData;
    const second = secondData;

    const rutValido = /^\d{7,8}-[0-9kK]$/;
    if (!rutValido.test(first.run)) {
      setServerError(
        "Ingrese un Documento de Identidad válido en Chile (formato 12345678-9)"
      );
      return;
    }

    const payload = {
      fullname: first.fullName,
      birthDate: first.birthDate,
      email: first.email,
      password: first.password,
      phoneNumber: first.phoneNumber,
      identityDocument: first.run,
      address: first.address,
      homeType: normalizeHomeType(first.homeType),
      allowsPets: first.allowsPets === "true",
      hadPets: first.hasPets === "true",
      hadPetsVaccinated: first.isVaccinated === "true",
      hadPetsCastrated: first.isSterilized === "true",
      hoursAlone: Number(first.hoursAlone),
      petDestroy: first.petDestroy,
      preparedToVisitVeterinarian: second.hasVeterinarian === "true",
      allowsVisit: second.allowsVisit === "true",
      isResponsibleAdoption: second.isResponsibleAdoption === "true",
      userPreferenceEnergy: second.energy,
      userPreferenceTraits: second.character,
      userPreferenceChildren: second.compatibility.includes("Con niños"),
      userPreferenceDogs: second.compatibility.includes("Con perros"),
      userPreferenceCats: second.compatibility.includes("Con gatos"),
    };

    try {
      await registerAdopter(payload);
      setShowSuccess(true);
      setRegisterOpen(false);
      setRegisterbOpen(false);
      setServerError("");
    } catch (err) {
      console.error("❌ Registro fallido:", err);
      setServerError(err.message);
    }
  };

  return (
    <>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onOpenRegister={() => {
          setServerError("");
          setRegisterOpen(true);
        }}
        onOpenRecovery={() => {
          setLoginOpen(false);
          setRecoverOpen(true);
        }}
      />

      <PasswordRecovery
        isOpen={isRecoverOpen}
        onClose={() => setRecoverOpen(false)}
        onBack={() => {
          setRecoverOpen(false);
          setLoginOpen(true);
        }}
        setLoginOpen={setLoginOpen}
        onSuccess={() => {
          setRecoverOpen(false);
          setShowRecoveryConfirm(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
        onNext={(firstData) => {
          setStepOneData(firstData);
          setServerError("");
          setRegisterOpen(false);
          setRegisterbOpen(true);
        }}
        serverError={serverError}
      />

      <RegisterModalb
        isOpen={isRegisterbOpen}
        onClose={() => {
          setServerError("");
          setRegisterbOpen(false);
        }}
        onBack={() => {
          setServerError("");
          setRegisterbOpen(false);
          setRegisterOpen(true);
        }}
        onFinish={handleFullRegister}
        serverError={serverError}
      />

      <SuccessModalRegister
        isOpen={showSuccess}
        onIngresar={() => {
          setShowSuccess(false);
          setRegisterOpen(false);
          setRegisterbOpen(false);
          setLoginOpen(true);
        }}
      />

      <RecoveryConfirmationModal
        isOpen={showRecoveryConfirm}
        onClose={() => setShowRecoveryConfirm(false)}
      />
    </>
  );
};

AuthModalsController.propTypes = {
  isLoginOpen: PropTypes.bool.isRequired,
  setLoginOpen: PropTypes.func.isRequired,
  isRegisterOpen: PropTypes.bool.isRequired,
  setRegisterOpen: PropTypes.func.isRequired,
  isRegisterbOpen: PropTypes.bool.isRequired,
  setRegisterbOpen: PropTypes.func.isRequired,
  isRecoverOpen: PropTypes.bool.isRequired,
  setRecoverOpen: PropTypes.func.isRequired,
};

export default AuthModalsController;
