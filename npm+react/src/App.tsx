import "@tiro-health/web-sdk";
import "./App.css";

const QUESTIONNAIRE_URI = import.meta.env.VITE_QUESTIONNAIRE_URI;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const DATA_SERVER_URL = import.meta.env.VITE_DATA_SERVER_URL;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "tiro-form-filler": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          questionnaire?: string;
          "sdc-endpoint-address"?: string;
          "data-endpoint-address"?: string;
        },
        HTMLElement
      >;
      "tiro-narrative": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          for?: string;
        },
        HTMLElement
      >;
    }
  }
}

function App() {
  return (
    <div className="container">
      <div className="app-code-section">
        <h1 className="title">
          Tiro Web SDK Demo
          <span className="app-code-badge">Your App</span>
        </h1>
      </div>
      <main className="main-content">
        <div className="sdk-component-wrapper">
          <span className="sdk-component-badge">SDK: FormFiller</span>
          <tiro-form-filler
            id="form-filler"
            questionnaire={QUESTIONNAIRE_URI}
            sdc-endpoint-address={BACKEND_URL}
            data-endpoint-address={DATA_SERVER_URL}
          />
        </div>
        <div className="sdk-component-wrapper">
          <span className="sdk-component-badge">SDK: Narrative</span>
          <tiro-narrative for="form-filler" />
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
