import { Component, type OnInit, type OnDestroy, ElementRef, ViewChild, type AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as TiroWebSDK from "@tiro-health/web-sdk";
import { SettingsPopoverComponent, getDefaultSettings, type Settings } from './settings-popover.component';

@Component({
  selector: 'app-launch-context-example',
  standalone: true,
  imports: [CommonModule, SettingsPopoverComponent],
  template: `
    <div class="container">
      <app-settings-popover (apply)="onSettingsApplied($event)"></app-settings-popover>
      <div class="app-code-section">
        <h1 class="title">
          Tiro Web SDK Test - Launch Context Provider
          <span class="app-code-badge">Your App</span>
        </h1>
        <div *ngIf="selectedPatientInfo" style="padding: 10px; margin: 10px 0; background-color: #e3f2fd; border-radius: 4px; border: 1px solid #2196f3;">
          <strong>Selected Patient:</strong> {{ selectedPatientInfo }}
        </div>
      </div>
      <div #launchContextProvider></div>
      <div class="sdk-legend">
        <h3>Component Legend</h3>
        <div class="legend-item">
          <div class="legend-box sdk"></div>
          <span class="legend-label">SDK Component</span>
        </div>
        <div class="legend-item">
          <div class="legend-box app"></div>
          <span class="legend-label">Your Application</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class LaunchContextExampleComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('launchContextProvider', { static: true }) launchContextProviderElement!: ElementRef;

  private filler: any;
  private narrative: any;
  private settings: Settings = getDefaultSettings();
  selectedPatientInfo = '';

  constructor() { }

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.initializeTiroSDK();
  }

  ngOnDestroy(): void {
    // Clean up if needed
    if (this.filler && typeof this.filler.unmount === 'function') {
      this.filler.unmount();
    }
    if (this.narrative && typeof this.narrative.unmount === 'function') {
      this.narrative.unmount();
    }
  }

  onSettingsApplied(settings: Settings): void {
    this.settings = settings;
    this.initializeTiroSDK();
  }

  private handlePatientChange = (patientId: string, patient: any): void => {
    console.log("Patient changed:", patientId, patient);
    if (patient) {
      const name = patient.name?.[0]?.text || "Unknown";
      const birthDate = patient.birthDate || "Unknown";
      this.selectedPatientInfo = `${name} (DOB: ${birthDate})`;
    } else {
      this.selectedPatientInfo = "";
    }
  };

  private async initializeTiroSDK(): Promise<void> {
    try {
      if (this.filler && typeof this.filler.unmount === 'function') {
        this.filler.unmount();
      }
      if (this.narrative && typeof this.narrative.unmount === 'function') {
        this.narrative.unmount();
      }

      // Create the form filler instance
      this.filler = new TiroWebSDK.FormFiller({
        questionnaire: this.settings.backendUrl + "templates/2630b8675c214707b1f86d1fbd4deb87",
      });

      // Create the narrative instance
      this.narrative = new TiroWebSDK.Narrative({ filler: this.filler });

      // Mount LaunchContextProvider with FormFiller and Narrative
      const launchContextProviderElement = this.launchContextProviderElement.nativeElement;

      if (launchContextProviderElement) {
        TiroWebSDK.mountLaunchContextProvider(launchContextProviderElement, {
          patients: [
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
          ],
          onPatientChange: this.handlePatientChange,
          children: ({ launchContext }: { launchContext: Record<string, unknown> }) => {
            console.log("Launch context:", launchContext);
            
            // Create container for FormFiller and Narrative
            const mainContent = document.createElement('main');
            mainContent.className = 'main-content';

            const formFillerWrapper = document.createElement('div');
            formFillerWrapper.className = 'sdk-component-wrapper';
            
            const launchContextBadge = document.createElement('span');
            launchContextBadge.className = 'sdk-component-badge';
            launchContextBadge.textContent = 'SDK: LaunchContextProvider';
            formFillerWrapper.appendChild(launchContextBadge);

            const formFillerDiv = document.createElement('div');
            formFillerDiv.id = 'form-filler';
            
            const formFillerBadge = document.createElement('span');
            formFillerBadge.className = 'sdk-component-badge';
            formFillerBadge.textContent = 'SDK: FormFiller';
            formFillerDiv.appendChild(formFillerBadge);
            
            formFillerWrapper.appendChild(formFillerDiv);

            const narrativeWrapper = document.createElement('div');
            narrativeWrapper.className = 'sdk-component-wrapper';
            narrativeWrapper.id = 'narrative';
            
            const narrativeBadge = document.createElement('span');
            narrativeBadge.className = 'sdk-component-badge';
            narrativeBadge.textContent = 'SDK: Narrative';
            narrativeWrapper.appendChild(narrativeBadge);

            mainContent.appendChild(formFillerWrapper);
            mainContent.appendChild(narrativeWrapper);

            // Mount SDK components
            setTimeout(() => {
              this.filler.mount(formFillerDiv);
              console.log('Form filler mounted successfully');
              
              this.narrative.mount(narrativeWrapper);
              console.log('Narrative mounted successfully');
            }, 0);

            return mainContent;
          }
        });
        console.log('LaunchContextProvider mounted successfully');
      } else {
        console.error('LaunchContextProvider element not found');
      }

      console.log('Tiro Web SDK initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Tiro Web SDK:', error);
    }
  }
}
