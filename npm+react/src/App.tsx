import { useEffect, useRef } from "react";
import { FormFiller } from "@tiro-health/web-sdk";
import "./App.css";

function App() {
  const formFillerRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const fillerRef = useRef<FormFiller | null>(null);

  useEffect(() => {
    if (!formFillerRef.current) return;

    const filler = new FormFiller({
      questionnaire:
        "http://templates.tiro.health/templates/9fad72eee83e46179f8ff096dbd875d0",
    });

    fillerRef.current = filler;
    filler.mount(formFillerRef.current);

    console.log("Form filler mounted successfully");

    return () => {
      if (fillerRef.current && typeof fillerRef.current.unmount === "function") {
        fillerRef.current.unmount();
        console.log("Form filler unmounted");
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
