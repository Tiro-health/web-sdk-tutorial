import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiroSdkService } from '../services/tiro-sdk.service';

@Component({
  selector: 'app-tiro-sdk',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #formFiller id="form-filler"></div>
    <div #narrative id="narrative"></div>
  `,
  styles: []
})
export class TiroSdkComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('formFiller', { static: true }) formFillerElement!: ElementRef;
  @ViewChild('narrative', { static: true }) narrativeElement!: ElementRef;

  private filler: any;
  private narrative: any;

  constructor(private tiroSdkService: TiroSdkService) { }

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.initializeTiroSDK();
  }

  ngOnDestroy(): void {
    // Clean up using the service
    this.tiroSdkService.cleanup();
  }

  private async initializeTiroSDK(): Promise<void> {
    try {
      // Initialize SDK using the service
      const { filler, narrative } = await this.tiroSdkService.initializeSDK(
        "http://templates.tiro.health/templates/9fad72eee83e46179f8ff096dbd875d0"
      );

      this.filler = filler;
      this.narrative = narrative;

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