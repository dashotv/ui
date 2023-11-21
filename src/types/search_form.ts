export interface SearchForm {
  text: string;
  year: string;
  season: number | string;
  episode: number | string;
  group: string;
  author: string;
  resolution: number | string;
  source: string;
  type: string;
  exact: boolean;
  verified: boolean;
  uncensored: boolean;
  bluray: boolean;
}
