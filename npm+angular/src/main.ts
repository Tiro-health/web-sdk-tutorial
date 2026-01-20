import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import 'zone.js';

// Import Tiro Web SDK CSS
import '@tiro-health/web-sdk/style.css';

// Import global styles
import './styles.css';

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));