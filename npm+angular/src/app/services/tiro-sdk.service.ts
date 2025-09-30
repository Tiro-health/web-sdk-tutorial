import { Injectable } from '@angular/core';
import * as TiroWebSDK from "@tiro-health/web-sdk";

@Injectable({
  providedIn: 'root'
})
export class TiroSdkService {
  private filler: any;
  private narrative: any;

  constructor() { }

  async initializeSDK(questionnaire: string): Promise<{ filler: any, narrative: any }> {
    try {
      // Create the form filler instance
      this.filler = new TiroWebSDK.FormFiller({
        questionnaire: questionnaire,
      });

      // Create the narrative instance
      this.narrative = new TiroWebSDK.Narrative({ filler: this.filler });

      console.log('Tiro Web SDK service initialized successfully');
      
      return {
        filler: this.filler,
        narrative: this.narrative
      };
    } catch (error) {
      console.error('Failed to initialize Tiro Web SDK service:', error);
      throw error;
    }
  }

  getFiller() {
    return this.filler;
  }

  getNarrative() {
    return this.narrative;
  }

  cleanup() {
    if (this.filler && typeof this.filler.unmount === 'function') {
      this.filler.unmount();
    }
    if (this.narrative && typeof this.narrative.unmount === 'function') {
      this.narrative.unmount();
    }
  }
}