import { Component } from '@angular/core';

import { NgCulqiService } from 'ng-culqi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  product = {
    description: 'Artículo #01',
    amount: 35,
  };
  TOKEN_CULQI = '';

  constructor(private ngCulqiService: NgCulqiService) {
    document.addEventListener('payment_event', (token: any) => {
      this.TOKEN_CULQI = token.detail;
    });
  }

  ngOnInit() {
    this.ngCulqiService.initCulqi('ENTER_PUBLIC_KEY');
  }

  payment() {
    const culqiSettings = {
      title: 'My Angular Store',
      currency: 'PEN',
      description: this.product.description,
      amount: this.product.amount * 100,
    };
    const culqiOptions = {
      lang: 'auto',
      modal: true,
      installments: false,
      customButton: '',
      style: {
        logo: 'https://angularfrontenders.com/wp-content/uploads/2021/01/angular.png',
        maincolor: '#1976d2',
        buttontext: '',
        maintext: '',
        desctext: '',
      },
    };
    this.ngCulqiService.generateToken(culqiSettings, culqiOptions);
  }
}
