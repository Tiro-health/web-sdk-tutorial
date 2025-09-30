import { useEffect, useRef } from "react";
import { FormFiller } from "@tiro-health/web-sdk";
import "./App.css";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const filler = new FormFiller({
      questionnaire:
        "http://templates.tiro.health/templates/9fad72eee83e46179f8ff096dbd875d0",
    });
    filler.mount(ref.current);
  }, []);

  return <div ref={ref} id="form-filler"></div>;
}

export default App;
