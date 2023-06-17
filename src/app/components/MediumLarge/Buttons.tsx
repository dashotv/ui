import * as React from 'react';

import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';

export function ButtonMap(props) {
  const { size, buttons } = props;
  return (
    <div className="buttons">
      <ButtonGroup>
        {buttons &&
          buttons.map((button, index) => (
            <IconButton key={index} size={size} onClick={button.click}>
              {button.icon}
            </IconButton>
          ))}
      </ButtonGroup>
    </div>
  );
}
