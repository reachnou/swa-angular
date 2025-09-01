import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  trigger, transition, style, animate, query, stagger
} from '@angular/animations';

type Category = 'Digital' | 'Merch' | 'Services';

interface Product {
  id: number;
  title: string;
  subtitle?: string;
  price: number;
  compareAt?: number;
  badge?: 'New' | 'Best Seller' | 'Limited';
  category: Category;
  rating?: number;      // 0..5
  reviews?: number;
  hue?: number;         // dynamic gradient color
}

interface CartItem {
  productId: number;
  qty: number;
}

/** Strongly-typed seed prevents 'badge' from widening to string */
const SEED_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Angular Portfolio Template',
    subtitle: 'SSR-ready, animations, SEO',
    price: 49,
    compareAt: 79,
    badge: 'Best Seller',
    category: 'Digital',
    rating: 5,
    reviews: 128,
  },
  {
    id: 2,
    title: '.NET Clean Architecture Kit',
    subtitle: 'DDD + CQRS + Tests',
    price: 79,
    compareAt: 99,
    badge: 'Limited',
    category: 'Digital',
    rating: 4,
    reviews: 64,
  },
  {
    id: 3,
    title: 'Developer Tee',
    subtitle: 'Premium cotton • Unisex',
    price: 24,
    category: 'Merch',
    rating: 4,
    reviews: 42,
  },
  {
    id: 4,
    title: 'Personal Code Review',
    subtitle: '1-hour Zoom + notes',
    price: 99,
    badge: 'New',
    category: 'Services',
    rating: 5,
    reviews: 17,
  },
  {
    id: 5,
    title: 'Resume Revamp',
    subtitle: 'ATS-friendly + metrics',
    price: 59,
    category: 'Services',
    rating: 5,
    reviews: 33,
  },
  {
    id: 6,
    title: 'Sticker Pack',
    subtitle: 'Angular • .NET • SQL',
    price: 9,
    category: 'Merch',
    rating: 4,
    reviews: 25,
  }
];

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [
    trigger('listStagger', [
      transition(':enter', [
        query('.card', [
          style({ opacity: 0, transform: 'translateY(12px) scale(.98)' }),
          stagger(70, animate('420ms cubic-bezier(.2,.8,.2,1)',
            style({ opacity: 1, transform: 'none' })
          ))
        ], { optional: true })
      ])
    ]),
    trigger('pulseIn', [
      transition(':enter', [
        style({ transform: 'scale(.96)', opacity: 0 }),
        animate('260ms 80ms cubic-bezier(.2,.8,.2,1)',
          style({ transform: 'none', opacity: 1 }))
      ])
    ])
  ],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  // Header
  title = 'Shop';
  tagline = 'Turn curiosity into checkout — simple, fast, delightful.';

  // Controls
  search = '';
  activeCategory: Category | 'All' = 'All';
  sortBy: 'popular' | 'price-asc' | 'price-desc' = 'popular';

  // UI state
  showCart = false;
  justAddedId: number | null = null;

  // Simple star helpers
  stars = [1, 2, 3, 4, 5];

  // Products + hues
  products: Product[] = SEED_PRODUCTS.map(p => ({ ...p, hue: (p.id * 47) % 360 }));

  // Fast lookup for template (avoids arrow functions in template)
  byId: Record<number, Product> = this.products.reduce(
    (acc, p) => ((acc[p.id] = p), acc),
    {} as Record<number, Product>
  );

  // Cart
  cart: CartItem[] = [];

  get filtered(): Product[] {
    let list = [...this.products];

    if (this.activeCategory !== 'All') {
      list = list.filter(p => p.category === this.activeCategory);
    }
    if (this.search.trim()) {
      const q = this.search.trim().toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.subtitle ?? '').toLowerCase().includes(q)
      );
    }
    switch (this.sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      default:
        // popular: rating then reviews
        list.sort((a, b) =>
          (b.rating ?? 0) - (a.rating ?? 0) || (b.reviews ?? 0) - (a.reviews ?? 0)
        );
    }
    return list;
  }

  // Cart helpers
  get cartCount(): number {
    return this.cart.reduce((n, l) => n + l.qty, 0);
  }

  get cartTotal(): number {
    return this.cart.reduce((sum, l) => {
      const p = this.byId[l.productId];
      return sum + (p ? p.price * l.qty : 0);
    }, 0);
  }

  addToCart(p: Product): void {
    const line = this.cart.find(l => l.productId === p.id);
    if (line) line.qty += 1;
    else this.cart.push({ productId: p.id, qty: 1 });

    // micro "added" feedback
    this.justAddedId = p.id;
    setTimeout(() => (this.justAddedId = null), 700);
  }

  inc(item: CartItem): void { item.qty += 1; }
  dec(item: CartItem): void {
    if (item.qty > 1) item.qty -= 1;
    else this.remove(item);
  }
  remove(item: CartItem): void {
    this.cart = this.cart.filter(l => l !== item);
  }

  trackById = (_: number, it: { id: number }) => it.id;
  trackByCart = (_: number, it: CartItem) => it.productId;
}
