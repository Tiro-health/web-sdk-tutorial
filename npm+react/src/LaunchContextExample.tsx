import { useEffect, useRef, useState } from "react";
import { FormFiller, Narrative, LaunchContextProvider } from "@tiro-health/web-sdk";
import { SettingsPopover, getDefaultSettings, type Settings } from "./SettingsPopover";
import "./App.css";

function LaunchContextExample() {
  const formFillerRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const fillerRef = useRef<FormFiller | null>(null);
  const narrativeInstanceRef = useRef<Narrative | null>(null);
  const [settings, setSettings] = useState<Settings>(getDefaultSettings());
  const [selectedPatientInfo, setSelectedPatientInfo] = useState<string>("");

  useEffect(() => {
    if (!formFillerRef.current || !narrativeRef.current) return;

    if (fillerRef.current && typeof fillerRef.current.unmount === "function") {
      fillerRef.current.unmount();
    }
    if (narrativeInstanceRef.current && typeof narrativeInstanceRef.current.unmount === "function") {
      narrativeInstanceRef.current.unmount();
    }

    const filler = new FormFiller({
      questionnaire:
        settings.backendUrl + "templates/2630b8675c214707b1f86d1fbd4deb87",
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
  }, [settings]);

  const handleApplySettings = (newSettings: Settings) => {
    setSettings(newSettings);
  };

  const handlePatientChange = (patientId: string, patient: any) => {
    console.log("Patient changed:", patientId, patient);
    if (patient) {
      const name = patient.name?.[0]?.text || "Unknown";
      const birthDate = patient.birthDate || "Unknown";
      setSelectedPatientInfo(`${name} (DOB: ${birthDate})`);
    } else {
      setSelectedPatientInfo("");
    }
  };

  return (
    <div className="container">
      <SettingsPopover onApply={handleApplySettings} />
      <div className="app-code-section">
        <h1 className="title">
          Tiro Web SDK Test - Launch Context Provider
          <span className="app-code-badge">Your App</span>
        </h1>
        {selectedPatientInfo && (
          <div style={{ 
            padding: "10px", 
            margin: "10px 0", 
            backgroundColor: "#e3f2fd", 
            borderRadius: "4px",
            border: "1px solid #2196f3"
          }}>
            <strong>Selected Patient:</strong> {selectedPatientInfo}
          </div>
        )}
      </div>
      <LaunchContextProvider 
        onPatientChange={handlePatientChange}
        patients={[
          {
            id: "patient-1",
            name: "John Doe",
            birthDate: "1980-05-15",
            gender: "male",
          },
          {
            id: "patient-2", 
            name: "Jane Smith",
            birthDate: "1975-03-22",
            gender: "female",
          },
          {
            id: "patient-3",
            name: "Bob Johnson", 
            birthDate: "1990-11-08",
            gender: "male",
          },
        ]}
      >
        {({ launchContext }) => {
          console.log("Launch context:", launchContext);
          return (
            <main className="main-content">
              <div className="sdk-component-wrapper">
                <span className="sdk-component-badge">SDK: LaunchContextProvider</span>
                <div ref={formFillerRef} id="form-filler">
                  <span className="sdk-component-badge">SDK: FormFiller</span>
                </div>
              </div>
              <div ref={narrativeRef} id="narrative" className="sdk-component-wrapper">
                <span className="sdk-component-badge">SDK: Narrative</span>
              </div>
            </main>
          );
        }}
      </LaunchContextProvider>
      
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

export default LaunchContextExample;
