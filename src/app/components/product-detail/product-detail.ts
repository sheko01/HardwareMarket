import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DecimalPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { IProduct } from '../../models/product';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, CurrencyPipe, FormsModule, DecimalPipe, DatePipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  productService = inject(ProductService);
  cart = inject(CartService);

  product = signal<IProduct | null>(null);
  selectedImage = signal('');
  qty = 1;
  addedToCart = signal(false);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.productService.getById(id);
    if (!found) {
      this.router.navigate(['/']);
      return;
    }
    this.product.set(found);
    this.selectedImage.set(found.images?.[0] ?? found.thumbnail);
  }

  selectImage(url: string) {
    this.selectedImage.set(url);
  }

  addToCart() {
    const p = this.product();
    if (!p) return;
    this.cart.add(p, this.qty);
    this.addedToCart.set(true);
    setTimeout(() => this.addedToCart.set(false), 2000);
  }

  stars(rating: number): string {
    const full = Math.round(rating);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  }
}
