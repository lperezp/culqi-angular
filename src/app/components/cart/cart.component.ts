import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ICulqiOptions, IOrderCulqiResponse, NgxCulqiService } from 'ngx-culqi';
import { environment } from '../../../environments/environment';

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

  constructor(private ngxCulqiService: NgxCulqiService) { }

  ngOnInit(): void {
    this.ngxCulqiService.loadScriptCulqi(environment.tokenCulqi, environment.apiKeyCulqi);
    this.ngxCulqiService.tokenCreated$.subscribe(value => {
      if (value) {
        this.showToken(value);
        this.ngxCulqiService.closeCulqi();
      }
    });

    this.ngxCulqiService.orderCreated$.subscribe(value => {
      if (value) {
        this.showOrder(value);
      }
    });
  }

  paymentCulqi(): void {
    const order = {
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
    this.ngxCulqiService.generateOrder(order).subscribe((response: Partial<IOrderCulqiResponse>) => {
      const culqiSettings = {
        title: order.description,
        currency: 'PEN',
        amount: order.amount,
        order: response.id,
        xculqirsaid: environment.xculqirsaid,
        rsapublickey: environment.rsapublickey
      };

      const culqiOptions: ICulqiOptions = { style: this.styleCulqi };
      this.ngxCulqiService.generateToken(culqiSettings, culqiOptions);
    });
  }

  showToken(token: string): void {
    this.tokenCreated = token;
  }

  showOrder(order: string): void {
    this.orderCreated = order;
  }
}
