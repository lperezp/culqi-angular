import { Component, OnInit } from '@angular/core';
import { NgCulqiService } from 'src/app/services/ng-culqi.service';

@Component({
  selector: 'app-culqi',
  templateUrl: './culqi.component.html',
  styleUrls: ['./culqi.component.css']
})
export class CulqiComponent implements OnInit {

  product = [{
    description : "Polo Culqi Lover",
    amount: 100
  }];

  constructor(private clqSrv : NgCulqiService ){
  }

  ngOnInit() {
    this.clqSrv.initCulqi();
  }

  payment(){
    this.clqSrv.payorder(this.product[0]["description"],this.product[0]["amount"]);
  }
}
