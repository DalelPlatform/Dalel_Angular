import { Component, Input, OnInit } from '@angular/core';
import { IMeal } from '../../interfaces/IMeal';

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.css'],
  standalone : false
})
export class MealCardComponent implements OnInit {

  @Input() meals :IMeal = {} as IMeal;
  constructor() { }

  ngOnInit() {
  }




}
