import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Output() add = new EventEmitter();
  @Input() id: number;

  constructor() {
    this.id = 0;
  }

  ngOnInit(): void {}

  addProductToList(): void { 
    this.add.emit({id: this.id})
  }

}
