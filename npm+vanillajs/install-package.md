# Run these commands:

`gcloud artifacts print-settings npm --scope=@tiro.health --repository=npm-ext --location=europe >> .npmrc`

`npx google-artifactregistry-auth --repo-config=./.npmrc --credential-config=./.npmrc`

`npm install @tiro-health/web-sdk@alpha`