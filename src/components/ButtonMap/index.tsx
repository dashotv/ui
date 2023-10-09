import * as React from 'react';

import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';

export default function ButtonMap(props) {
  const { size, buttons } = props;
  return (
    <div className="buttonMap">
      <ButtonGroup>
        {buttons &&
          buttons.map((button, index) => (
            <IconButton
              key={index}
              size={size}
              onClick={ev => {
                button.click && button.click(ev, props.args);
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
