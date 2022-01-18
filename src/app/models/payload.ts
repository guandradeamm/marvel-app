import { Hero } from './hero';

export interface Payload {
  attributionHTML: string;
  attributionText: string;
  code: number;
  copyright: string;
  data: {
    count: number;
    limit: number;
    offset: number;
    results: Hero[];
    total: number;
  };
  etag: string;
  status: string;
}
