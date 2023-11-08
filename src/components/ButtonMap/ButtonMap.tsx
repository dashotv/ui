import * as React from 'react';

import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';

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
    <div className="buttonMap">
      <ButtonGroup>
        {buttons &&
          buttons.map(({ click, title, icon }, index) => (
            <IconButton
              key={index}
              size={size}
              onClick={ev => {
                click && click(ev, args);
              }}
              title={title}
            >
              {icon}
            </IconButton>
          ))}
      </ButtonGroup>
    </div>
  );
}
