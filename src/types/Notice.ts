import { VariantType } from 'notistack';

export interface Notice {
  event: string;
  time: string;
  class: string;
  level: VariantType;
  message: string;
}
