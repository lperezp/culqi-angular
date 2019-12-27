import { Injectable } from '@angular/core';

export declare let Culqi;

@Injectable({
  providedIn: 'root'
})
export class NgCulqiService {
  token_id: string;

  constructor() {
    document.addEventListener ('payment_event', (token: any) => {
    this.token_id = token.detail;
    console.log(this.token_id)
  });
}

  initCulqi () {
      Culqi.publicKey  = "pk_test_94tTaKyy2oea3bQf"
    }

  payorder(description: string, amount: number) {
    Culqi.settings ({
      title: 'Culqi Store',
      currency: 'PEN',
      description: description,
      amount: amount*100
    });

    Culqi.options({
      lang: 'auto',
      modal: true,
      installments: false,
      customButton:"",
  });
  Culqi.open ();

  }

  open () {
    Culqi.open ();
  }

}
