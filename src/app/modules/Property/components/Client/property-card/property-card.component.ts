import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProperty } from '../../../../../core/models/Property/IProperty';

@Component({
  selector: 'app-property-card',
  standalone: false,
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  @Input() property!: IProperty;
  @Output() ProductDetails = new EventEmitter<number>();

  constructor() {
    console.log(this.property);
   }

  ngOnInit() {
  }

  goToDetails(id : number) {
    //this.ProductDetails.emit(this.product.id);
  }

}
