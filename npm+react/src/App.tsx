import { useEffect, useRef } from "react";
import { FormFiller, Narrative } from "@tiro-health/web-sdk";
import "./App.css";

function App() {
  const formFillerRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const fillerRef = useRef<FormFiller | null>(null);
  const narrativeInstanceRef = useRef<Narrative | null>(null);

  useEffect(() => {
    if (!formFillerRef.current || !narrativeRef.current) return;

    const filler = new FormFiller({
      questionnaire:
        "http://templates.tiro.health/templates/2630b8675c214707b1f86d1fbd4deb87",
    });

    const narrative = new Narrative({ filler });

    fillerRef.current = filler;
    narrativeInstanceRef.current = narrative;

    filler.mount(formFillerRef.current);
    console.log("Form filler mounted successfully");

    narrative.mount(narrativeRef.current);
    console.log("Narrative mounted successfully");

    return () => {
      if (fillerRef.current && typeof fillerRef.current.unmount === "function") {
        fillerRef.current.unmount();
        console.log("Form filler unmounted");
      }
      if (narrativeInstanceRef.current && typeof narrativeInstanceRef.current.unmount === "function") {
        narrativeInstanceRef.current.unmount();
        console.log("Narrative unmounted");
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="app-code-section">
        <h1 className="title">
          Tiro Web SDK Test
          <span className="app-code-badge">Your App</span>
        </h1>
      </div>
      <main className="main-content">
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
