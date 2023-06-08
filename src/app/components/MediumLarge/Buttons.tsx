import * as React from 'react';
import { useState } from 'react';
import { ButtonGroup, IconButton } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BuildIcon from '@mui/icons-material/Build';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Buttons(props) {
  const [active, setActive] = useState(props.active);
  const [favorite, setFavorite] = useState(props.favorite);
  const [broken, setBroken] = useState(props.broken);
  return (
    <div className="buttons">
      <ButtonGroup>
        <IconButton size="small">
          <CloudDownloadIcon />
        </IconButton>
        <IconButton size="small">
          <VisibilityOffIcon />
        </IconButton>
        <IconButton size="small">
          <ReplayIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={ev => {
            props.change(props.id, 'favorite', !favorite);
            setFavorite(!favorite);
          }}
        >
          <FavoriteIcon color={favorite ? 'secondary' : 'action'} />
        </IconButton>
        <IconButton
          size="small"
          onClick={ev => {
            props.change(props.id, 'broken', !broken);
            setBroken(!broken);
          }}
        >
          <BuildIcon color={broken ? 'secondary' : 'action'} />
        </IconButton>
        <IconButton
          size="small"
          onClick={ev => {
            props.change(props.id, 'active', !active);
            setActive(!active);
          }}
        >
          <StarIcon color={active ? 'secondary' : 'action'} />
        </IconButton>
        <IconButton size="small" color="error">
          <DeleteIcon />
        </IconButton>
      </ButtonGroup>
    </div>
  );
}
