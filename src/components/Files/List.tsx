import React from 'react';
import { RiEditCircleFill } from 'react-icons/ri';

import { File } from 'client/tower';
import { clickHandler } from 'utils/handler';

import CancelIcon from '@mui/icons-material/Cancel';
import { Theme } from '@mui/material';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { ButtonMap, ButtonMapButton, Chrono, Megabytes, Resolution, Row } from '@dashotv/components';

import { PathIcon } from 'components/Paths';

import { FilesEditDialog } from './Dialog';
import { useMutationFile } from './query';

export const FilesList = ({ data }: { data?: File[] }) => {
  const [editing, setEditing] = React.useState<File | null>(null);
  const update = useMutationFile();
  const handleClose = (data: File | null) => {
    if (data) {
      update.mutate(data);
    }
    setEditing(null);
  };
  return (
    <>
      {data?.map((file: File) => <FileRow key={file.id} file={file} setEditing={setEditing} />)}
      {editing && <FilesEditDialog open={editing !== null} file={editing} handleClose={handleClose} />}
    </>
  );
};

const FileRow = ({ file, setEditing }: { file: File; setEditing: (f: File) => void }) => {
  const { name, extension, type, resolution, modified_at, path, size, exists } = file;
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'), { noSsr: true });

  const buttons: ButtonMapButton[] = [
    {
      Icon: SvgIcon,
      Component: RiEditCircleFill,
      color: 'primary',
      click: clickHandler(() => setEditing(file)),
      title: 'edit',
    },
    {
      Icon: CancelIcon,
      color: 'error',
      click: clickHandler(() => {}), //clickHandler(() => id && removePath(id, medium_id)),
      title: 'delete forever',
    },
  ];

  return (
    <Row>
      <Stack
        width="100%"
        minWidth="0"
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 0, md: 1 }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack minWidth="0" width="100%" direction="row" spacing={1} alignItems="center">
          {matches && <PathIcon {...{ extension, type, old: !exists }} />}
          <Typography title={path} fontWeight="bolder" noWrap color="primary">
            {name ? `${name}.${extension}` : path}
          </Typography>
          {matches && <Resolution resolution={resolution} />}
        </Stack>
        <Stack
          minWidth={{ xs: '100%', md: '250px' }}
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="end"
        >
          {!matches && <PathIcon {...{ extension, type }} />}
          {!matches && <Resolution resolution={resolution} />}
          {size ? <Megabytes value={size} ord="bytes" /> : null}
          <Typography variant="subtitle2" noWrap color="gray">
            {modified_at ? <Chrono fromNow>{new Date(modified_at * 1000).toString()}</Chrono> : null}
          </Typography>
          <ButtonMap buttons={buttons} size="small" />
        </Stack>
      </Stack>
    </Row>
  );
};
