import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import RegisterModalb from "./RegisterModalb";
import { useState } from "react";

const AuthModalsController = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isRegisterbOpen, setRegisterbOpen] = useState(false);

  return (
    <>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onOpenRegister={() => setRegisterOpen(true)}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
        onNext={() => setRegisterbOpen(true)}
      />
      <RegisterModalb
        isOpen={isRegisterbOpen}
        onClose={() => setRegisterbOpen(false)}
      />
    </>
  );
};

export default AuthModalsController;
