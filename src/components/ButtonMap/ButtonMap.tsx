import * as React from 'react';

import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

export interface ButtonMapButton {
  title: string;
  icon: any;
  click?: (ev: any, args: any) => void;
}

export interface ButtonMapProps {
  size?: 'small' | 'medium' | 'large';
  buttons?: ButtonMapButton[];
  args?: any;
}

export function ButtonMap({ size, buttons, args }: ButtonMapProps) {
  return (
    <Stack spacing={'2px'} direction="row">
      {buttons &&
        buttons.map(({ click, title, icon }, index) => (
          <IconButton
            key={index}
            sx={{ p: '0px' }}
            size={size}
            onClick={ev => {
              click && click(ev, args);
            }}
            title={title}
          >
            {icon}
          </IconButton>
        ))}
    </Stack>
  );
}
