import "./app.css";
import App from "./App.svelte";
import "non.geist";
import "non.geist/mono";

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
