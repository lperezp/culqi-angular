import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  product = [{
    description: "T-shirt size M",
    amount: 100
  },
  {
    description: "ngTicket Perú",
    amount: 300
  }];

  payment() {
    // this.clqSrv.payorder(this.product[0]["description"], this.product[0]["amount"]);
  }
}
