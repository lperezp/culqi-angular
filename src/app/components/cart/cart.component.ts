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
  listProducts = [
    {
      description: "T-shirt size M",
      amount: 100
    },
    {
      description: "ngTicket Perú",
      amount: 300
    }
  ];
  amountTotal = 400;
  order = {
    "amount": this.amountTotal * 100,
    "currency_code": "PEN",
    "description": "Sales of products",
    "order_number": Date.now(),
    "client_details": {
      "first_name": "nameDemo",
      "last_name": "LastNameDemo",
      "email": "demo@demo.com",
      "phone_number": "987654321"
    },
    "expiration_date": (Math.floor(Date.now() / 1000) + 86400),
    "confirm": false
  };
  styleCulqi = {
    logo: 'https://developers.google.com/static/homepage-assets/images/angular_gradient.png',
    bannerColor: '#5C44E4',
    buttonBackground: '#5C44E4',
    menuColor: '#5C44E4',
    linksColor: '#5C44E4',
    priceColor: '#5C44E4',
  };

  tokenCreated: string | null = null;
  orderCreated: string | null = null;

  paymentCulqi(): void {

  }
}
