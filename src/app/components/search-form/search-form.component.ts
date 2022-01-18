import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  hero: string = '';
  constructor() {}

  ngOnInit(): void {}
  public onSubmit() {
    if (!this.hero) {
      //TODO: convet native alert to component alert
      alert('Por favor busque por um personagem.');
      return;
    }
  }
}
