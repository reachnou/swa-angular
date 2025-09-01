import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TickerDirective } from './ticker.directive';
import { FlyIcon } from './icons.model';
import { SafeHtml } from '@angular/platform-browser';
import { IconsService } from './icons.service';
import { OutputToken, TokensService } from './tokens.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, TickerDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  slogan = 'Build clean systems. Ship with confidence.';
  icons: FlyIcon[];
  outputTokens: OutputToken[];

  constructor(
    private iconsService: IconsService,
    private tokensService: TokensService
  ) {
    this.icons = this.iconsService.getIcons();
    this.outputTokens = this.tokensService.getTokens();
  }
}
