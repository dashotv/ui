import * as React from 'react';
import { Button, ButtonGroup } from '@mui/material';

export default function Seasons(props) {
  function clickSeason(ev) {
    const id = Number(ev.currentTarget.id);
    console.log(`clickSeason: ${id}`);
    if (props.current !== id) {
      props.changeSeason(id);
    }
  }
  return (
    <div className="seasons">
      <ButtonGroup>
        {props.seasons.map(s => (
          <Button variant={props.current === s ? 'contained' : 'outlined'} key={s} id={s} onClick={clickSeason}>
            {s}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
