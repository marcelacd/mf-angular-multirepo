import { Component, OnInit } from '@angular/core';
import PubSub from 'pubsub-js'

interface ICommonProduct {
  id: number;
  price: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit{

  count = 0
  products: ICommonProduct[] = []

  constructor(
  ) { }

  ngOnInit(): void {
    // this.getProducts()
    PubSub.subscribe('products', (_message, data) => {
      this.products.unshift(data as unknown as ICommonProduct)
      this.count++
      localStorage.setItem('products', JSON.stringify(this.products))
    })
  }

  // getProducts(){
  //   const productsStorage = localStorage.getItem('products');
  //   if (productsStorage) {
  //     this.products = JSON.parse(productsStorage) as ICommonProduct[];
  //   }
  // }

}
