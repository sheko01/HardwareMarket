import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../models/product';

type ProductFormData = Omit<IProduct, 'id' | 'showFullDesc' | 'reviews'>;

@Component({
  selector: 'app-product-form',
  imports: [FormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductFormComponent implements OnChanges {
  @Input() product: IProduct | null = null;
  @Output() save = new EventEmitter<ProductFormData>();
  @Output() cancel = new EventEmitter<void>();

  form: ProductFormData = this.blank();

  ngOnChanges() {
    if (this.product) {
      const { id, showFullDesc, reviews, ...rest } = this.product;
      this.form = { ...rest };
    } else {
      this.form = this.blank();
    }
  }

  blank(): ProductFormData {
    return {
      title: '',
      price: 0,
      category: '',
      description: '',
      thumbnail: '',
      images: [],
      rating: 0,
      stock: 1,
    };
  }

  onSubmit() {
    if (!this.form.title.trim() || !this.form.category.trim()) return;
    this.save.emit({ ...this.form });
  }
}
