import * as md5 from 'md5';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private http: HttpClient) {}
  public getHeroes(query: string) {
    const timestamp = this.getTimestamp();
    const hash = this.getHash(timestamp);
    const url = `${process.env['NG_APP_BASE_URL']}/characters?nameStartsWith=${query}&apikey=${process.env['NG_APP_PUBLIC_KEY']}&ts=${timestamp}&hash=${hash}`;
    return this.http.get(url);
  }
  private getTimestamp() {
    return new Date().getTime();
  }
  private getHash(timestamp: number) {
    const tobeHashed = `${timestamp}${process.env['NG_APP_PRIVATE_KEY']}${process.env['NG_APP_PUBLIC_KEY']}`;
    return md5(tobeHashed);
  }
}
