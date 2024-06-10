import { CurrencyPipe } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NgCulqiService } from '../../services/ng-culqi.service';
import { ICulqiOptions } from '../../models/culqi.model';
export declare let Culqi: any;

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
  TOKEN_CULQI = '';
  amountTotal = 0;

  constructor(private ngCulqiService: NgCulqiService) {
    this.ngCulqiService.loadScriptCulqi();
    this.amountTotal = this.listProducts.reduce((acc, product) => acc + product.amount, 0);
  }

  @HostListener('document:payment_event', ['$event'])
  onPaymentEventCustom($event: CustomEvent) {
    this.TOKEN_CULQI = $event.detail;
  }


  paymentCulqi() {
    this.ngCulqiService.initCulqi('pk_test_a5b492dd2912c2db');
    const culqiSettings = {
      title: 'ng-culqi',
      currency: 'PEN',
      amount: (this.amountTotal * 100),
      order: 'ord_live_0CjjdWhFpEAZlxlz',
      xculqirsaid: '1',
      rsapublickey: 'test',
    };

    const culqiOptions: ICulqiOptions = {
      style: {
        logo: 'https://developers.google.com/static/homepage-assets/images/angular_gradient.png',
        bannerColor: '#5C44E4',
        buttonBackground: '#5C44E4',
        menuColor: '#5C44E4',
        linksColor: '#5C44E4',
        priceColor: '#5C44E4',
      }
    };
    this.ngCulqiService.generateToken(culqiSettings, culqiOptions);
  }
}