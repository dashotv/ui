import axios from 'axios';
import SearchBar from 'material-ui-search-bar';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TheatersIcon from '@mui/icons-material/Theaters';
import TvIcon from '@mui/icons-material/Tv';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import './Search.css';

interface Medium {
  id: string;
  link: string;
  name: string;
  type: string;
  release_date: string;
}

export default function Search(props) {
  const [search, setSearch] = useState<null | String>(null);
  const [results, setResults] = useState<Medium[]>([]);
  const [text, setText] = useState('');
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = value => {
    setSearch(value);
  };

  const onClose = (value: string) => {
    setOpen(false);
    console.log('value: ', value);
    setSelectedValue(value);
    navigate('/' + value);
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  useEffect(() => {
    const getResults = async () => {
      try {
        if (search === null) {
          return;
        }
        const response = await axios.get(`/api/scry/media/?name=*${search}*&limit=10&type=series movie`);
        console.log(response.data);
        setResults(response.data.Media);
        setOpen(true);
      } catch (err) {
        // @ts-ignore
        // setError(err.message);
        console.log(err.message);
      }
    };
    getResults();
  }, [search]);

  return (
    <>
      <SearchBar value={text} onChange={newValue => setText(newValue)} onRequestSearch={() => handleSearch(text)} />

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Results</DialogTitle>
        <List className="searchResults" sx={{ pt: 0 }}>
          {results &&
            results.map(({ id, link, name, type, release_date }) => (
              <ListItem button onClick={() => handleListItemClick(link)} key={id}>
                <ListItemAvatar>
                  <Avatar>
                    {type === 'series' && <TvIcon />}
                    {type === 'movie' && <TheatersIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} secondary={release_date} />
              </ListItem>
            ))}
        </List>
      </Dialog>
    </>
  );
}