import { Collection } from './collection';

export interface Hero {
  comics: Collection;
  description: string;
  events: Collection;
  id: number;
  modified: string;
  name: string;
  resourceURI: string;
  series: Collection;
  stories: Collection;
  thumbnail: {
    extension: string;
    path: string;
  };
  urls: { type: string; url: string }[];
}
