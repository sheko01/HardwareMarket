import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent {
  cart = inject(CartService);

  checkout() {
    alert(`Order placed! Total: $${this.cart.totalPrice().toFixed(2)}`);
    this.cart.clear();
  }
}
