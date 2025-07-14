import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../Services/TravelAgency/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { RestaurantService } from '../../../Services/Restaurant/restaurant.service';
import { IcartItem } from '../../../modules/Restaurant/interfaces/IcartItem';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
    standalone: false,
})
export class NavbarComponent implements OnInit{
isNotificationOpen = false;
notifications: any[] = [];
isLoggedIn: boolean = false;
 currentUrl: string = '';
 img: string = '';
   supTotal: number = 0;
  totalQuantity: number = 0;
  cartItems: IcartItem[] = []
constructor(private notificationService: NotificationService, private cookieService: CookieService, private router: Router,
      private toastr: ToastrService,private _restaurantService: RestaurantService){}
      ;
  ngOnInit() {
    this.loadNotifications();
    const Token= this.cookieService.get('Token')
    const role= this.cookieService.get('Role')
    const Image= this.cookieService.get('Image')
    this.img= Image
    console.log(Image)
     if (Token) {
    this.isLoggedIn = true;

  }
  this.currentUrl = this.router.url;
  console.log('Current URL on init:', this.currentUrl);

  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      this.currentUrl = event.urlAfterRedirects;
    });
  }
  isInAgancyClient(): boolean {
    return this.currentUrl.startsWith('/agancy/client');

  }
toggleNotifications() {
  this.isNotificationOpen = !this.isNotificationOpen;
  if (this.isNotificationOpen) {
    this.loadNotifications();
  }
}
loadNotifications() {
  this.notificationService.getNotifications().subscribe( {
      next: (res) => {
        this.notifications = res;
    console.log("Notifications loaded:", this.notifications);

      }
      , error: (err) => {
        if (err.status === 401) {
          this.toastr.error('Unauthorized access');
          this.router.navigate(['/login']);
        }
      }


    })
}
  markAsRead(id: number) {
    this.notificationService.markAsRead(id).subscribe(() => {
      this.notifications = this.notifications.filter(n => n.Id !== id);
     console.log('Notification marked as read:', this.notifications );
    });
  }
  getBookingId(message: string): number {
  const match = message.match(/BookingId:(\d+)/);
  console.log("Extracted BookingId:", match ? +match[1] : 0);
  return match ? +match[1] : 0;
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
logout() {
  console.log("g")
this.cookieService.deleteAll();
  this.router.navigate(['/mainPage']);
  this.isLoggedIn = false;
}
}
