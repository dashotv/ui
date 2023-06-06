import * as React from 'react';
import { Banner } from '../Banner';
import './large.scss';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../TabPanel';
import Seasons from './Seasons';
import Episodes from './Episodes';
import Files from './Files';
import Details from './Details';
import { useState } from 'react';

export default function MediumLarge(props) {
  const [value, setValue] = useState(0);
  const [episodesIndex] = useState(0);
  const [filesIndex] = useState(1);
  const [downloadsIndex] = useState(2);
  const [detailsIndex] = useState(3);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="medium large">
      <Banner
        cover={props.data.cover}
        background={props.data.background}
        title={props.data.title}
        release_date={props.data.release_date}
        id={props.data.id}
        favorite={props.data.favorite}
        broken={props.data.broken}
        active={props.data.active}
        change={props.change}
      />

      <div className="tabs">
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
