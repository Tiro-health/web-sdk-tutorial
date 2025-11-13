import { Component, type OnInit, type OnDestroy, ElementRef, ViewChild, type AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFiller, Narrative, LaunchContextProvider } from "@tiro-health/web-sdk";

const QUESTIONNAIRE_URI = "https://templates.tiro.health/templates/2630b8675c214707b1f86d1fbd4deb87";
const BACKEND_URL = "https://sdc-service-staging-wkrcomcqfq-ew.a.run.app/fhir/r5";
const DATA_SERVER_URL = "https://fhir-candle-35032072625.europe-west1.run.app/fhir/r4";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('launchContext', { static: true }) launchContextElement!: ElementRef;
  @ViewChild('formFiller', { static: true }) formFillerElement!: ElementRef;
  @ViewChild('narrative', { static: true }) narrativeElement!: ElementRef;

  private launchContextProvider: any;
  private filler: any;
  private narrative: any;

  constructor() { }

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.initializeTiroSDK();
  }

  ngOnDestroy(): void {
    if (this.launchContextProvider && typeof this.launchContextProvider.unmount === 'function') {
      this.launchContextProvider.unmount();
    }
    if (this.filler && typeof this.filler.unmount === 'function') {
      this.filler.unmount();
    }
    if (this.narrative && typeof this.narrative.unmount === 'function') {
      this.narrative.unmount();
    }
  }

  private async initializeTiroSDK(): Promise<void> {
    try {
      this.filler = new FormFiller({
        questionnaire: QUESTIONNAIRE_URI,
        sdcEndpoint: {
          resourceType: "Endpoint",
          address: BACKEND_URL,
        },
      });

      this.launchContextProvider = new LaunchContextProvider({
        dataEndpoint: {
          resourceType: "Endpoint",
          address: DATA_SERVER_URL,
        },
        filler: this.filler,
      });

      this.narrative = new Narrative({ filler: this.filler });

      const launchContextElement = this.launchContextElement.nativeElement;
      const formFillerElement = this.formFillerElement.nativeElement;
      const narrativeElement = this.narrativeElement.nativeElement;

      if (launchContextElement) {
        this.launchContextProvider.mount(launchContextElement);
        console.log('Launch context provider mounted successfully');
      } else {
        console.error('Launch context element not found');
      }

      if (formFillerElement) {
        this.filler.mount(formFillerElement);
        console.log('Form filler mounted successfully');
      } else {
        console.error('Form filler element not found');
      }

      if (narrativeElement) {
        this.narrative.mount(narrativeElement);
        console.log('Narrative mounted successfully');
      } else {
        console.error('Narrative element not found');
      }

      console.log('Tiro Web SDK initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Tiro Web SDK:', error);
    }
  }
}
