module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xsm: "300px",
      sm: "640px",
      md: "768px",
      lg: "1024",
      xl: "1280",
      xlg: "1536",
      //
    },

    extend: {
      colors: {
        bodyGrey: "#e5e5e5",
        bodyBrown: "#D2691E",
        buttonGreen: "#016450",
        textGrey: "#767676",
        barOrange: "#ff8433",
        backdrop: "rgba(0, 0, 0, 0.5)",
        backdrop2: "rgba(0, 0, 0, 0.8)",
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
        slideDownVanish: {
          from: {
            transform: "translate(0px, -12px)",
            opacity: 1,
          },
          to: {
            transform: "translate(0px, 0)",
            opacity: 0.4,
          },
        },
        bgChange: {
          from: {
            background: "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)",
          },
          to: {
            background: "linear-gradient(326deg, #5f0a87 0%, #db5151 74%)",
          },
        },
        zoomIn: {
          from: {
            width: "200px",
            height: "auto",
          },
          to: {
            width: "400px",
            height: "auto",
          },
        },
        zoomOut: {
          from: {
            transform: "scale(1.5)",
          },
          to: {
            transform: "scale(1.0)",
          },
        },
      },
      animation: {
        rotate: "rotate 0.5s linear infinite",
        rise: "rise 0.2s ease 0s 1 normal forwards running",
        bgChange: "bgChange  2s linear 0s infinite normal forwards running",
        slideDownVanish: "slideDownVanish 0.2s linear forwards ",
        zoomIn: "zoomIn 0.2s linear forwards ",
        zoomOut: "zoomOut 0.2s linear forwards ",
      },
      content: {
        link: 'url("/icons/link.svg")',
      },
    },
  },
  plugins: [],
};
