import { useState } from "react"
import { MainLayout, WaitlistBox, Modal } from "../components"
import { SignUpForm } from "../components/forms"

export default function Landing() {
    const [isShowModal, setIsShowModal] = useState<boolean>(false)
    // const handleHeaderCallback = (data: any) => {
    //     // 0 means register
    //     if (data === 0) {
    //         setIsShowModal(true)
    //     }
    // }

    const handleModalCallback = (data: any) => {
        setIsShowModal(data)
    }

    return (
        <MainLayout>
            {/* <Header headerCallback={handleHeaderCallback} /> */}
            <section className="flex flex-col flex-grow w-full items-center justify-center bg-cloudBg bg-cover bg-center bg-no-repeat">
                {/* show the modal on condition */}
                {isShowModal ? (
                    <Modal modalCallback={handleModalCallback}>
                        <SignUpForm />
                    </Modal>
                ) : (
                    <WaitlistBox />
                )}
            </section>
        </MainLayout>
    )
}
