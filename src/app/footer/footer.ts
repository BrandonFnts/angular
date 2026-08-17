import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
