import * as React from 'react';

import { Button, ButtonGroup } from '@mui/material';

export default function Seasons({
  current,
  changeSeason,
  seasons,
}: {
  current: number;
  changeSeason: (id: number) => void;
  seasons: number[];
}) {
  function clickSeason(ev) {
    const id = Number(ev.currentTarget.id);
    if (current !== id) {
      changeSeason(id);
    }
  }
  return (
    <div className="seasons">
      <ButtonGroup>
        {seasons.map(s => (
          <Button variant={current === s ? 'contained' : 'outlined'} key={s} id={s.toString()} onClick={clickSeason}>
            {s}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
