import React, { useCallback } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WavesIcon from '@mui/icons-material/Waves';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ButtonMap from '../ButtonMap';

export function ReleasesRow(props) {
  const resolution = useCallback(r => {
    if (r) {
      return <Chip label={r} size="small" color="primary" />;
    }
    return;
  }, []);

  const group = useCallback(() => {
    if (props.group) {
      return <Typography variant="overline">{props.group}</Typography>;
    }
    if (props.author) {
      return <Typography variant="overline">[{props.author}]</Typography>;
    }
    return '';
  }, [props.author, props.group]);

  return (
    <tr>
      <td>
        {props.verified ? (
          <CheckCircleIcon color="primary" fontSize="small" />
        ) : (
          <CheckCircleOutlineIcon fontSize="small" />
        )}
      </td>
      <td>{props.nzb ? <ArticleIcon fontSize="small" /> : <WavesIcon fontSize="small" />}</td>
      <td>
        <Typography variant="overline">
          {props.source}:{props.type}
        </Typography>
      </td>
      <td>
        <Stack spacing={1} direction="row">
          <Link to={props.id} title={props.raw}>
            <Typography variant="subtitle1">{props.display}</Typography>
          </Link>
          {resolution(props.resolution)}
          {group()}
        </Stack>
      </td>
      <td align="right">
        <Moment fromNow>{props.published}</Moment>
      </td>
      <td align="right">
        <ButtonMap buttons={props.actions} args={[props.id, props.view, props.download]} />
      </td>
    </tr>
  );
}
