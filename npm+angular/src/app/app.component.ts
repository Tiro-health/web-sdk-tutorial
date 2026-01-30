import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  type ElementRef,
  ViewChild,
  type AfterViewInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import "@tiro-health/web-sdk";
import { SDCClient } from "@tiro-health/web-sdk";

const QUESTIONNAIRE_URI =
  "https://templates.tiro.health/templates/2630b8675c214707b1f86d1fbd4deb87";
const BACKEND_URL = "https://sdc-service-dev-wkrcomcqfq-ew.a.run.app/fhir/r5";
const DATA_SERVER_URL =
  "https://fhir-candle-35032072625.europe-west1.run.app/fhir/r4";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit {
  @ViewChild("formFiller", { static: true })
  formFillerRef!: ElementRef<HTMLElement>;

  questionnaireUrl = QUESTIONNAIRE_URI;
  dataUrl = DATA_SERVER_URL;

  private sdcClient = new SDCClient({
    baseUrl: BACKEND_URL,
    dataEndpoint: DATA_SERVER_URL,
    auth: () => `test-token-${Date.now()}`,
  });

  ngAfterViewInit(): void {
    const formFiller = this.formFillerRef.nativeElement as HTMLElement & {
      sdcClient: SDCClient;
    };

    formFiller.sdcClient = this.sdcClient;

    formFiller.addEventListener("tiro-ready", (event: Event) => {
      console.log(
        "Questionnaire loaded:",
        (event as CustomEvent).detail.questionnaire,
      );
    });

    formFiller.addEventListener("tiro-submit", (event: Event) => {
      console.log("Form submitted:", (event as CustomEvent).detail.response);
    });

    formFiller.addEventListener("tiro-error", (event: Event) => {
      console.error("Error:", (event as CustomEvent).detail.error);
    });

    formFiller.addEventListener("tiro-validate", (event: Event) => {
      const detail = (event as CustomEvent).detail;
      console.log("Validation result:", detail.isValid);
      console.log("OperationOutcome:", detail.operationOutcome);
    });

    console.log("Tiro Web SDK initialized with SDCClient");
  }
}
