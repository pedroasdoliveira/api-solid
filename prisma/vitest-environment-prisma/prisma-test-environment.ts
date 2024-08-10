import { Environment } from "vitest";

export default <Environment>{
  name: "prisma",
  async setup() {
    console.log("Setup 🚀");

    return {
      async teardown() {
        console.log("Teardown");
      },
    };
  },
  transformMode: "ssr", // Use "web" para projetos web e "ssr" (Server-Side Rendering) para ambientes/servidores em Node.js
};
