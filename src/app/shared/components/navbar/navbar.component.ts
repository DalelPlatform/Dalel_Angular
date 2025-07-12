import { Component } from '@angular/core';
import { RestaurantService } from '../../../Services/Restaurant/restaurant.service';
import { IcartItem } from '../../../modules/Restaurant/interfaces/IcartItem';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private _restaurantService: RestaurantService) { }
  supTotal: number = 0;
  totalQuantity: number = 0;
  cartItems: IcartItem[] = [];

  ngOnInit() {

  }

  getCartItems() {
    this._restaurantService.getCartItems().subscribe({
      next: (res) => {
        this.cartItems = res.Data;
        console.log("this is res :", res); // Recommended for objects
        console.log("this is cart items :", this.cartItems); // Recommended for objects
        // console.log(this.menu)
        this.calculateSupTotal();
        this.calculateTotalQuantities();
      },
      error: (err) => {
        console.log("Error fetching menu items:");
        console.log(err);
      }
    })
  }


  updateQuantity(item: IcartItem, change: number) {

    let newQuantity = item.Quantity + change;
    // Optional: Prevent negative or zero quantity
    if (newQuantity < 1) {
      return;
    }
    item.Quantity = newQuantity;
    item.SupPrice = newQuantity * item.MenuItemPrice;


    this._restaurantService.updateCartItem(item.Id, newQuantity, item.MenuItemPrice).subscribe({
      next: (res) => {
        item.Quantity = newQuantity;
        console.log('Updated successfully', res);
        this.calculateSupTotal();
        this.calculateTotalQuantities();

      },
      error: (err) => {
        console.error('Error updating item', err);
      }
    });

  }

  calculateSupTotal() {
    this.supTotal = 0;
    for (let item of this.cartItems) {
      this.supTotal += item.SupPrice;
    }
    console.log("Total SupPrice:", this.supTotal);
  }

  calculateTotalQuantities() {
    this.totalQuantity = 0;
    for (let item of this.cartItems) {
      this.totalQuantity += item.Quantity;
    }
    console.log("Total Quantity:", this.totalQuantity);

  }

removeItem(item: IcartItem) {
  if (!confirm(`Are you sure you want to remove "${item.MenuItemName}" from the cart?`)) return;

  this._restaurantService.removeFromCart(item.Id).subscribe({
    next: (res) => {
      console.log('Item removed successfully', res);
      this.getCartItems();
    },
    error: (err) => {
      console.error('Error removing item', err);
    }
  });
}



  checkout(cartItems: IcartItem[]) {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items to your cart before proceeding to checkout.");
      return;
    }
    // Navigate to the checkout page or perform checkout logic
    console.log("Proceeding to checkout with items:", cartItems);
    // Implement your checkout logic here
  }

}
