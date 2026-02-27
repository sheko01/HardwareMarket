import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { IProduct } from '../../models/product';

@Component({
  selector: 'app-search',
  imports: [FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class SearchComponent {
  productService = inject(ProductService);
  cart = inject(CartService);

  query = signal('');
  added = signal<number | null>(null);

  results = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return [];
    return this.productService
      .products()
      .filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  });

  setQuery(val: string) {
    this.query.set(val);
  }

  addToCart(p: IProduct) {
    this.cart.add(p, 1);
    this.added.set(p.id);
    setTimeout(() => this.added.set(null), 1500);
  }
}
