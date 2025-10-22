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
      <h1 className="title">Tiro Web SDK Test</h1>
      <main className="main-content">
        <div ref={formFillerRef} id="form-filler"></div>
        <div ref={narrativeRef} id="narrative"></div>
      </main>
    </div>
  );
}

export default App;
