import * as React from 'react';
import { useParams } from 'react-router-dom';

import { DownloadWrapper } from '../Downloads';
import Files from './Files';
import { MediumTabs } from './MediumTabs';
import './large.scss';

export default function MediumDownload(props) {
  // @ts-ignore
  let { id } = useParams();

  const tabsMap = {
    Files: <Files files={props.files} torrent={props.torrent} />,
  };

  return (
    <div className="medium large">
      <DownloadWrapper id={id} />
      <MediumTabs data={tabsMap} />
    </div>
  );
}
