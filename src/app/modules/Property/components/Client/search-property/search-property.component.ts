import { Component, OnInit } from '@angular/core';
import { PropertyOwnerService } from '../../../../../Services/Property/property-owner.service';
import { IProperty } from '../../../../../core/models/Property/IProperty';

@Component({
  selector: 'app-search-property',
  standalone: false,
  templateUrl: './search-property.component.html',
  styleUrls: ['./search-property.component.css'],
})
export class SearchPropertyComponent implements OnInit {
  list:IProperty[] = [];

  constructor(private service:PropertyOwnerService) {
   }
  ngOnInit() {
  }

  SearchText(value:string){
    this.service.getProperties(value).subscribe({
      next: (res) => {
        this.list = res.Data.Data;
        console.log(res.Data);
        console.log(res.Data.Data[0].Description);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
