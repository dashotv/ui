import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';

import LoadingIndicator from 'components/Loading';
import Download from 'components/Media/Download';
import { Nzbgeek } from 'components/Nzbgeek/types';
import { useReleases } from 'hooks/useReleases';
import { useDownloadMediumQuery, useDownloadMutation, useDownloadQuery } from 'query/downloads';
import { Release } from 'types/release';
import { Torrent } from 'types/torrents';

export default function DownloadsShowPage() {
  const { id } = useParams();
  if (!id) {
    return <></>;
  }

  const { isFetching: downloadFetching, data: download } = useDownloadQuery(id);
  const { isFetching: mediaFetching, data: media } = useDownloadMediumQuery(id);
  const [torrent, setTorrent] = useState<Torrent | undefined>(undefined);
  const { torrents } = useReleases();
  const downloadUpdate = useDownloadMutation(id);

  useEffect(() => {
    if (!torrents || !download || !download.thash) {
      return;
    }
    const t = torrents.get(download.thash);
    if (t) {
      setTorrent(t);
    }
  }, [torrents, download]);

  const select = useCallback(
    (selected: Release | Nzbgeek) => {
      if (!download) {
        return;
      }
      console.log('select:', selected);
      if ((selected as Release).id) {
        console.log('release:', selected);
        downloadUpdate.mutate({ ...download, status: 'loading', release_id: (selected as Release).id, url: '' });
        return;
      }
      if ((selected as Nzbgeek).link) {
        console.log('nzbgeek:', selected);
        downloadUpdate.mutate({ ...download, status: 'loading', url: (selected as Nzbgeek).link, release_id: '' });
        return;
      }
    },
    [downloadUpdate],
  );

  return (
    <>
      <Helmet>
        <title>Series{download ? ` - ${download.medium.display}` : ''}</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container sx={{ pt: '5px', pb: '5px' }} style={{ overflow: 'auto' }} maxWidth="xl">
        {(downloadFetching || mediaFetching) && <LoadingIndicator />}
        {download && (
          <Download
            id={id}
            type={download.medium.type}
            download={download}
            files={download.download_files}
            episodes={media}
            torrent={torrent}
            select={select}
          />
        )}
      </Container>
    </>
  );
}
