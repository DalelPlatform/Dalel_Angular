import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IcartItem } from '../../interfaces/IcartItem';
import { Router } from '@angular/router';
import { RestaurantService } from '../../../../Services/Restaurant/restaurant.service';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css'],
  standalone: false
})
export class CartCheckoutComponent implements OnInit {

  cartItems: IcartItem[] = [];
  supTotal: number = 0;
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.getCartItems();

  }


  getCartItems() {
    this.restaurantService.getCartItems().subscribe({
      next: (res) => {
        this.cartItems = res.Data;
        console.log('Cart items loaded:', this.cartItems);
        this.calculateSupTotal();
      },
      error: (err) => {
        console.error('Error loading cart items:', err);
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




  //payment method

  @ViewChild('paypalButtons') paypalButtons!: ElementRef;
  @ViewChild('alternativePayment') alternativePayment!: ElementRef;

  ngAfterViewInit(): void {
    // Address card click logic
    document.querySelectorAll('.address-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.address-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const radio = card.querySelector('input[type="radio"]') as HTMLInputElement;
        if (radio) {
          radio.checked = true;
        }
      });
    });

    // Stop radio propagation
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('click', (e: Event) => {
        e.stopPropagation();
      });
    });

    // Payment method change logic
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
      radio.addEventListener('change', (e: Event) => {
        const input = e.target as HTMLInputElement;
        const paypalButtonsEl = this.paypalButtons.nativeElement;
        const altPaymentEl = this.alternativePayment.nativeElement;

        if (input.value === 'paypal') {
          paypalButtonsEl.style.display = 'block';
          altPaymentEl.style.display = 'none';
        } else {
          paypalButtonsEl.style.display = 'none';
          altPaymentEl.style.display = 'block';
        }
      });
    });

    // Show PayPal by default
    if (this.paypalButtons) {
      this.paypalButtons.nativeElement.style.display = 'block';
    }
  }

  handlePayPalPayment(): void {
    alert('Redirecting to PayPal...');
    window.open('https://www.paypal.com', '_blank');
  }

  handleDebitCreditCard(): void {
    alert('Redirecting to PayPal for card payment...');
    window.open('https://www.paypal.com', '_blank');
  }

  handleAlternativePayment(): void {
    const selected = document.querySelector('input[name="paymentMethod"]:checked') as HTMLInputElement;
    if (selected?.value === 'cash') {
      alert('Cash on Delivery selected. Order will be processed.');
    } else if (selected?.value === 'stripe') {
      alert('Redirecting to Stripe...');
      window.open('https://stripe.com', '_blank');
    }
  }



  submitCheckout(
  address: string,
  city: string,
  phoneNumber: string,
  notes: string,
  paymentMethod: string
) {
  const checkoutData = {
    address,
    city,
    phoneNumber,
    notes,
    paymentMethod,
    cartItems: this.cartItems,
    total: this.supTotal + 16.84
  };

  console.log('Checkout Data:', checkoutData);

  // 📨 ابعتهم للباك اند هنا مثلاً:
  // this.http.post('/api/checkout', checkoutData).subscribe({
  //   next: (res) => console.log('Order placed!', res),
  //   error: (err) => console.error('Checkout failed:', err)
  // });
}


getSelectedPaymentMethod(): string {
  const methods = ['cashOnDelivery', 'paypalMethod', 'stripeMethod'];
  for (const method of methods) {
    const el = document.getElementById(method) as HTMLInputElement;
    if (el && el.checked) return el.value;
  }
  return '';
}

}

