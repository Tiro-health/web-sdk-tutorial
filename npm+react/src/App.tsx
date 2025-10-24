import { useEffect, useRef, useState } from "react";
import { FormFiller, Narrative } from "@tiro-health/web-sdk";
import "./App.css";

interface Questionnaire {
  name: string;
  url: string;
}

const FALLBACK_QUESTIONNAIRES: Questionnaire[] = [
  {
    name: "General Medical History",
    url: "http://templates.tiro.health/templates/9fad72eee83e46179f8ff096dbd875d0"
  },
  {
    name: "Patient Intake Form",
    url: "http://templates.tiro.health/templates/2630b8675c214707b1f86d1fbd4deb87"
  }
];

function App() {
  const formFillerRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const fillerRef = useRef<FormFiller | null>(null);
  const narrativeInstanceRef = useRef<Narrative | null>(null);
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuestionnaires() {
      try {
        const response = await fetch('/api/fhir/r5/Questionnaire/', {
          headers: {
            'Accept': 'application/fhir+json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.resourceType === 'Bundle' && Array.isArray(data.entry)) {
          const fetchedQuestionnaires = data.entry.map((entry: any) => ({
            name: entry.resource.name || entry.resource.id,
            url: entry.resource.url
          }));
          
          setQuestionnaires(fetchedQuestionnaires);
          
          if (fetchedQuestionnaires.length > 0) {
            setSelectedQuestionnaire(fetchedQuestionnaires[0].url);
          }
        }
      } catch (err) {
        console.error('Failed to fetch questionnaires, using fallback list:', err);
        setQuestionnaires(FALLBACK_QUESTIONNAIRES);
        if (FALLBACK_QUESTIONNAIRES.length > 0) {
          setSelectedQuestionnaire(FALLBACK_QUESTIONNAIRES[0].url);
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchQuestionnaires();
  }, []);

  useEffect(() => {
    if (!formFillerRef.current || !narrativeRef.current || !selectedQuestionnaire) return;

    // Cleanup existing instances
    if (fillerRef.current && typeof fillerRef.current.unmount === "function") {
      fillerRef.current.unmount();
    }
    if (narrativeInstanceRef.current && typeof narrativeInstanceRef.current.unmount === "function") {
      narrativeInstanceRef.current.unmount();
    }

    const filler = new FormFiller({
      questionnaire: selectedQuestionnaire,
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
  }, [selectedQuestionnaire]);

  return (
    <div className="container">
      <div className="app-code-section">
        <h1 className="title">
          Tiro Web SDK Test
          <span className="app-code-badge">Your App</span>
        </h1>
      </div>
      <main className="main-content">
        <div className="app-code-section" style={{ marginBottom: '1rem' }}>
          <label htmlFor="questionnaire-select" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
            Select Questionnaire:
            <span className="app-code-badge">Your App</span>
          </label>
          <select 
            id="questionnaire-select"
            value={selectedQuestionnaire}
            onChange={(e) => setSelectedQuestionnaire(e.target.value)}
            disabled={loading || !!error}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            }}
          >
            {loading && <option value="">Loading questionnaires...</option>}
            {error && <option value="">Error loading questionnaires</option>}
            {!loading && !error && questionnaires.map((q) => (
              <option key={q.url} value={q.url}>
                {q.name}
              </option>
            ))}
          </select>
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
