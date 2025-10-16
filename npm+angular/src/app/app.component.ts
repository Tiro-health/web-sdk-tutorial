import { Component, type OnInit, type OnDestroy, ElementRef, ViewChild, type AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as TiroWebSDK from "@tiro-health/web-sdk";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('formFiller', { static: true }) formFillerElement!: ElementRef;
  @ViewChild('narrative', { static: true }) narrativeElement!: ElementRef;

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
    // Clean up if needed
    if (this.filler && typeof this.filler.unmount === 'function') {
      this.filler.unmount();
    }
    if (this.narrative && typeof this.narrative.unmount === 'function') {
      this.narrative.unmount();
    }
  }

  private async initializeTiroSDK(): Promise<void> {
    try {
      // Create the form filler instance
      this.filler = new TiroWebSDK.FormFiller({
        questionnaire: "https://templates.tiro.health/templates/9fad72eee83e46179f8ff096dbd875d0",
      });

      // Create the narrative instance
      this.narrative = new TiroWebSDK.Narrative({ filler: this.filler });

      // Mount the components to their respective DOM elements
      const formFillerElement = this.formFillerElement.nativeElement;
      const narrativeElement = this.narrativeElement.nativeElement;

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