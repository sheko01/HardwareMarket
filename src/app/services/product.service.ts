import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs'; // 1. Import forkJoin from RxJS
import { IProduct } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  private _products = signal<IProduct[]>([]);
  private _loading = signal<boolean>(false);
  private _nextId = signal<number>(1000);

  readonly products = this._products.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly categories = computed(() => {
    const cats = new Set(this._products().map((p) => p.category));
    return Array.from(cats);
  });

  loadAll() {
    this._loading.set(true);

    const smartphonesUrl =
      'https://dummyjson.com/products/category/smartphones?limit=30&select=id,title,description,price,category,thumbnail,images,rating,stock,reviews';
    const laptopsUrl =
      'https://dummyjson.com/products/category/laptops?limit=30&select=id,title,description,price,category,thumbnail,images,rating,stock,reviews';

    const fetchSmartphones = this.http.get<{ products: IProduct[] }>(smartphonesUrl);
    const fetchLaptops = this.http.get<{ products: IProduct[] }>(laptopsUrl);

    // use forkJoin to execute both HTTP requests in parallel and wait for both to complete
    forkJoin([fetchSmartphones, fetchLaptops]).subscribe({
      // handle the combined results of both requests
      next: ([smartphonesResponse, laptopsResponse]) => {
        // Merge the two arrays of products into one single array
        const allProducts = [...smartphonesResponse.products, ...laptopsResponse.products];

        //map the products to ensure all fields are present and have default values if missing
        const mapped: IProduct[] = allProducts.map((p) => ({
          ...p,
          images: p.images ?? [p.thumbnail],
          reviews: p.reviews ?? [],
          stock: p.stock ?? 10,
          rating: p.rating ?? 0,
          showFullDesc: false,
        }));

        // Update the Signals with the final list
        this._products.set(mapped);
        this._loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this._loading.set(false);
      },
    });
  }

  getById(id: number): IProduct | undefined {
    return this._products().find((p) => p.id === id);
  }

  addProduct(product: Omit<IProduct, 'id' | 'showFullDesc'>) {
    const newProduct: IProduct = {
      ...product,
      id: this._nextId(),
      showFullDesc: false,
      images: product.images?.length ? product.images : [product.thumbnail],
      reviews: product.reviews ?? [],
      rating: product.rating ?? 0,
      stock: product.stock ?? 10,
    };
    this._nextId.update((n) => n + 1);
    this._products.update((list) => [...list, newProduct]);
    return newProduct;
  }

  updateProduct(id: number, changes: Partial<Omit<IProduct, 'id'>>) {
    this._products.update((list) => list.map((p) => (p.id === id ? { ...p, ...changes } : p)));
  }

  deleteProduct(id: number) {
    this._products.update((list) => list.filter((p) => p.id !== id));
  }
}
