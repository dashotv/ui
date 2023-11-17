export interface SearchAllResponse {
  Media: SearchResponse;
  Tvdb: SearchResponse;
  Tmdb: SearchResponse;
}

export interface SearchResponse {
  Results: SearchResult[];
  Error: string;
}

export interface SearchResult {
  ID: string;
  Title: string;
  Description: string;
  Type: string;
  Kind: string;
  Image: string;
  Date: string;
  Source: string;
}
