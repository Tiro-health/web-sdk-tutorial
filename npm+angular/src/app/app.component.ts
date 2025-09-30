import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiroSdkComponent } from './tiro-sdk/tiro-sdk.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TiroSdkComponent],
  template: `
    <div class="container">
      <h1 class="title">Tiro Web SDK Test</h1>
      <main class="main-content">
        <app-tiro-sdk></app-tiro-sdk>
      </main>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'web-sdk-tutorial-angular';
}