import { Component } from '@angular/core';
import { CartComponent } from "./components/cart/cart.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [CartComponent]
})
export class App {

}
