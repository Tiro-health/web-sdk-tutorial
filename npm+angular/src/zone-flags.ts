// Zone.js configuration to prevent conflicts with React
// This file must be imported before zone.js

// Disable zone.js patching for APIs that React needs to control
(window as any).__Zone_disable_requestAnimationFrame = true;
(window as any).__Zone_disable_on_property = true;
(window as any).__Zone_disable_customElements = true;
(window as any).__Zone_disable_MutationObserver = true;

// Disable patching of Promise to avoid conflicts with React's scheduler
(window as any).__Zone_disable_Promise = true;

// Disable patching of setTimeout/setInterval for React's time slicing
(window as any).__Zone_disable_timers = true;

// Disable event patching that might interfere with React's event system
(window as any).__Zone_disable_addEventListener = true;
(window as any).__Zone_disable_removeEventListener = true;

// Allow React to handle its own event delegation
(window as any).__Zone_disable_EventTarget = true;

console.log('Zone.js flags configured to avoid React conflicts');