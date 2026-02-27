import { Injectable, signal, computed } from '@angular/core';
import { IProduct } from '../models/product';

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<ICartItem[]>([]);

  readonly items = this._items.asReadonly();

  readonly totalPrice = computed(() =>
    this._items().reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  );

  readonly totalCount = computed(() => this._items().reduce((sum, i) => sum + i.quantity, 0));

  add(product: IProduct, qty: number = 1) {
    this._items.update((list) => {
      const existing = list.find((i) => i.product.id === product.id);
      if (existing) {
        return list.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i,
        );
      }
      return [...list, { product, quantity: qty }];
    });
  }

  remove(productId: number) {
    this._items.update((list) => list.filter((i) => i.product.id !== productId));
  }

  updateQty(productId: number, qty: number) {
    if (qty <= 0) {
      this.remove(productId);
      return;
    }
    this._items.update((list) =>
      list.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i)),
    );
  }

  clear() {
    this._items.set([]);
  }
}
