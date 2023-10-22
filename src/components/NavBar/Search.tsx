import { useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Link } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpIcon from '@mui/icons-material/Help';
import TheatersIcon from '@mui/icons-material/Theaters';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import TvIcon from '@mui/icons-material/Tv';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useSearchAllQuery } from 'query/search';
import { SearchResult } from 'types/search';

export default function SuperSearch() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce<string>(value, 400);
  const { data } = useSearchAllQuery(debouncedValue);

  useHotkeys('mod+k', () => setOpen(true), [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const select = useCallback(() => {
    setValue('');
    setOpen(false);
  }, []);

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <TravelExploreIcon fontSize="large" />
      </IconButton>

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
          <SuperSearchAccordion name="TVDB" type="series" data={data && data.Tvdb.Results} link={false} />
          <SuperSearchAccordion name="TMDB" type="movie" data={data && data.Tmdb.Results} link={false} />
        </DialogContent>
      </Dialog>
    </>
  );
}

interface Option {
  ID: string;
  Title: string;
  Type: string;
  Date: string;
}
interface SuperSearchAccordionProps {
  name: string;
  data: SearchResult[] | undefined;
  select?: () => void;
  type?: string;
  link: boolean;
}
const SuperSearchAccordion = ({ name, data, select, type, link }: SuperSearchAccordionProps) => {
  const [options, setOptions] = useState<Option[]>([]);

  const withLink = (option: Option) => {
    return (
      <Link key={option.ID} to={`/${option.Type === 'movie' ? 'movies' : option.Type}/${option.ID}`} onClick={select}>
        {withItem(option)}
      </Link>
    );
  };
  const withItem = (option: Option) => {
    return (
      <Stack key={option.ID} className="searchItem" direction="row" spacing={2}>
        <SuperSearchIcon type={type || option.Type} />
        <Typography
          sx={{ flexGrow: 1, maxWidth: '100%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
        >
          {option.Title}
        </Typography>
        <Typography sx={{ whiteSpace: 'nowrap' }}>{option.Date}</Typography>
      </Stack>
    );
  };

  useEffect(() => {
    if (!data || data.length === 0) {
      setOptions([]);
      return;
    }

    console.log(name, data);
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
          <>{link ? withLink(option) : withItem(option)}</>
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
