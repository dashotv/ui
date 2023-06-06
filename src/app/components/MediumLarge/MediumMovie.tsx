import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import TabPanel from '../TabPanel';
import Details from './Details';
import Files from './Files';
import { Banner } from '../Banner';

import './large.scss';

export default function MediumMovie(props) {
  const [value, setValue] = useState(0);
  const [filesIndex] = useState(0);
  const [downloadsIndex] = useState(1);
  const [detailsIndex] = useState(2);

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
      <div className="main">
        <Box maxWidth="xl">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Files" id={`simple-tabs-${filesIndex}`} />
              <Tab label="Downloads" id={`simple-tabs-${downloadsIndex}`} />
              <Tab label="Details" id={`simple-tabs-${detailsIndex}`} />
            </Tabs>
          </Box>
        </Box>
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
