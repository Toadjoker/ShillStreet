// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });
import { useState } from "react";
import { Header, LandingBox, Modal } from "../components";
import { SignUpForm } from "../components/forms";

export default function Landing() {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const handleHeaderCallback = (data: any) => {
    // 0 means register
    if (data === 0) {
      console.log(data);
      setIsShowModal(true);
    }
  };

  const handleModalCallback = (data: any) => {
    console.log(data);
    setIsShowModal(data);
  };

  return (
    <>
      <Header headerCallback={handleHeaderCallback} />
      <main className="h-screen w-full flex items-center justify-center bg-cloudBg bg-cover bg-center bg-no-repeat fixed">
        {/* show the modal on condition */}
        {isShowModal ? (
          <Modal modalCallback={handleModalCallback}>
            <SignUpForm />
          </Modal>
        ) : (
          <LandingBox />
        )}
      </main>
    </>
  );
}
