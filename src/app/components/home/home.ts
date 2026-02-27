import { Component, inject, OnInit } from '@angular/core';
import { SliderComponent } from '../slider/slider';
import { MasterProducts } from '../master-products/master-products';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  imports: [SliderComponent, MasterProducts],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  productService = inject(ProductService);

  ngOnInit() {
    if (this.productService.products().length === 0) {
      this.productService.loadAll();
    }
  }
}
