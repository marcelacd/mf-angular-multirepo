import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import PubSub from 'pubsub-js'

interface ICommonProduct {
  id: number;
  price: number;
  name: string;
}

@Component({
  standalone: true,
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  imports: [CommonModule],
})

export class PaymentComponent implements OnInit {
  constructor(
  ) { }

  products: ICommonProduct[] = [];

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(): void {
    const productsStorage = localStorage.getItem('products');
    if (productsStorage) {
      this.products = JSON.parse(productsStorage) as ICommonProduct[];
    }
  }

  deleteProduct(idProduct: number) {
    PubSub.publish('product', idProduct)
    this.products = this.products.filter(product => product.id !== idProduct)
    localStorage.setItem('products', JSON.stringify(this.products))
    this.getProducts()
  }
}

