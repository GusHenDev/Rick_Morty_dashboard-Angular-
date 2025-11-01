import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './characters.html',
  styleUrl: './characters.scss'
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
