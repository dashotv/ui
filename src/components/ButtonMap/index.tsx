import * as React from 'react';

import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';

export default function ButtonMap({
  size,
  buttons,
  args,
}: {
  size: 'small' | 'medium' | 'large';
  buttons?: any[];
  args?: any;
}) {
  return (
    <div className="buttonMap">
      <ButtonGroup>
        {buttons &&
          buttons.map((button, index) => (
            <IconButton
              key={index}
              size={size}
              onClick={ev => {
                button.click && button.click(ev, args);
              }}
              title={button.title}
            >
              {button.icon}
            </IconButton>
          ))}
      </ButtonGroup>
    </div>
  );
}
