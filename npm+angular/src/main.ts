import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import 'zone.js';

// Import global styles so custom classes and Tiro SDK CSS (via @import) are applied
import './styles.css';

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));