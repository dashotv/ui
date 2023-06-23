import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';

import { useReleases } from '../../components/Downloads/useReleases';
import LoadingIndicator from '../../components/Loading';
import MediumDownload from '../../components/MediumLarge/MediumDownload';
import { useDownloadMediumQuery, useDownloadQuery } from '../../query/downloads';

export default function DownloadsShowPage(props) {
  let { id } = useParams();
  const download = useDownloadQuery(id);
  const episodes = useDownloadMediumQuery(id);
  const { torrents, nzbs, nzbStatus } = useReleases();

  const getTorrent = useCallback(() => {
    if (!torrents || !download.data) {
      return;
    }
    return torrents.get(download.data.thash);
  }, [torrents, download.data]);

  const torchSelector = useCallback(release => {
    if (!release) {
      return;
    }
    // console.log('torch:', release);
    // setDownload(prevState => {
    //   if (!prevState) {
    //     return prevState;
    //   }
    //   prevState['status'] = 'loading';
    //   prevState['release_id'] = release;
    //   prevState['url'] = '';
    //   console.log('prevState:', prevState);
    //   return prevState;
    // });
  }, []);
  const nzbSelector = useCallback(release => {
    console.log('nzb:', release);
  }, []);

  return (
    <>
      <Helmet>
        <title>Series{download.data ? ` - ${download.data.medium.display}` : ''}</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container maxWidth="xl">
        {download.isFetching && <LoadingIndicator />}
        {download.data && (
          <MediumDownload
            id={id}
            type={download.data.medium.type}
            download={download.data}
            files={download.data.download_files}
            episodes={episodes.data}
            torrent={getTorrent()}
            torrents={torrents}
            nzbs={nzbs}
            nzbStatus={nzbStatus}
            torchSelector={torchSelector}
            nzbSelector={nzbSelector}
          />
        )}
      </Container>
    </>
  );
}
