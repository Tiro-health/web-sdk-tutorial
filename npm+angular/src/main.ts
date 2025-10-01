import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

// Import React and ReactDOM to make them available globally for Tiro Web SDK
import React from 'react';
import ReactDOM from 'react-dom/client';

// Make React available globally since Tiro Web SDK expects it
(window as any).React = React;
(window as any).ReactDOM = ReactDOM;

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));