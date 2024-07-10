export interface MetubeIndexResponse {
  result: HistoryResponse;
  total: number;
}
export interface HistoryResponse {
  done: Download[];
  queue: Download[];
}
export interface Download {
  id: string;
  title: string;
  url: string;
  quality: string;
  format: string;
  folder: string;
  custom_name_prefix: string;
  msg: string;
  percent: number;
  speed: number;
  eta: number;
  status: string;
  size: number;
  timestamp: number;
  error: string;
  filename: string;
}
