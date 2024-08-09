import { defineConfig } from "unocss";

export default defineConfig({
  theme: {
    colors: {
      background: "#111111",
      blue: {
        1: "#0c111c",
        2: "#111725",
        3: "#172448",
        4: "#1d2e61",
        5: "#243974",
        6: "#2d4484",
        7: "#375098",
        8: "#405eb2",
        9: "#3d63dd",
        10: "#3f5cb0",
        11: "#93b4ff",
        12: "#d5e2ff",
      },
      gray: {
        1: "#111113",
        2: "#19191b",
        3: "#222325",
        4: "#292a2e",
        5: "#303136",
        6: "#393a40",
        7: "#46484f",
        8: "#5f606a",
        9: "#6c6e79",
        10: "#797b86",
        11: "#b2b3bd",
        12: "#eeeef0",
      },
    },
    fontFamily: {
      sans: ["Inter Variable", "system-ui", "sans-serif"],
    },
  },

  shortcuts: {
    "form-item": "flex flex-col gap-1",
    "label": "text-gray-11 font-500 text-sm",
    "input-text": "h-9 px-3 bg-gray-1 border border-gray-6 rounded focus:outline focus:outline-2 focus:outline-blue-8",
    "button": "h-9 px-3 bg-blue-9 rounded-md inline-flex items-center justify-center gap-3 font-600 transition-colors disabled:opacity-50 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-8 hover:bg-blue-10",
  },
});
