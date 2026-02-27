import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCard } from '../product-card/product-card';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-master-products',
  imports: [FormsModule, ProductCard],
  templateUrl: './master-products.html',
  styleUrl: './master-products.css',
})
export class MasterProducts {
  productService = inject(ProductService);

  selectedCatName = signal<string>('');
  searchQuery = signal<string>('');
}
