import antfu from "@antfu/eslint-config";

export default antfu({
  react: true,
  formatters: {
    css: true,
  },

  stylistic: {
    quotes: "double",
    semi: true,
  },

  rules: {
    curly: "off",
  },
});
