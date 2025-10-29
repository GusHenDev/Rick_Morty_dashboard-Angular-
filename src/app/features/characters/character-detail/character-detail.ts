import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-detail.html',
  styleUrl: './character-detail.scss'
})
export class CharacterDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);

  character: any = null;
  loading = true;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.api.getCharacterById(id).subscribe({
        next: (res: any) => {
          this.character = res;
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
    }
  }
}
