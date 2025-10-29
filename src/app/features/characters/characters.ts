import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
  <div class="container py-3">
    <div class="d-flex mb-3">
      <input type="text" class="form-control me-2" placeholder="Buscar personagem"
        [(ngModel)]="searchTerm"
        (input)="onSearch()" />
    </div>

    <div class="row g-3">
      <div class="col-md-3" *ngFor="let char of characters">
        <div class="card h-100">
          <img [src]="char.image" class="card-img-top" alt="Imagem do personagem" />
          <div class="card-body">
            <h5 class="card-title">{{ char.name }}</h5>
            <p class="card-text">
              <span class="badge bg-secondary">{{ char.status }}</span>
            </p>
            <a [routerLink]="['/characters', char.id]" class="btn btn-outline-primary btn-sm">Detalhes</a>
          </div>
        </div>
      </div>
    </div>

    <div *ngIf="loading" class="text-center my-3">Carregando...</div>
    <div *ngIf="!hasMore && !loading" class="text-center my-3 text-muted">Fim dos resultados</div>
  </div>
  `,
})
export class Characters implements OnInit {
  private api = inject(ApiService);

  characters: any[] = [];
  page = 1;
  loading = false;
  hasMore = true;
  searchTerm = '';

  ngOnInit() {
    this.loadCharacters();
    this.observeScroll();
  }

  loadCharacters(reset = false) {
    if (reset) {
      this.page = 1;
      this.characters = [];
      this.hasMore = true;
    }

    if (!this.hasMore || this.loading) return;

    this.loading = true;
    this.api.getCharacters(this.page, this.searchTerm).subscribe({
      next: (res : any) => {
        if (res.results?.length) {
          this.characters.push(...res.results);
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
    this.loadCharacters(true);
  }

  observeScroll() {
    window.addEventListener('scroll', () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (nearBottom) this.loadCharacters();
    });
  }
}
