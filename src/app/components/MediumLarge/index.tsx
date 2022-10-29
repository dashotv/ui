import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Moment from 'react-moment';

import TabPanel from '../TabPanel';
import Buttons from './Buttons';
import Seasons from './Seasons';
import Episodes from './Episodes';
import Details from './Details';
import ImageSmall from './ImageSmall';
import Files from './Files';

import './large.scss';

export default function MediumLarge(props) {
  const [value, setValue] = useState(0);
  const [episodesIndex, setEpisodesIndex] = useState(0);
  const [filesIndex, setFilesIndex] = useState(1);
  const [downloadsIndex, setDownloadsIndex] = useState(2);
  const [detailsIndex, setDetailsIndex] = useState(3);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="medium large">
      <div className="main">
        <div className="menu">
          <ImageSmall class="cover-sm" alt="cover" src={props.data.cover} />
          <ImageSmall
            class="background-sm"
            alt="background"
            src={props.data.background}
          />
        </div>
        <div className="titlebar">
          <div className="title">
            <span>{props.data.title}</span>
            <Moment format="YYYY-MM-DD" add={{ days: 1 }}>
              {props.data.release_date}
            </Moment>
          </div>
          <Buttons
            id={props.data.id}
            favorite={props.data.favorite}
            broken={props.data.broken}
            active={props.data.active}
            change={props.change}
          />
        </div>
        <Box maxWidth="xl">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Episodes" id={`simple-tabs-${episodesIndex}`} />
              <Tab label="Files" id={`simple-tabs-${filesIndex}`} />
              <Tab label="Downloads" id={`simple-tabs-${downloadsIndex}`} />
              <Tab label="Details" id={`simple-tabs-${detailsIndex}`} />
            </Tabs>
          </Box>
        </Box>
        <TabPanel index={episodesIndex} value={value}>
          <Seasons
            current={props.currentSeason}
            seasons={props.seasons}
            changeSeason={props.changeSeason}
          />
          <Episodes
            episodes={props.episodes}
            changeEpisode={props.changeEpisode}
          />
        </TabPanel>
        <TabPanel index={filesIndex} value={value}>
          <Files paths={props.paths} />
        </TabPanel>
        <TabPanel index={downloadsIndex} value={value}>
          <div>downloads</div>
        </TabPanel>
        <TabPanel index={detailsIndex} value={value}>
          <Details data={props.data} />
        </TabPanel>
      </div>
    </div>
  );
}
