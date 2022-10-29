import * as React from 'react';
import { Button, ButtonGroup } from '@mui/material';

export default function Seasons(props) {
  const [season, setSeason] = React.useState(props.current);
  console.log('season=', season);
  function clickSeason(ev) {
    const id = ev.currentTarget.id;
    console.log(`clickSeason: ${id}`);
    setSeason(id);
    props.changeSeason(id);
  }
  return (
    <div className="seasons">
      <ButtonGroup>
        {props.seasons.map(s => (
          <Button
            variant={season === s ? 'contained' : 'outlined'}
            key={s}
            id={s}
            onClick={clickSeason}
          >
            {s}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
