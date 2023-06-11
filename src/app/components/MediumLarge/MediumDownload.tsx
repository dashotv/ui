import { Banner } from './Banner';
import Files from './Files';
import { MediumTabs } from './MediumTabs';
import './large.scss';
import * as React from 'react';

export default function MediumDownload(props) {
  const tabsMap = {
    Files: <Files files={props.files} torrent={props.torrent} />,
  };

  return (
    <div className="medium large">
      <Banner
        cover={props.download.medium.cover}
        background={props.download.medium.background}
        title={`[${props.torrent && Number(props.torrent?.Progress).toFixed(2)}%] ${props.download.medium.title}`}
        subtitle={props.download.medium.display}
        release_date={props.download.medium.release_date}
        id={props.download.id}
        favorite={props.download.medium.favorite}
        broken={props.download.medium.broken}
        active={props.download.medium.active}
        change={props.change}
      />
      <MediumTabs data={tabsMap} />
    </div>
  );
}
