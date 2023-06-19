import React from 'react';

import { ReleasesRow } from './ReleasesRow';

export function ReleasesList(props) {
  return (
    <div className="releases">
      <table className="vertical-table">
        <thead>
          <tr>
            <td className="number"></td>
            <td className="number"></td>
            <td className="date">Type</td>
            <td>Title</td>
            <td className="actions" align="right">
              Published
            </td>
            <td className="actions" align="right">
              Actions
            </td>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map(row => (
              <ReleasesRow
                key={row.id}
                id={row.id}
                type={row.type}
                nzb={row.nzb}
                source={row.source}
                display={row.display}
                raw={row.raw}
                resolution={row.resolution}
                group={row.group}
                author={row.author}
                published={row.published_at}
                verified={row.verified}
                actions={props.actions}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}
