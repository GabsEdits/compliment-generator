import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import assert from "node:assert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
});
