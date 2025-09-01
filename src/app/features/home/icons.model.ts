import { SafeHtml } from "@angular/platform-browser";

export interface FlyIcon {
    icon: SafeHtml;
    top: number;     // percent of viewport height
    delay: number;   // seconds
    duration: number;// seconds
}