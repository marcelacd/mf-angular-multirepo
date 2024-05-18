import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProductCard } from '../models/product-card.interface';
import PubSub from 'pubsub-js'

@Component({
  standalone: true,
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  imports: [CommonModule],
})

export class ProductCardComponent {
  @Input() product?: IProductCard;

  constructor(
  ) { }

  clickCard(): void {
    PubSub.publish('products', this.product)
  }
}
