import React, { useState } from 'react';
import { RiEditCircleFill } from 'react-icons/ri';

import CancelIcon from '@mui/icons-material/Cancel';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import MovieIcon from '@mui/icons-material/Movie';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { ButtonMap } from 'components/ButtonMap';
import Chrono from 'components/Chrono';
import { Path } from 'types/path';

export default function Paths({ paths }: { paths: Path[] }) {
  const [hidden, setHidden] = useState(true);
  return (
    <Paper elevation={0}>
      {paths &&
        paths.map(({ extension, local, type, updated_at }, i) => {
          if (hidden && extension === 'jpg') return null;
          return <PathsRow key={i} i={i} {...{ extension, local, type, updated_at }} />;
        })}
      <Paper elevation={0} sx={{ width: '100%' }}>
        <Button onClick={() => setHidden(!hidden)}>{hidden ? 'show' : 'hide'} images</Button>
      </Paper>
    </Paper>
    // <div className="files">
    //   <table
    //     className="vertical-table"
    //     // size="small"
    //     aria-label="a dense table"
    //   >
    //     <thead>
    //       <tr>
    //         <td className="number"></td>
    //         <td>File</td>
    //         <td className="date" align="right">
    //           Updated
    //         </td>
    //         <td className="actions" align="right">
    //           Actions
    //         </td>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {paths &&
    //         paths.map(({ extension, local, type, updated_at }, i) => (
    //           <PathsRow key={i} i={i} {...{ extension, local, type, updated_at }} />
    //         ))}
    //     </tbody>
    //   </table>
    // </div>
  );
}

function PathsRow({ i, extension, local, type, updated_at }: { i: number } & Path) {
  const [t, dir, name] = local ? local.split('/') : ['', '', ''];
  const buttons = [
    {
      icon: (
        <IconButton size="small">
          <SvgIcon component={RiEditCircleFill} inheritViewBox fontSize="small" color="primary" />
        </IconButton>
      ),
      click: () => console.log('edit'),
      title: 'edit',
    },
    {
      icon: <RemoveCircleIcon fontSize="small" color="warning" />,
      click: () => console.log('delete'),
      title: 'delete',
    },
    {
      icon: <CancelIcon fontSize="small" color="error" />,
      click: () => console.log('delete forever'),
      title: 'delete forever',
    },
  ];
  return (
    <Paper elevation={1} sx={{ mb: 1, p: 1 }}>
      <Stack
        key={i}
        direction={{ xs: 'column', md: 'row' }}
        spacing={1}
        alignItems="center"
        sx={{ justifyContent: 'space-between' }}
      >
        <Stack sx={{ width: '100%' }} direction="row" spacing={1} alignItems="center">
          <IconButton size="small">
            {extension === 'jpg' && <ImageIcon color="primary" />}
            {type === 'video' && <MovieIcon color="primary" />}
            {type === 'subtitle' && <ClosedCaptionIcon color="primary" />}
          </IconButton>
          <Typography variant="h6" noWrap color="primary">
            {local}.{extension}
          </Typography>
        </Stack>
        <Stack sx={{ width: '100%', justifyContent: 'end' }} direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle2" noWrap color="gray">
            <Chrono fromNow>{updated_at?.toString()}</Chrono>
          </Typography>
          <ButtonMap buttons={buttons} />
        </Stack>
      </Stack>
    </Paper>
    //     <tr key={i}>
    //       <th scope="row">
    //         {extension === 'jpg' && <ImageIcon />}
    //         {type === 'video' && <MovieIcon />}
    //         {type === 'subtitle' && <ClosedCaptionIcon />}
    //       </th>
    //       <td>
    //         {local}.{extension}
    //       </td>
    //       <td align="right">
    //         <Chrono fromNow>{updated_at?.toString()}</Chrono>
    //       </td>
    //
    //       <td align="right">
    //         <IconButton size="small">
    //           <EditIcon />
    //         </IconButton>
    //         <IconButton size="small">
    //           <DeleteIcon />
    //         </IconButton>
    //         <IconButton size="small">
    //           <DeleteForeverIcon />
    //         </IconButton>
    //       </td>
    //     </tr>
  );
}
