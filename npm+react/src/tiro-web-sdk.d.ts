import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "tiro-form-filler": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          questionnaire?: string;
          "sdc-endpoint-address"?: string;
          "data-endpoint-address"?: string;
        },
        HTMLElement
      >;
      "tiro-narrative": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          for?: string;
        },
        HTMLElement
      >;
      "tiro-magic-clipboard": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          for?: string;
        },
        HTMLElement
      >;
    }
  }
}
