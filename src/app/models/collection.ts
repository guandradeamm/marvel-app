export interface Collection {
  available: number;
  collectionURI: string;
  items: { name: string; resourceURI: string; type?: string }[];
  returned: number;
}
