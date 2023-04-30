import { useState } from "react"
import Header from "../header"
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
        </section>
    )
}

export default MainLayout
