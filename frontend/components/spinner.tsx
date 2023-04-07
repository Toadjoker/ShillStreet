import Image from "next/image"
const Spinner = ({ width = 20, height = 20 }: any) => {
    return <Image src="/images/spinner.svg" alt="spinner" width={width} height={height} />
}

export default Spinner
