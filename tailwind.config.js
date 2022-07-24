module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bodyGrey: "#e5e5e5",
        bodyBrown: "#D2691E",
        buttonGreen: "#016450",
        textGrey: "#767676",
        barOrange: "#ff8433",
        backdrop: "rgba(0, 0, 0, 0.5)",
        bgRed: "#DF7D45",
      },
      boxShadow: {
        blend: "0 1px 0 0 transparent, 0 2px 10px 0 rgb(0 0 0 / 10%)",
      },
      fontFamily: {
        "arial-arounded": ["Arial Rounded MT Bold"],
        "helvetica-neue": ["Helvetica Neue"],
        "rale-way": ["Railway"],
        roboto: ["Roboto"],
        arial: ["arial"],
      },
      keyframes: {
        rotate: {
          from: { transform: "rotateZ(0deg)" },
          to: { transform: "rotateZ(360deg)" },
        },
        rise: {
          from: { transform: "translate(0px,0); opacity: 0.4" },
          to: { transform: "translate(0px,-4px);opacity: 1" },
        },
      },
      animation: {
        rotate: "rotate 0.5s linear infinite",
        rise: "rise 0.2s ease 0s 1 normal forwards running",
      },
      content: {
        link: 'url("/icons/link.svg")',
      },
    },
  },
  plugins: [],
};
