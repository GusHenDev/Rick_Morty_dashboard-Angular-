import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="container py-3">
    <div class="d-flex mb-3">
      <input type="text" class="form-control me-2" placeholder="Buscar localização"
        [(ngModel)]="searchTerm"
        (input)="onSearch()" />
    </div>

    <div class="list-group">
      <a class="list-group-item list-group-item-action"
        *ngFor="let loc of locations">
        <div class="fw-bold">{{ loc.name }}</div>
        <small>Tipo: {{ loc.type }} | Dimensão: {{ loc.dimension }}</small>
      </a>
    </div>

    <div *ngIf="loading" class="text-center my-3">Carregando...</div>
    <div *ngIf="!hasMore && !loading" class="text-center my-3 text-muted">Fim dos resultados</div>
  </div>
  `
})
export class Locations implements OnInit {
  private api = inject(ApiService);

  locations: any[] = [];
  page = 1;
  loading = false;
  hasMore = true;
  searchTerm = '';

  ngOnInit() {
    this.loadLocations();
    this.observeScroll();
  }

  loadLocations(reset = false) {
    if (reset) {
      this.page = 1;
      this.locations = [];
      this.hasMore = true;
    }

    if (!this.hasMore || this.loading) return;

    this.loading = true;
    this.api.getLocations(this.page, this.searchTerm).subscribe({
      next: (res: any) => {
        if (res.results?.length) {
          this.locations.push(...res.results);
          this.page++;
        } else {
          this.hasMore = false;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.hasMore = false;
      }
    });
  }

  onSearch() {
    this.loadLocations(true);
  }

  observeScroll() {
    window.addEventListener('scroll', () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (nearBottom) this.loadLocations();
    });
  }
}
