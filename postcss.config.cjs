const path = require("path");

module.exports = {
  plugins: {
    "postcss-import": {
      path: [path.resolve(__dirname, "src/shared/styles")],
    },
    "postcss-mixins": {
      mixinsDir: path.resolve(__dirname, "src/shared/styles/mixins"),
    },
    "postcss-simple-vars": {
      variables: {
        "breakpoint-mobile": "320px",
        "breakpoint-mobile-max": "767px",

        "breakpoint-tablet": "768px",
        "breakpoint-tablet-max": "1023px",

        "breakpoint-desktop": "1024px",
      },
    },
    "postcss-nested": {},
    autoprefixer: {},
  },
};
