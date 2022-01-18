import * as md5 from 'md5';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Payload } from '../models/payload';
import { Hero } from '../models/hero';
import { ImageNames } from '../models/image-names';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroes: Hero[] = [];
  private subject = new Subject<Hero[]>();
  constructor(private http: HttpClient) {}

  public getPayload(query: string): Observable<Payload> {
    const timestamp = this.getTimestamp();
    const hash = this.getHash(timestamp);
    const url = `${process.env['NG_APP_BASE_URL']}/characters?nameStartsWith=${query}&apikey=${process.env['NG_APP_PUBLIC_KEY']}&ts=${timestamp}&hash=${hash}`;
    return this.http.get<Payload>(url);
  }

  public getPayloadById(id: number): Observable<Payload> {
    const timestamp = this.getTimestamp();
    const hash = this.getHash(timestamp);
    const url = `${process.env['NG_APP_BASE_URL']}/characters/${id}?apikey=${process.env['NG_APP_PUBLIC_KEY']}&ts=${timestamp}&hash=${hash}`;
    return this.http.get<Payload>(url);
  }

  public getHeroById(payload: Payload): Observable<Hero> | null {
    if (payload.code !== 200) {
      alert('Nenhuma resposta foi recebida pela API.');
      return null;
    }
    const heroList = payload?.data?.results;
    if (heroList.length <= 0) {
      alert('Nenhum Heroi encontrado!');
      return null;
    }
    if (payload?.data?.count === 1) {
      return of(heroList[0]);
    }
    return null;
  }

  public registerHeroes(payload: Payload) {
    if (payload.code !== 200) {
      alert('Nenhuma resposta foi recebida pela API.');
      return;
    }
    const heroList = payload?.data?.results;
    if (heroList.length <= 0) {
      alert('Nenhum Heroi encontrado!');
      return;
    }
    this.heroes = heroList;
    this.subject.next(this.heroes);
  }

  public getHeroes(): Observable<Hero[]> {
    return this.subject.asObservable();
  }

  public getImage(name: ImageNames, hero: Hero): string {
    const imgUrl = `${hero.thumbnail.path}/${name}.${hero.thumbnail.extension}`;
    return imgUrl;
  }

  private getTimestamp() {
    return new Date().getTime();
  }
  private getHash(timestamp: number) {
    const tobeHashed = `${timestamp}${process.env['NG_APP_PRIVATE_KEY']}${process.env['NG_APP_PUBLIC_KEY']}`;
    return md5(tobeHashed);
  }
}
