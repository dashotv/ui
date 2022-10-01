export interface Path {
  id?: string;
  type?: string;
  remote?: string;
  local?: string;
  extension?: string;
  size?: bigint;
  updated_at?: Date;
}
