import { Component, OnInit, Input } from '@angular/core';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';
import { ImageNames } from '../../models/image-names';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  @Input() hero: Hero;
  constructor(private heroService: HeroService) {}

  ngOnInit(): void {}
  public getImgUrl(): string {
    return this.heroService.getImage(ImageNames.medium, this.hero);
  }
}
