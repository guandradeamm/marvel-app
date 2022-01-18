import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from '../../models/hero';
import { ImageNames } from '../../models/image-names';
import {
  faWindowClose,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  id: number;
  character: Hero;
  iconClose: IconDefinition = faWindowClose;

  constructor(
    private router: ActivatedRoute,
    private heroService: HeroService
  ) {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.heroService
      .getPayloadById(this.id)
      .subscribe((res) =>
        this.heroService
          .getHeroById(res)
          ?.subscribe((hero) => (this.character = hero))
      );
  }

  ngOnInit(): void {}
  public getImgUrl(): string {
    return this.heroService.getImage(ImageNames.uncanny, this.character);
  }
}
