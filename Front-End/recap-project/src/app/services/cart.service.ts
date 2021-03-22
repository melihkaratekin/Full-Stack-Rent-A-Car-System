import { Injectable } from '@angular/core';
import { CartItems } from './../models/entities/cart-items';
import { CartItem } from './../models/entities/cart-item';
import { Car } from './../models/entities/car';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(car:Car) {

    let item = CartItems.find(c => c.car.carId===car.carId)

    if(item) {
      item.quantity += 1;
    }
    else {
      let cartItem = new CartItem();
      cartItem.car = car;
      cartItem.quantity = 1
      CartItems.push(cartItem);
    }

  }

  removeFromCart(car:Car){
    let item:any = CartItems.find(c=>c.car.carId===car.carId);
    CartItems.splice(CartItems.indexOf(item),1);
  }

  listCart():CartItem[] {
    return CartItems;
  }

}
