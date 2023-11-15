import { useState } from 'react';
import * as React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import TabPanel from 'components/TabPanel';

export interface MediumTabMap {
  [key: string]: JSX.Element;
}
export function MediumTabs({ data }: { data: MediumTabMap }) {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="tabs">
      <Box maxWidth="xl">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {Object.keys(data).map((k, i) => {
              return <Tab key={i} label={k} id={`simple-tabs-${i}`} />;
            })}
          </Tabs>
        </Box>
      </Box>
      {Object.keys(data).map((k, i) => {
        return (
          <TabPanel key={i} index={i} value={value}>
            {data[k]}
          </TabPanel>
        );
      })}
    </div>
  );
}
