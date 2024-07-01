import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgCulqiService } from '../../services/ng-culqi.service';
import { ICulqiOptions, IOrderCulqiResponse } from '../../models/culqi.model';
import { environment } from '../../../environments/environment.development';

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
  constructor(private ngCulqiService: NgCulqiService) {
  }

  paymentCulqi(): void {
    this.ngCulqiService.generateOrder(this.order).subscribe((response: Partial<IOrderCulqiResponse>) => {
      console.log('Order Culqi', JSON.stringify(response));
      const culqiSettings = {
        title: this.order.description,
        currency: 'PEN',
        amount: this.order.amount,
        order: response.id,
        xculqirsaid: environment.xculqirsaid,
        rsapublickey: environment.rsapublickey
      };

      const culqiOptions: ICulqiOptions = { style: this.styleCulqi };
      this.ngCulqiService.generateToken(culqiSettings, culqiOptions);
    });
  }
}