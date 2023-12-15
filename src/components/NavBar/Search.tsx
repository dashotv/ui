import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { IoSearchCircle } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { useDebounce } from 'usehooks-ts';

import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
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

import { MediaCover, Option, useSeriesCreateMutation } from 'components/Media';
import { useMovieCreateMutation } from 'components/Movies';
import { useSearchAllQuery } from 'query/search';
import { SearchAllResponse } from 'types/search';

export default function SuperSearch() {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [option, setOption] = useState<Option | null>(null);
  const series = useSeriesCreateMutation();
  const movie = useMovieCreateMutation();
  const navigate = useNavigate();

  useHotkeys('mod+k', () => setOpen(true), [open]);

  const showCreate = useCallback((option: Option) => {
    setOption(option);
    setConfirm(true);
  }, []);

  const createSeries = useCallback((option: Option) => {
    series.mutate(option, {
      onSuccess: data => {
        if (data.error) {
          console.error('error: ', data.error);
          return;
        }
        navigate(`/series/${data.series.id}`);
      },
    });
  }, []);

  const createMovie = useCallback((option: Option) => {
    movie.mutate(option, {
      onSuccess: data => {
        if (data.error) {
          console.error('error: ', data.error);
          return;
        }
        navigate(`/movies/${data.movie.id}`);
      },
    });
  }, []);

  const create = useCallback((option: Option | null) => {
    setConfirm(false);
    if (!option) {
      setOpen(true);
      return;
    }
    console.log('create: ', option);
    if (option) {
      switch (option.Type) {
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
  confirm: (option: Option) => void;
}
export function SuperSearchController({ open, setOpen, confirm }: SuperSearchControllerProps) {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce<string>(value, 400);
  const { data } = useSearchAllQuery(debouncedValue);
  const navigate = useNavigate();

  const select = useCallback((option: Option) => {
    setValue('');
    setOpen(false);
    navigate(`/${option.Type == 'movie' ? 'movies' : option.Type}/${option.ID}`);
  }, []);

  return <SuperSearchDialog {...{ open, setOpen, confirm, value, setValue, select, data }} />;
}

export interface SuperSearchDialogProps {
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
  confirm: (option: Option) => void;
  data?: SearchAllResponse;
  select: (option: Option) => void;
  value: string;
  setValue: (value: SetStateAction<string>) => void;
}

export function SuperSearchDialog({ open, setOpen, confirm, select, value, setValue, data }: SuperSearchDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  const create = useCallback((option: Option) => {
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
      <DialogContent sx={{ height: '430px' }}>
        {data?.Media?.Error || data?.Tvdb?.Error || data?.Tmdb?.Error ? (
          <Alert severity="error">{data?.Media?.Error || data?.Tvdb?.Error || data?.Tmdb?.Error}</Alert>
        ) : null}
        <SuperSearchAccordion name="Dasho.TV" data={data && data.Media.Results} select={select} />
        <SuperSearchAccordion name="TVDB" type="series" data={data && data.Tvdb.Results} select={create} />
        <SuperSearchAccordion name="TMDB" type="movie" data={data && data.Tmdb.Results} select={create} />
      </DialogContent>
    </Dialog>
  );
}

export interface SuperSearchConfirmProps {
  open: boolean;
  confirm: (option: Option | null) => void;
  option: Option | null;
}

export function SuperSearchConfirm({ open, confirm, option: initial }: SuperSearchConfirmProps) {
  if (!initial) {
    return null;
  }
  const [option, setOption] = useState<Option>(initial);

  const kinds = {
    series: [
      { label: 'TV', value: 'tv' },
      { label: 'Anime', value: 'anime' },
      { label: 'Ecchi', value: 'ecchi' },
      { label: 'News', value: 'news' },
    ],
    movie: [
      { label: 'Movies', value: 'movies' },
      { label: 'Movies 4K', value: 'movies4k' },
      { label: 'Movies 3D', value: 'movies3d' },
      { label: 'Kids', value: 'kids' },
      { label: 'Movies 4H', value: 'movies4h' },
    ],
  };

  if (!option.Kind) {
    setOption({ ...option, Kind: kinds[option.Type][0].value });
  }

  const handleChange = ev => {
    setOption({ ...option, Kind: ev.target.value });
  };

  return (
    <Dialog open={open} onClose={() => confirm(null)} maxWidth="md">
      <DialogTitle>Create {option.Type}?</DialogTitle>
      <DialogContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <MediaCover {...{ option }} imageOnly={true} />
          <Stack direction="column" spacing={1}>
            <Typography noWrap variant="h5" color="primary">
              {option.Title}
            </Typography>
            <Typography variant="body2" color="action">
              {option.Date}
            </Typography>
            <Typography variant="body1">{option.Description}</Typography>
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
          value={option.Kind}
          onChange={handleChange}
        >
          {kinds[option.Type].map(option => (
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

interface SuperSearchAccordionProps {
  name: string;
  data: Option[] | undefined;
  select: (option: Option) => void;
  type?: string;
}
const SuperSearchAccordion = ({ name, data, select, type }: SuperSearchAccordionProps) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (!data || data.length === 0) {
      setOptions([]);
      return;
    }

    setOptions(data);
  }, [data]);

  return (
    // Accordion matches dialog sx={{ backgroundColor: '#343434' }}
    // sx={{ backgroundColor: '#242424' }}
    <Accordion defaultExpanded disableGutters expanded={options.length > 0}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Chip sx={{ mr: 2 }} color="primary" size="small" label={options.length} />
        <Typography variant="button" color="primary">
          {name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {options.map((option: Option) => (
            <Grid item key={option.ID}>
              <Link underline="none" color="inherit" onClick={() => select(option)}>
                <MediaCover {...{ option, type }} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
