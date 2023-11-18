import { Control } from 'react-hook-form';

import { SxProps } from '@mui/system';

export interface InputProps {
  name: string;
  label?: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  sx?: SxProps;
}

interface Option {
  value: string | number;
  label: string;
}
