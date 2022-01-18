import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroList: Hero[] = [];
  subscription: Subscription;
  constructor(private heroService: HeroService) {
    this.subscription = this.heroService.getHeroes().subscribe((heroes) => {
      this.heroList = heroes;
    });
  }

  ngOnInit(): void {}
}
