export interface IndexersResponse {
  results: Indexer[];
  count: number;
}
export interface RunicSourcesResponse {
  results: RunicSource[];
  error: boolean;
}
export interface RunicSourceResponse {
  error: boolean;
  source: RunicSource;
}

export interface Indexer {
  id: string;
  name: string;
  url: string;
  active: boolean;
  categories: Map<string, number[]>;
  processed_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RunicSource {
  Name: string;
  Type: string;
  URL: string;
  Caps: RunicSourceCaps;
}
export interface RunicSourceCaps {
  Server: RunicSourceCapsServer;
  Limits: RunicSourceCapsLimits;
  Searching: RunicSourceCapsSearching;
  Categories: RunicSourceCapsCategories;
}
export interface RunicSourceCapsServer {
  Title: string;
}
export interface RunicSourceCapsLimits {
  Default: string;
  Max: string;
}
export interface RunicSourceCapsSearching {
  Search: RunicSourceCapsSearchingSearch;
  Tvsearch: RunicSourceCapsSearchingSearch;
  Moviesearch: RunicSourceCapsSearchingSearch;
  Musicsearch: RunicSourceCapsSearchingSearch;
  Audiosearch: RunicSourceCapsSearchingSearch;
  Booksearch: RunicSourceCapsSearchingSearch;
}
export interface RunicSourceCapsSearchingSearch {
  Available: string;
  SupportedParams: string[];
  SearchEngine: string;
}
export interface RunicSourceCapsCategories {
  Category: RunicSourceCapsCategoriesCategory[];
}
export interface RunicSourceCapsCategoriesCategory {
  ID: string;
  Name: string;
  Subcat: RunicSourceCapsCategoriesCategorySubcat[];
}
export interface RunicSourceCapsCategoriesCategorySubcat {
  ID: string;
  Name: string;
}
