import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { IoSearchCircle } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { SearchAllResponse, SearchResult } from 'client/scry';
import { useDebounce } from 'usehooks-ts';

import CloseIcon from '@mui/icons-material/Close';
import { Paper } from '@mui/material';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/system/useTheme';

import { Cover, CoverRow } from 'components/Common';
import { MediaCover } from 'components/Media';
import { useMovieCreateMutation } from 'components/Movies';
import { useSeriesCreateMutation } from 'components/Series';
import { Kinds } from 'types/constants';

import { useSearchAllQuery } from './query';

export default function SuperSearch() {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [option, setOption] = useState<SearchResult | null>(null);
  const series = useSeriesCreateMutation();
  const movie = useMovieCreateMutation();
  const navigate = useNavigate();

  useHotkeys('mod+k', () => setOpen(true), [open]);
  useHotkeys('mod+/', () => setOpen(true), [open]);

  const showCreate = useCallback((option: SearchResult) => {
    setOption(option);
    setConfirm(true);
  }, []);

  const createSeries = useCallback((option: SearchResult) => {
    series.mutate(option, {
      onSuccess: data => {
        navigate(`/series/${data.result.id}`);
      },
    });
  }, []);

  const createMovie = useCallback((option: SearchResult) => {
    movie.mutate(option, {
      onSuccess: data => {
        navigate(`/movies/${data.result.id}`);
      },
    });
  }, []);

  const create = useCallback((option: SearchResult | null) => {
    setConfirm(false);
    if (!option) {
      setOpen(true);
      return;
    }
    console.log('create: ', option);
    if (option) {
      switch (option.type) {
        case 'series':
          createSeries(option);
          break;
        case 'movie':
          createMovie(option);
          break;
      }
    }
  }, []);

  if (series.isSuccess) {
    console.log('series.isSuccess: ', series.isSuccess, 'series.data: ', series.data);
  }

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <SvgIcon component={IoSearchCircle} inheritViewBox fontSize="large" color="primary" />
      </IconButton>
      {open && <SuperSearchController open={open} setOpen={setOpen} confirm={showCreate} />}
      {confirm && <SuperSearchConfirm open={confirm} confirm={create} option={option} />}
    </>
  );
}

export interface SuperSearchControllerProps {
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
  confirm: (option: SearchResult) => void;
}
export function SuperSearchController({ open, setOpen, confirm }: SuperSearchControllerProps) {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce<string>(value, 400);
  const { data } = useSearchAllQuery(debouncedValue);
  const navigate = useNavigate();

  const select = useCallback((option: SearchResult) => {
    setOpen(false);
    navigate(`/${option.type == 'movie' ? 'movies' : option.type}/${option.id}`);
  }, []);

  return <SuperSearchDialog {...{ open, setOpen, confirm, value, setValue, select, data }} />;
}

export interface SuperSearchDialogProps {
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
  confirm: (option: SearchResult) => void;
  data?: SearchAllResponse;
  select: (option: SearchResult) => void;
  value: string;
  setValue: (value: SetStateAction<string>) => void;
  remote?: boolean;
}

export function SuperSearchDialog({
  open,
  setOpen,
  confirm,
  select,
  value,
  setValue,
  data,
  remote = true,
}: SuperSearchDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  const create = useCallback((option: SearchResult) => {
    setOpen(false);
    confirm(option);
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth fullScreen={fullScreen} maxWidth="md">
      <DialogTitle>
        <TextField
          autoFocus
          id="name"
          placeholder="Search for existing or new media"
          hiddenLabel
          fullWidth
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
          }}
          variant="outlined"
          size="small"
          sx={{ pr: 4 }}
        />
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ height: '600px' }}>
        {data?.media?.error || data?.tvdb?.error || data?.tmdb?.error ? (
          <Alert severity="error">{data?.media?.error || data?.tvdb?.error || data?.tmdb?.error}</Alert>
        ) : null}
        <SuperSearchResults name="Dasho.TV" data={data?.media?.results} select={select} />
        {remote && <SuperSearchResults name="TVDB" type="series" data={data?.tvdb?.results} select={create} />}
        {remote && <SuperSearchResults name="TMDB" type="movie" data={data?.tmdb?.results} select={create} />}
      </DialogContent>
    </Dialog>
  );
}

export interface SuperSearchConfirmProps {
  open: boolean;
  confirm: (option: SearchResult | null) => void;
  option: SearchResult | null;
}

