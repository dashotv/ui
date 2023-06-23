import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';

import LoadingIndicator from 'components/Loading';
import MediumDownload from 'components/MediumLarge/MediumDownload';
import { useReleases } from 'hooks/useReleases';
import { useDownloadMediumQuery, useDownloadMutation, useDownloadQuery } from 'query/downloads';

export default function DownloadsShowPage(props) {
  let { id } = useParams();
  const download = useDownloadQuery(id);
  const episodes = useDownloadMediumQuery(id);
  const { torrents, nzbs, nzbStatus } = useReleases();
  const downloadUpdate = useDownloadMutation(id);

  const getTorrent = useCallback(() => {
    if (!torrents || !download.data) {
      return;
    }
    return torrents.get(download.data.thash);
  }, [torrents, download.data]);

  const torchSelector = useCallback(
    release => {
      if (!release || !download.data) {
        return;
      }

      let n = download.data;
      n['status'] = 'loading';
      n['release_id'] = release;
      n['url'] = '';
      downloadUpdate.mutate(n);
    },
    [download?.data, downloadUpdate],
  );

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
