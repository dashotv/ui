import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { LoadingIndicator } from 'components/Common';
import {
  Download,
  useDownloadMediumQuery,
  useDownloadMutation,
  useDownloadQuery,
  useDownloadSelectionMutation,
} from 'components/Downloads';
import { Container } from 'components/Layout';
import { Nzbgeek } from 'components/Nzbgeek/types';
import { Release } from 'components/Releases/types';
import { useDownloadingId } from 'hooks/downloading';

export default function DownloadsShowPage() {
  const { id } = useParams();
  if (!id) {
    return <></>;
  }

  const { isFetching: downloadFetching, data: download } = useDownloadQuery(id);
  const { isFetching: mediaFetching, data: media } = useDownloadMediumQuery(id);
  // const [torrent, setTorrent] = useState<Torrent | undefined>(undefined);
  // const { torrents } = useReleases();
  const downloadUpdate = useDownloadMutation(id);
  const downloadSelection = useDownloadSelectionMutation(id);
  const { torrent } = useDownloadingId(id);

  // useEffect(() => {
  //   if (!torrents || !download || !download.thash) {
  //     return;
  //   }
  //   const t = torrents.get(download.thash);
  //   if (t) {
  //     setTorrent(t);
  //   }
  // }, [torrents, download]);

  const changeInfo = useCallback(
    info => {
      if (!download) {
        return;
      }
      downloadUpdate.mutate({ ...download, ...info });
    },
    [downloadUpdate],
  );

  const changeSetting = useCallback(
    (setting: string, value: boolean | string) => {
      if (!download) {
        return;
      }
      if (setting === 'status' && value === 'searching') {
        downloadUpdate.mutate({ ...download, status: 'searching', release_id: '', url: '' });
        return;
      }
      downloadUpdate.mutate({ ...download, [setting]: value });
    },
    [downloadUpdate],
  );

  const selectRelease = useCallback(
    (selected: Release | Nzbgeek) => {
      if (!download) {
        return;
      }
      if ((selected as Release).id) {
        downloadUpdate.mutate({ ...download, status: 'loading', release_id: (selected as Release).id, url: '' });
        return;
      }
      if ((selected as Nzbgeek).link) {
        downloadUpdate.mutate({ ...download, status: 'loading', url: (selected as Nzbgeek).link, release_id: '' });
        return;
      }
    },
    [downloadUpdate],
  );

  const selectMedium = useCallback(
    (eid: number | null, num: number) => {
      downloadSelection.mutate({ mediumId: eid, num: num });
    },
    [downloadSelection],
  );

  return (
    <>
      <Helmet>
        <title>Series{download ? ` - ${download.medium.display}` : ''}</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        {(downloadFetching || mediaFetching) && <LoadingIndicator />}
        {download && (
          <Download
            {...{ id, download, changeSetting, changeInfo, selectRelease, selectMedium }}
            type={download.medium.type}
            files={download.download_files}
            episodes={media}
            torrent={torrent}
          />
        )}
      </Container>
    </>
  );
}
