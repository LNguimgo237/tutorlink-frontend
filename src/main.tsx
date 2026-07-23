import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

(function initTheme() {
  try {
    const stored = localStorage.getItem("tutorlink-theme");
    if (stored) {
      const { state } = JSON.parse(stored);
      if (state?.isDark) document.documentElement.classList.add("dark");
    }
  } catch {}
})();

async function prepare() {
  console.log('VITE_DEMO_MODE=', import.meta.env.VITE_DEMO_MODE);
  if (import.meta.env.VITE_DEMO_MODE === 'true') {
    console.log('Demarrage de MSW...');
    const { worker } = await import('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' }); // les routes non-mockées passent normalement
    console.log('MSW demarre avec succes');
  }
}

prepare().catch((err)=> {
  console.error('prepare() a echoue:', err);
})
.then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
