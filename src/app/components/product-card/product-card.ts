import { Component, computed, inject, Input, OnChanges, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShortenPipe } from '../../pipes/shorten.pipe';
import { CardHoverDirective } from '../../directives/card-hover.directive';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { IProduct } from '../../models/product';

@Component({
  selector: 'app-product-card',
  imports: [ShortenPipe, CardHoverDirective, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard implements OnChanges {
  productService = inject(ProductService);
  cart = inject(CartService);

  @Input() recievedCat: string = '';
  @Input() searchQuery: string = '';

  private _cat = signal<string>('');
  private _query = signal<string>('');

  filteredList = computed(() => {
    const cat = this._cat();
    const q = this._query().toLowerCase().trim();
    return this.productService.products().filter((p) => {
      const matchCat = !cat || p.category === cat;
      const matchQ =
        !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  });

  ngOnChanges() {
    this._cat.set(this.recievedCat);
    this._query.set(this.searchQuery);
  }

  addToCart(p: IProduct) {
    this.cart.add(p, 1);
  }

  toggleDesc(item: IProduct) {
    item.showFullDesc = !item.showFullDesc;
  }
}
