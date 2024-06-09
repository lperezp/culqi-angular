import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  product = [{
    description: "Polo Culqi Lover",
    amount: 100
  }];

  payment() {
    // this.clqSrv.payorder(this.product[0]["description"], this.product[0]["amount"]);
  }
}
