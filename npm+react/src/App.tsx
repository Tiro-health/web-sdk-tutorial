import { useEffect, useRef } from "react";
import { FormFiller } from "@tiro-health/web-sdk";
import "./App.css";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const fillerRef = useRef<FormFiller | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const filler = new FormFiller({
      questionnaire:
        "http://templates.tiro.health/templates/9fad72eee83e46179f8ff096dbd875d0",
    });

    fillerRef.current = filler;
    filler.mount(ref.current);

    console.log("Form filler mounted successfully");

    return () => {
      if (fillerRef.current && typeof fillerRef.current.unmount === "function") {
        fillerRef.current.unmount();
        console.log("Form filler unmounted");
      }
    };
  }, []);

  return <div ref={ref} id="form-filler"></div>;
}

export default App;
