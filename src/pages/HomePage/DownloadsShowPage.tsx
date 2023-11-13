import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';

import LoadingIndicator from 'components/Loading';
import Download from 'components/Media/Download';
import { useReleases } from 'hooks/useReleases';
import { useDownloadMediumQuery, useDownloadMutation, useDownloadQuery } from 'query/downloads';

export default function DownloadsShowPage() {
  const { id } = useParams();
  const download = useDownloadQuery(id);
  const episodes = useDownloadMediumQuery(id);
  const { torrents } = useReleases();
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

      const n = download.data;
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
      <Container sx={{ pt: '5px', pb: '5px' }} style={{ overflow: 'auto' }} maxWidth="xl">
        {download.isFetching && <LoadingIndicator />}
        {download.data && (
          <Download
            id={id || 'unknown'}
            type={download.data.medium.type}
            download={download.data}
            files={download.data.download_files}
            episodes={episodes.data}
            torrent={getTorrent()}
            torchSelector={torchSelector}
            nzbSelector={nzbSelector}
          />
        )}
      </Container>
    </>
  );
}
