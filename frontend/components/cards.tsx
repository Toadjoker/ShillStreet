type landingMiniCardsProps = {
    index: number
    title: string
    subtitle: string
}

export const LandingMiniCards = ({ index, title, subtitle }: landingMiniCardsProps) => {
    return (
        <div
            key={index}
            className="bg-shillStreetGrey w-60 h-24 flex flex-col items-center justify-center text-white font-semibold text-center"
        >
            <p className="text-xl pt-5">{title}</p>
            <p className="text-lg">{subtitle}</p>
        </div>
    )
}
