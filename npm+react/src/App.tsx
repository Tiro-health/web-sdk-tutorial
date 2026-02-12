import { useEffect, useRef } from "react";
import "@tiro-health/web-sdk";
import { SDCClient } from "@tiro-health/web-sdk";
import "./App.css";

const QUESTIONNAIRE_URI =
  "http://templates.tiro.health/templates/example|1.0.0";
const BACKEND_URL = "https://sdc-staging.tiro.health/fhir/r5";
const DATA_SERVER_URL =
  "https://fhir-candle-35032072625.europe-west1.run.app/fhir/r4";

/**
 * Replace this with your actual access token retrieval logic.
 * For example, fetch from your auth provider or session storage.
 */
function getAccessToken(): string {
  return "your-access-token";
}

const sdcClient = new SDCClient({
  baseUrl: BACKEND_URL,
  dataEndpoint: DATA_SERVER_URL,
  auth: () => getAccessToken(),
});

function App() {
  const formFillerRef = useRef<HTMLElement>(null);
  const magicClipboardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const formFiller = formFillerRef.current;
    const clipboard = magicClipboardRef.current;
    if (!formFiller) return;

    // Set SDCClient with auth on the form filler
    (formFiller as HTMLElement & { sdcClient: SDCClient }).sdcClient =
      sdcClient;

    // Form filler events
    formFiller.addEventListener("tiro-ready", (event: Event) => {
      console.log(
        "tiro-ready: Questionnaire loaded",
        (event as CustomEvent).detail.questionnaire
      );
    });

    formFiller.addEventListener("tiro-submit", (event: Event) => {
      console.log(
        "tiro-submit: Form submitted",
        (event as CustomEvent).detail.response
      );
    });

    formFiller.addEventListener("tiro-update", (event: Event) => {
      console.log(
        "tiro-update: Form values changed",
        (event as CustomEvent).detail.response
      );
    });

    formFiller.addEventListener("tiro-error", (event: Event) => {
      console.error("tiro-error:", (event as CustomEvent).detail.error);
    });

    formFiller.addEventListener("tiro-validate", (event: Event) => {
      const detail = (event as CustomEvent).detail;
      console.log("tiro-validate:", detail.isValid, detail.operationOutcome);
    });

    // Magic clipboard events
    if (clipboard) {
      clipboard.addEventListener("tiro-populate-start", (event: Event) => {
        const detail = (event as CustomEvent).detail;
        console.log(
          "tiro-populate-start: Notes:",
          detail.notes?.length || 0,
          "chars, Files:",
          detail.files?.length || 0
        );
      });

      clipboard.addEventListener("tiro-populate-complete", (event: Event) => {
        console.log(
          "tiro-populate-complete:",
          (event as CustomEvent).detail.response
        );
      });

      clipboard.addEventListener("tiro-populate-error", (event: Event) => {
        console.error(
          "tiro-populate-error:",
          (event as CustomEvent).detail.error
        );
      });
    }
  }, []);

  return (
    <div className="container">
      <h1 className="title">Tiro Web SDK Demo</h1>
      <main>
        <div className="section-header">
          <span className="section-title">Magic Clipboard</span>
          <span className="beta-badge">Beta</span>
        </div>
        <tiro-magic-clipboard
          ref={magicClipboardRef}
          for="form-filler"
        />
        <div className="section-header">
          <span className="section-title">Form Filler</span>
          <span className="ga-badge">GA</span>
        </div>
        <tiro-form-filler
          ref={formFillerRef}
          id="form-filler"
          questionnaire={QUESTIONNAIRE_URI}
          sdc-endpoint-address={BACKEND_URL}
          data-endpoint-address={DATA_SERVER_URL}
        />
        <div className="section-header">
          <span className="section-title">Narrative</span>
          <span className="ga-badge">GA</span>
        </div>
        <tiro-narrative for="form-filler" />
      </main>
    </div>
  );
}

export default App;
