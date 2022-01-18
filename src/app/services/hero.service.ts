import * as md5 from 'md5';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Payload } from '../models/payload';
import { Hero } from '../models/hero';

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

  private getTimestamp() {
    return new Date().getTime();
  }
  private getHash(timestamp: number) {
    const tobeHashed = `${timestamp}${process.env['NG_APP_PRIVATE_KEY']}${process.env['NG_APP_PUBLIC_KEY']}`;
    return md5(tobeHashed);
  }
}
