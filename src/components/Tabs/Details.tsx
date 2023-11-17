import * as React from 'react';

import Chrono from 'components/Chrono';
import { Image } from 'components/Media';

export type DetailsProps = {
  kind?: string;
  cover?: string;
  background?: string;
  display?: string;
  search?: string;
  directory?: string;
  title?: string;
  description?: string;
  release_date?: string;
  source: string;
  source_id: string;
  created_at: string;
  updated_at: string;
};
export default function Details({
  kind,
  cover,
  background,
  display,
  search,
  directory,
  title,
  description,
  release_date,
  source,
  source_id,
  created_at,
  updated_at,
}: DetailsProps) {
  return (
    <>
      <div className="details">
        <table className="horizontal-table" aria-label="a dense table">
          <tbody>
            <tr>
              <th>Title</th>
              <td>{title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{description}</td>
            </tr>
            <tr>
              <th>Release</th>
              <td>
                <Chrono format="YYYY-MM-DD" stamp={release_date} />
              </td>
            </tr>
            <tr>
              <th>Source</th>
              <td>
                {source} {source_id}
              </td>
            </tr>
            <tr>
              <th>Images</th>
              <td>
                <div className="images">
                  <Image class="cover-sm" alt="cover" src={cover} />
                  <Image class="background-sm" alt="background" src={background} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '12px' }} className="details">
        <table className="horizontal-table" aria-label="a dense table">
          <tbody>
            <tr>
              <th>Kind</th>
              <td>{kind}</td>
            </tr>
            <tr>
              <th>Display</th>
              <td>{display}</td>
            </tr>
            <tr>
              <th>Search</th>
              <td>{search}</td>
            </tr>
            <tr>
              <th>Directory</th>
              <td>{directory}</td>
            </tr>
            <tr>
              <th>Created</th>
              <td>
                <Chrono fromNow>{created_at}</Chrono>
              </td>
            </tr>
            <tr>
              <th>Updated</th>
              <td>
                <Chrono fromNow>{updated_at}</Chrono>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
