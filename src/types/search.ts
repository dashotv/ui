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
  Type: string;
  Date: string;
}
