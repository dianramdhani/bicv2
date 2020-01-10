import { Component } from '@angular/core';

@Component({
  selector: 'app-bic',
  templateUrl: './bic.component.html',
  styleUrls: ['./bic.component.scss']
})
export class BicComponent {
  refresh: Function;

  fetchRefreshFn(refresh: Function) {
    this.refresh = refresh;
  }
}