import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpIcon from '@mui/icons-material/Help';
import TheatersIcon from '@mui/icons-material/Theaters';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import TvIcon from '@mui/icons-material/Tv';
import { Link } from '@mui/material';
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
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useMovieCreateMutation } from 'query/movies';
import { Option } from 'query/option';
import { useSearchAllQuery } from 'query/search';
import { useSeriesCreateMutation } from 'query/series';

export default function SuperSearch() {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [option, setOption] = useState<Option | null>(null);
  const series = useSeriesCreateMutation();
  const movie = useMovieCreateMutation();
  const navigate = useNavigate();

  const showCreate = useCallback((option: Option) => {
    setConfirm(true);
    console.log('showCreate: ', option);
    setOption(option);
  }, []);

  const createSeries = useCallback((option: Option) => {
    series.mutate(option, {
      onSuccess: data => {
        if (data.error) {
          console.error('error: ', data.error);
          return;
        }
        console.log('onSuccess: ', data);
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
        console.log('onSuccess: ', data);
        navigate(`/movies/${data.movie.id}`);
      },
    });
  }, []);

  const create = useCallback((option: Option | null) => {
    setConfirm(false);
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
        <TravelExploreIcon fontSize="large" />
      </IconButton>
      <SuperSearchDialog open={open} setOpen={setOpen} confirm={showCreate} />
      <SuperSearchConfirm open={confirm} confirm={create} option={option} />
    </>
  );
}

interface SuperSearchDialogProps {
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
  confirm: (option: Option) => void;
}

function SuperSearchDialog({ open, setOpen, confirm }: SuperSearchDialogProps) {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce<string>(value, 400);
  const { data } = useSearchAllQuery(debouncedValue);
  const navigate = useNavigate();

  useHotkeys('mod+k', () => setOpen(true), [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const select = useCallback((option: Option) => {
    setValue('');
    setOpen(false);
    navigate(`/${option.Type == 'movie' ? 'movies' : option.Type}/${option.ID}`);
  }, []);

  const create = useCallback((option: Option) => {
    setValue('');
    setOpen(false);
    console.log('create: ', option);
    confirm(option);
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
      <DialogTitle>
        <TextField
          autoFocus
          margin="none"
          id="name"
          placeholder="Search for existing or new media"
          fullWidth
          hiddenLabel
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
          }}
          variant="outlined"
        />
      </DialogTitle>
      <DialogContent sx={{ height: '430px' }}>
        {data?.Media?.Error || data?.Tvdb?.Error || data?.Tmdb?.Error ? (
          <Alert severity="error">{data?.Media?.Error || data?.Tvdb?.Error || data?.Tmdb?.Error}</Alert>
        ) : null}
        <SuperSearchAccordion name="Dasho.TV" data={data && data.Media.Results} select={select} link={true} />
        <SuperSearchAccordion name="TVDB" type="series" data={data && data.Tvdb.Results} select={create} link={false} />
        <SuperSearchAccordion name="TMDB" type="movie" data={data && data.Tmdb.Results} select={create} link={false} />
      </DialogContent>
    </Dialog>
  );
}

interface SuperSearchConfirmProps {
  open: boolean;
  confirm: (option: Option | null) => void;
  option: Option | null;
}

function SuperSearchConfirm({ open, confirm, option }: SuperSearchConfirmProps) {
  if (!option) return null;

  return (
    <Dialog open={open} onClose={() => confirm(null)} maxWidth="md">
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>
        Create {option.Type} {option.Title} ({option.Date})?
      </DialogContent>
      <DialogActions>
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
  link: boolean;
}
const SuperSearchAccordion = ({ name, data, select, type, link }: SuperSearchAccordionProps) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (!data || data.length === 0) {
      setOptions([]);
      return;
    }

    setOptions(data);
  }, [data]);

  return (
    <Accordion defaultExpanded disableGutters expanded={options.length > 0}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Chip sx={{ mr: 2 }} color="primary" size="small" label={options.length} />
        <Typography variant="button" color="primary">
          {name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {options.map((option: Option) => (
          <Link key={option.ID} underline="none" color="inherit" onClick={() => select(option)}>
            <Stack className="searchItem" direction="row" spacing={2}>
              <SuperSearchIcon type={type || option.Type} />
              <Typography component="span">{option.Title}</Typography>
              <Typography sx={{ whiteSpace: 'nowrap' }}>{option.Date}</Typography>
            </Stack>
          </Link>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

const SuperSearchIcon = ({ type }: { type: string | undefined }) => {
  switch (type) {
    case 'series':
      return <TvIcon color="primary" fontSize="small" />;
    case 'movie':
      return <TheatersIcon color="primary" fontSize="small" />;
    default:
      return <HelpIcon color="primary" fontSize="small" />;
  }
  return null;
};
