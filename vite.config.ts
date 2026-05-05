import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        history: "src/pages/history.html",
        expenses: "src/pages/expenses.html",
        income: "src/pages/income.html",
        edit: "src/pages/edit.html",
      },
    },
  },
});
