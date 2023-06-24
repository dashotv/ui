import * as React from 'react';
import Moment from 'react-moment';

import ImageSmall from 'components/MediumLarge/ImageSmall';

export default function Details(props) {
  return (
    <div className="details">
      <table className="horizontal-table" aria-label="a dense table">
        <tbody>
          <tr>
            <th>Display</th>
            <td>{props.data.display}</td>
          </tr>
          <tr>
            <th>Search</th>
            <td>{props.data.search}</td>
          </tr>
          <tr>
            <th>Directory</th>
            <td>{props.data.directory}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{props.data.title}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{props.data.description}</td>
          </tr>
          <tr>
            <th>Release</th>
            <td>
              <Moment format="YYYY-MM-DD" add={{ days: 1 }}>
                {props.data.release_date}
              </Moment>
            </td>
          </tr>
          <tr>
            <th>Source</th>
            <td>
              {props.data.source} {props.data.source_id}
            </td>
          </tr>
          <tr>
            <th>Updated</th>
            <td>
              <Moment fromNow>{props.data.updated_at}</Moment>
            </td>
          </tr>
          <tr>
            <th>Images</th>
            <td>
              <div className="images">
                <ImageSmall class="cover-sm" alt="cover" src={props.cover} />
                <ImageSmall class="background-sm" alt="background" src={props.background} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}