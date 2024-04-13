import { Release as Runic } from 'client/runic';

export interface search {
  // fields
}
export interface SearchResponse {
  Search: string;
  Total: number;
  Count: number;
}

export interface RunicSearchResponse extends SearchResponse {
  Releases: Runic[];
}
