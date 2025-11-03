import { useEffect, useRef } from "react";
import { FormFiller, Narrative, LaunchContextProvider } from "@tiro-health/web-sdk";
import "./App.css";

const QUESTIONNAIRE_URI = import.meta.env.VITE_QUESTIONNAIRE_URI;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const DATA_SERVER_URL = import.meta.env.VITE_DATA_SERVER_URL;

function App() {
  const launchContextRef = useRef<HTMLDivElement>(null);
  const formFillerRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!launchContextRef.current || !formFillerRef.current || !narrativeRef.current) return;

    const filler = new FormFiller({
      questionnaire: QUESTIONNAIRE_URI,
      sdcEndpoint: {
        address: BACKEND_URL,
      },
    });

    const launchContextProvider = new LaunchContextProvider({
      dataEndpoint: {
        resourceType: "Endpoint",
        address: DATA_SERVER_URL,
      },
      filler,
    });

    const narrative = new Narrative({ filler });

    launchContextProvider.mount(launchContextRef.current);
    filler.mount(formFillerRef.current);
    narrative.mount(narrativeRef.current);

    console.log("Tiro Web SDK initialized successfully");

    return () => {
      if (typeof launchContextProvider.unmount === "function") {
        launchContextProvider.unmount();
      }
      if (typeof filler.unmount === "function") {
        filler.unmount();
      }
      if (typeof narrative.unmount === "function") {
        narrative.unmount();
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="app-code-section">
        <h1 className="title">
          Tiro Web SDK Demo
          <span className="app-code-badge">Your App</span>
        </h1>
      </div>
      <main className="main-content">
        <div ref={launchContextRef} id="launch-context" className="sdk-component-wrapper">
          <span className="sdk-component-badge">SDK: LaunchContextProvider</span>
        </div>
        <div ref={formFillerRef} id="form-filler" className="sdk-component-wrapper">
          <span className="sdk-component-badge">SDK: FormFiller</span>
        </div>
        <div ref={narrativeRef} id="narrative" className="sdk-component-wrapper">
          <span className="sdk-component-badge">SDK: Narrative</span>
        </div>
      </main>
      
      <div className="sdk-legend">
        <h3>Component Legend</h3>
        <div className="legend-item">
          <div className="legend-box sdk"></div>
          <span className="legend-label">SDK Component</span>
        </div>
        <div className="legend-item">
          <div className="legend-box app"></div>
          <span className="legend-label">Your Application</span>
        </div>
      </div>
    </div>
  );
}

export default App;
