import { Control } from 'react-hook-form';

export interface InputProps {
  name: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

interface Option {
  value: string | number;
  label: string;
}
