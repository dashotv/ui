import React, { useState } from 'react';
import { RiEditCircleFill } from 'react-icons/ri';

import CancelIcon from '@mui/icons-material/Cancel';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import ImageIcon from '@mui/icons-material/Image';
import MovieIcon from '@mui/icons-material/Movie';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Box from '@mui/material/Box';
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
  const buttons = [
    {
      icon: <SvgIcon component={RiEditCircleFill} inheritViewBox fontSize="small" color="primary" />,
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
    <Paper elevation={1} sx={{ mb: 1 }}>
      <Stack
        key={i}
        direction={{ xs: 'column', md: 'row' }}
        spacing={1}
        alignItems="center"
        sx={{ justifyContent: 'space-between' }}
      >
        <Stack sx={{ width: '100%', pl: 1 }} direction="row" spacing={1} alignItems="center">
          <Box sx={{ color: 'gray' }}>
            {extension === 'jpg' && <ImageIcon fontSize="small" />}
            {type === 'video' && <MovieIcon fontSize="small" />}
            {type === 'subtitle' && <ClosedCaptionIcon fontSize="small" />}
          </Box>
          <Typography variant="h6" noWrap color="primary">
            {local}.{extension}
          </Typography>
        </Stack>
        <Stack sx={{ width: '100%', justifyContent: 'end', pr: 1 }} direction="row" spacing={1} alignItems="center">
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
