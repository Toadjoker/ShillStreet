/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                logo: "url('/images/whiteBird.svg')",
                cloudBg: "url('/images/movingClouds.svg')",
            },
            colors: {
                shillStreetBlue: "#07A5C3",
                shillStreetGrey: "#323232",
                twitterBlue: "#1DA1F2",
                twitterBackGround:"#151C2B",
                twitterDisabledBlue:"#1D9BF0",
            },
            height: {
                76: "18rem",
                86: "20rem",
                160: "50rem",
            },
            width: {
                67: "25.5rem",
            },
        },
    },
    plugins: [],
}
