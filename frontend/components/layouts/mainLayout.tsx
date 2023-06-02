import { useState } from "react"
import Header from "../header"
import Footer from "../footer"
type Props = {
    children: JSX.Element
}

const MainLayout = ({ children }: Props) => {
    const [isShowModal, setIsShowModal] = useState<boolean>(false)

    const handleHeaderCallback = (data: any) => {
        // 0 means register
        if (data === 0) {
            setIsShowModal(true)
        }
    }
    return (
        <section className="h-screen flex flex-col">
            <Header headerCallback={handleHeaderCallback} />
            {children}
            <Footer />
        </section>
    )
}

export default MainLayout
