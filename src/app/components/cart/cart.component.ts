import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ICulqiOptions, IOrderCulqiResponse, NgxCulqiService } from 'ngx-culqi';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  listProducts = [
    {
      description: 'T-shirt ngx-culqi',
      amount: 100,
    },
    {
      description: 'ticket ngx-culqi',
      amount: 300,
    },
  ];
  amountTotal = 400;
  isConfigured = false;

  configForm!: FormGroup;

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

  constructor(
    private ngxCulqiService: NgxCulqiService,
    private fb: FormBuilder,
  ) {
    this.configForm = this.fb.group({
      tokenCulqi: ['', Validators.required],
      apiKeyCulqi: ['', Validators.required],
      xculqirsaid: ['', Validators.required],
      rsapublickey: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ngxCulqiService.tokenCreated$.subscribe((value) => {
      if (value) {
        this.showToken(value);
        this.ngxCulqiService.closeCulqi();
      }
    });

    this.ngxCulqiService.orderCreated$.subscribe((value) => {
      if (value) {
        this.showOrder(value);
      }
    });
  }

  setConfigureCulqi(): void {
    if (this.configForm.valid) {
      this.isConfigured = true;
      this.configForm.disable();
      const { tokenCulqi, apiKeyCulqi } = this.configForm.value;
      this.ngxCulqiService.loadScriptCulqi(tokenCulqi, apiKeyCulqi);
    }
  }

  paymentCulqi(): void {
    const order = {
      amount: this.amountTotal * 100,
      currency_code: 'PEN',
      description: 'Sales of products',
      order_number: Date.now(),
      client_details: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'demo@lperezp.dev',
        phone_number: '987654321',
      },
      expiration_date: Math.floor(Date.now() / 1000) + 86400,
      confirm: false,
    };
    this.ngxCulqiService
      .generateOrder(order)
      .subscribe((response: Partial<IOrderCulqiResponse>) => {
        const { xculqirsaid, rsapublickey } = this.configForm.value;
        const culqiSettings = {
          title: order.description,
          currency: 'PEN',
          amount: order.amount,
          order: response.id,
          xculqirsaid,
          rsapublickey,
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
