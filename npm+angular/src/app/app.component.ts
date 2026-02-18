import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  type ElementRef,
  ViewChild,
  type AfterViewInit,
} from "@angular/core";
import "@tiro-health/web-sdk";
import { SDCClient } from "@tiro-health/web-sdk";

const BACKEND_URL = "https://sdc.tiro.health/fhir/r5";
const DATA_SERVER_URL =
  "https://fhir-candle-35032072625.europe-west1.run.app/fhir/r4";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit {
  @ViewChild("formFiller", { static: true })
  formFillerRef!: ElementRef<HTMLElement>;

  @ViewChild("magicClipboard", { static: true })
  magicClipboardRef!: ElementRef<HTMLElement>;

  private sdcClient = new SDCClient({
    baseUrl: BACKEND_URL,
    dataEndpoint: DATA_SERVER_URL,
    auth: () => getAccessToken(),
  });

  ngAfterViewInit(): void {
    const formFiller = this.formFillerRef.nativeElement as HTMLElement & {
      sdcClient: SDCClient;
    };
    const clipboard = this.magicClipboardRef.nativeElement;

    // Set SDCClient with auth on the form filler
    formFiller.sdcClient = this.sdcClient;

    // Form filler events
    formFiller.addEventListener("tiro-ready", (event: Event) => {
      console.log(
        "tiro-ready: Questionnaire loaded",
        (event as CustomEvent).detail.questionnaire,
      );
    });

    formFiller.addEventListener("tiro-submit", (event: Event) => {
      console.log(
        "tiro-submit: Form submitted",
        (event as CustomEvent).detail.response,
      );
    });

    formFiller.addEventListener("tiro-update", (event: Event) => {
      console.log(
        "tiro-update: Form values changed",
        (event as CustomEvent).detail.response,
      );
    });

    formFiller.addEventListener("tiro-error", (event: Event) => {
      console.error("tiro-error:", (event as CustomEvent).detail.error);
    });

    formFiller.addEventListener("tiro-validate", (event: Event) => {
      const detail = (event as CustomEvent).detail;
      console.log("tiro-validate:", detail.isValid, detail.operationOutcome);
    });

    // Magic clipboard events
    clipboard.addEventListener("tiro-populate-start", (event: Event) => {
      const detail = (event as CustomEvent).detail;
      console.log(
        "tiro-populate-start: Notes:",
        detail.notes?.length || 0,
        "chars, Files:",
        detail.files?.length || 0,
      );
    });

    clipboard.addEventListener("tiro-populate-complete", (event: Event) => {
      console.log(
        "tiro-populate-complete:",
        (event as CustomEvent).detail.response,
      );
    });

    clipboard.addEventListener("tiro-populate-error", (event: Event) => {
      console.error(
        "tiro-populate-error:",
        (event as CustomEvent).detail.error,
      );
    });
  }
}

/**
 * Replace this with your actual access token retrieval logic.
 * For example, fetch from your auth provider or session storage.
 */
function getAccessToken(): string {
  return "your-access-token";
}
