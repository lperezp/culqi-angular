import { Injectable } from '@angular/core';
import { ICulqiOptions, ICulqiSettings } from '../models/culqi.model';
export declare let Culqi: any;

@Injectable({
  providedIn: 'root'
})
export class NgCulqiService {
  TOKEN_CULQI = '';

  constructor() {
    (window as any).culqi = this.culqi.bind(this);
  }

  loadScriptCulqi(): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://checkout.culqi.com/js/v4';
    script.onload = () => {
      console.log('Culqi loaded');
    };
    document.head.appendChild(script);
  }

  initCulqi(CULQI_PUBLIC_KEY: string): void {
    Culqi.publicKey = CULQI_PUBLIC_KEY;
  }

  generateToken(culqiSettings: ICulqiSettings, culqiOptions?: ICulqiOptions): void {
    Culqi.settings(culqiSettings);

    const options: ICulqiOptions = {
      lang: "es",
      installments: false,
      paymentMethods: {
        tarjeta: true,
        yape: true,
        bancaMovil: true,
        agente: true,
        billetera: true,
        cuotealo: true,
      },
      ...culqiOptions
    };
    Culqi.options(options);
    Culqi.open();
  }

  culqi() {
    console.log('Culqi', Culqi);
    if (Culqi.token) {
      const token = Culqi.token.id;
      console.log('Se ha creado un Token: ', token);
    } else if (Culqi.order) {
      const order = Culqi.order;
      console.log('Se ha creado el objeto Order: ', order);
    } else {
      console.log('Error : ', Culqi.error);
    }
  }
}
