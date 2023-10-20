import { Fragment, useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Link } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';

import TheatersIcon from '@mui/icons-material/Theaters';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import TvIcon from '@mui/icons-material/Tv';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useSearchQuery, useTmdbSearchQuery, useTvdbSearchQuery } from 'query/search';
import { Medium } from 'types/medium';
import { TmdbResult } from 'types/tmdb';
import { TvdbResult } from 'types/tvdb';

export default function SuperSearch() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [tab, setTab] = useState(0);
  const debouncedValue = useDebounce<string>(value, 400);
  const [options, setOptions] = useState<Medium[]>([]);
  const [tvdbOptions, setTvdbOptions] = useState<TvdbResult[]>([]);
  const [tmdbOptions, setTmdbOptions] = useState<TmdbResult[]>([]);
  const search = useSearchQuery(debouncedValue);
  const tvdb = useTvdbSearchQuery(debouncedValue);
  const tmdb = useTmdbSearchQuery(debouncedValue);

  useHotkeys('mod+k', () => setOpen(true), [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const icon = option => {
    switch (option.type) {
      case 'series':
        return <TvIcon fontSize="small" />;
      case 'movie':
        return <TheatersIcon fontSize="small" />;
    }
    switch (option.media_type) {
      case 'series':
      case 'tv':
        return <TvIcon fontSize="small" />;
      case 'movie':
        return <TheatersIcon fontSize="small" />;
    }
    return null;
  };

  const select = useCallback(() => {
    setValue('');
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!search.data) {
      setOptions([]);
      return;
    }

    setOptions(search.data);
  }, [search.data]);

  useEffect(() => {
    if (!tvdb.data) {
      setOptions([]);
      return;
    }

    setTvdbOptions(tvdb.data);
  }, [tvdb.data]);

  useEffect(() => {
    if (!tmdb.data) {
      setOptions([]);
      return;
    }

    setTmdbOptions(tmdb.data);
  }, [tmdb.data]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <TravelExploreIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose} fullWidth={true}>
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
            InputProps={{
              endAdornment: (
                <Fragment>{search.isFetching ? <CircularProgress color="inherit" size={20} /> : null}</Fragment>
              ),
            }}
          />
        </DialogTitle>
        <DialogContent sx={{ height: '300px' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={<TabLabel name="Dasho.TV" count={options.length} />} {...a11yProps(0)} aria-selected="true" />
              <Tab label={<TabLabel name="TVDB" count={tvdbOptions.length} />} {...a11yProps(1)} />
              <Tab label={<TabLabel name="TMDB" count={tmdbOptions.length} />} {...a11yProps(2)} />
            </Tabs>
          </Box>
          <Box sx={{ width: '100%' }} component="span">
            <CustomTabPanel value={tab} index={0}>
              {options.map((option: Medium) => (
                <Link
                  key={option.id}
                  to={`/${option.type === 'movie' ? 'movies' : option.type}/${option.id}`}
                  onClick={select}
                >
                  <Stack className="searchItem" direction="row" spacing={2}>
                    {icon(option)}
                    <span>{option.name}</span>
                  </Stack>
                </Link>
              ))}
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={1}>
              {tvdbOptions.map((option: TvdbResult) => (
                <Stack key={option.id} className="searchItem" direction="row" spacing={2}>
                  {icon(option)}
                  <span>
                    {option.name} {option.first_air_time && `(${option.first_air_time})`}
                  </span>
                </Stack>
              ))}
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={2}>
              {tmdbOptions.map((option: TmdbResult) => (
                <Stack key={option.id} className="searchItem" direction="row" spacing={2}>
                  {icon(option)}
                  <span>
                    {option.name || option.title} {option.release_date && `(${option.release_date})`}
                  </span>
                </Stack>
              ))}
            </CustomTabPanel>
          </Box>
        </DialogContent>
        <DialogActions>{/* <Button onClick={handleClose}>Add</Button> */}</DialogActions>
      </Dialog>
    </>
  );
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabLabel({ name, count }) {
  return (
    <div>
      <span>{name}</span>
      <Chip sx={{ ml: 2 }} size="small" label={count} />
    </div>
  );
}