export function SuperSearchConfirm({ open, confirm, option: initial }: SuperSearchConfirmProps) {
  if (!initial) {
    return null;
  }
  const [option, setOption] = useState<SearchResult>(initial);

  const kinds = {
    series: Kinds.Series,
    movie: Kinds.Movie,
  };

  if (!option.kind) {
    if (!option.type) {
      throw new Error('option.type is required');
    }
    setOption({ ...option, kind: kinds[option.type][0].value });
  }

  const handleChange = ev => {
    setOption({ ...option, kind: ev.target.value });
  };

  return (
    <Dialog open={open} onClose={() => confirm(null)} maxWidth="md">
      <DialogTitle>Create {option.type}?</DialogTitle>
      <DialogContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <MediaCover {...{ option }} imageOnly={true} />
          <Stack direction="column" spacing={1}>
            <Typography noWrap variant="h5" color="primary">
              {option.title}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="secondary">
                {option.date}
              </Typography>
              <Typography variant="body2" color="action">
                {option.id}
              </Typography>
            </Stack>
            <Typography variant="body1">{option.description}</Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Select
          sx={{ m: 1, width: '125px' }}
          id="kind"
          name="kind"
          variant="standard"
          size="small"
          value={option.kind}
          onChange={handleChange}
        >
          {option.type &&
            kinds[option.type].map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </Select>
        <Button onClick={() => confirm(null)}>Cancel</Button>
        <Button autoFocus onClick={() => confirm(option)}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// interface SuperSearchAccordionProps {
//   name: string;
//   data?: SearchResult[];
//   select: (option: SearchResult) => void;
//   type?: string;
// }
// const SuperSearchAccordion = ({ name, data, select, type }: SuperSearchAccordionProps) => {
//   const [options, setOptions] = useState<SearchResult[]>([]);
//
//   useEffect(() => {
//     if (!data || data.length === 0) {
//       setOptions([]);
//       return;
//     }
//
//     setOptions(data);
//   }, [data]);
//
//   return (
//     // Accordion matches dialog sx={{ backgroundColor: '#343434' }}
//     // sx={{ backgroundColor: '#242424' }}
//     <Accordion defaultExpanded disableGutters expanded={options.length > 0}>
//       <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
//         <Chip sx={{ mr: 2 }} color="primary" size="small" label={options.length} />
//         <Typography variant="button" color="primary">
//           {name}
//         </Typography>
//       </AccordionSummary>
//       <AccordionDetails>
//         {/* <Stack direction="column" spacing={1}>
//           {options.map((option: SearchResult) => (
//             <Link title={option.title} underline="none" color="inherit" onClick={() => select(option)}>
//               <SearchCoverRow option={option} />
//             </Link>
//           ))}
//         </Stack> */}
//
//         <Grid container spacing={1}>
//           {options.map((option: SearchResult) => (
//             <Grid item key={option.id}>
//               {/* <MediaCover {...{ option, type }} /> */}
//               <Link title={option.title} underline="none" color="inherit" onClick={() => select(option)}>
//                 <SearchCover option={option} />
//               </Link>
//             </Grid>
//           ))}
//         </Grid>
//       </AccordionDetails>
//     </Accordion>
//   );
// };

interface SuperSearchResultsProps {
  name: string;
  data?: SearchResult[];
  select: (option: SearchResult) => void;
  type?: string;
}
export const SuperSearchResults = ({ name, data, select }: SuperSearchResultsProps) => {
  const [options, setOptions] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!data || data.length === 0) {
      setOptions([]);
      return;
    }

    setOptions(data);
  }, [data]);

  return (
    <Paper elevation={1} sx={{ p: 0.5 }}>
      <Stack direction="row" spacing={1} sx={{ p: 1 }}>
        <Chip sx={{ mr: 2 }} color="primary" size="small" label={options.length} />
        <Typography variant="button" color="primary">
          {name}
        </Typography>
      </Stack>

      <Grid container spacing={1} sx={{ p: 1 }}>
        {options.map((option: SearchResult) => (
          <Grid item key={option.id}>
            {/* <MediaCover {...{ option, type }} /> */}
            <Link title={option.title} underline="none" color="inherit" onClick={() => select(option)}>
              <SearchCover option={option} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export const SearchCover = ({ option }: { option: SearchResult }) => {
  return (
    <Cover
      title={option.title || 'unknown'}
      subtitle={option.date}
      description={option.description || 'no description'}
      kind={option.kind || 'tv'}
      image={option.image}
      // icons={{ completed: option.completed }} // TODO: add completed icon
      actions={false}
    />
  );
};

export const SearchCoverRow = ({ option }: { option: SearchResult }) => {
  return (
    <CoverRow
      title={option.title || 'unknown'}
      subtitle={option.date}
      kind={option.type || 'tv'}
      source={option.source}
      source_id={option.id}
      image={option.image}
    />
  );
};
