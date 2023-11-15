import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

export interface ButtonMapButton {
  title: string;
  icon: React.ReactNode;
  click?: (ev: React.MouseEvent<HTMLElement>) => void;
}

export interface ButtonMapProps {
  size?: 'small' | 'medium' | 'large';
  buttons?: ButtonMapButton[];
}

export function ButtonMap({ size = 'medium', buttons }: ButtonMapProps) {
  return (
    <Stack spacing={'2px'} direction="row">
      {buttons &&
        buttons.map(({ click, title, icon }, index) => (
          <IconButton
            key={index}
            sx={{ p: '0px' }}
            size={size}
            onClick={ev => {
              click && click(ev);
            }}
            title={title}
          >
            {icon}
          </IconButton>
        ))}
    </Stack>
  );
}
