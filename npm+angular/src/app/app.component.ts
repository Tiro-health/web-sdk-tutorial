import { Component, type OnInit, type OnDestroy, ElementRef, ViewChild, type AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as TiroWebSDK from "@tiro-health/web-sdk";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1 class="title">Tiro Web SDK Test</h1>
      <main class="main-content">
        <div #formFiller id="form-filler"></div>
        <div #narrative id="narrative"></div>
      </main>
    </div>
  `,
  styles: [`
    .container {
      padding: 0 1rem;
    }
    .title {
      font-size: 1.125rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    .main-content {
      padding: 0.5rem 0;
    }
  `]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('formFiller', { static: true }) formFillerElement!: ElementRef;
  @ViewChild('narrative', { static: true }) narrativeElement!: ElementRef;

  private filler: any;
  private narrative: any;

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.initializeTiroSDK();
  }

  ngOnDestroy(): void {
    // Clean up React components outside Angular's zone
    this.ngZone.runOutsideAngular(() => {
      try {
        console.log('Cleaning up Tiro Web SDK components...');
        
        if (this.filler && typeof this.filler.unmount === 'function') {
          this.filler.unmount();
          console.log('Form filler unmounted');
        }
        
        if (this.narrative && typeof this.narrative.unmount === 'function') {
          this.narrative.unmount();
          console.log('Narrative unmounted');
        }
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    });
  }

  private async initializeTiroSDK(): Promise<void> {
    // Run React component initialization outside Angular's zone to avoid conflicts
    this.ngZone.runOutsideAngular(async () => {
      try {
        console.log('Initializing Tiro Web SDK outside Angular zone...');
        
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
          console.log('Mounting form filler...');
          this.filler.mount(formFillerElement);
          console.log('Form filler mounted successfully');
        } else {
          console.error('Form filler element not found');
        }

        if (narrativeElement) {
          console.log('Mounting narrative...');
          this.narrative.mount(narrativeElement);
          console.log('Narrative mounted successfully');
        } else {
          console.error('Narrative element not found');
        }

        console.log('Tiro Web SDK initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Tiro Web SDK:', error);
        console.error('Error details:', error);
      }
    });
  }
}