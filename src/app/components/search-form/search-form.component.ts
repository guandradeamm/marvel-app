import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  hero: string = '';
  constructor(private heroService: HeroService) {}

  ngOnInit(): void {}
  public onSubmit() {
    if (!this.hero) {
      //TODO: convet native alert to component alert
      alert('Por favor busque por um personagem.');
      return;
    }
    this.heroService.getHeroes(this.hero).subscribe((res) => {
      console.log(res);
    });
  }
}
