import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product';
import { ProductFormComponent } from '../product-form/product-form';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, RouterLink, CurrencyPipe, ProductFormComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  productService = inject(ProductService);

  searchQuery = signal('');
  showForm = signal(false);
  editingProduct = signal<IProduct | null>(null);

  filtered = computed(() => {
    const q = this.searchQuery().toLowerCase();
    if (!q) return this.productService.products();
    return this.productService
      .products()
      .filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  });

  openAdd() {
    this.editingProduct.set(null);
    this.showForm.set(true);
  }

  openEdit(p: IProduct) {
    this.editingProduct.set(p);
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
    this.editingProduct.set(null);
  }

  onSave(data: Omit<IProduct, 'id' | 'showFullDesc' | 'reviews'>) {
    const ep = this.editingProduct();
    if (ep) {
      this.productService.updateProduct(ep.id, data);
    } else {
      this.productService.addProduct({ ...data, reviews: [] });
    }
    this.closeForm();
  }

  delete(id: number) {
    if (confirm('Delete this product?')) {
      this.productService.deleteProduct(id);
    }
  }
}
