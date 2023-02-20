module.exports = {
  content: ['./src/**/*.{html,js,ts'],
  plugins: [require("daisyui")],
  darkMode:false,
  daisyui:{ styled:false,
    darkTheme:"dark",
    themes:[
      {
        mytheme: {
          "primary":"#F0F0F0",
          "primary-focus":"#0D98BA",
          "primary-content":"#F0F0F0",
          "secondary":"#0D98BA",
          "accent":"#0D98BA",
          "neutral":"#D9D9D9",
          "base-100":"#F3F2F2",
          "error": "#DC2828",
          "info": "#2463EB",
          "warning": "#DB7706",
          "success": "#16A249"
        },
      },"cupcake"
    ],

  },
}
