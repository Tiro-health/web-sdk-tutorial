import { Component, type OnInit, type OnDestroy, ElementRef, ViewChild, type AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as TiroWebSDK from "@tiro-health/web-sdk";
import { SettingsPopoverComponent, getDefaultSettings, type Settings } from './settings-popover.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SettingsPopoverComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
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