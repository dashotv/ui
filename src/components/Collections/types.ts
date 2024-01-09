export interface CollectionsResponse {
  count: number;
  error: string;
  results: Collection[];
}

export interface Collection {
  id: string;
  name: string;
  library: string;
  rating_key: string;
  media: CollectionMedia[];
  synced_at: string;
  created_at: string;
  updated_at: string;
}
export interface CollectionMedia {
  rating_key: string;
  title: string;
}
