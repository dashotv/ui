import * as React from 'react';

export default function ImageSmall(props) {
  function setDefaultSrc(ev) {
    ev.target.onerror = null;
    ev.target.src = '/blank.png';
  }
  return (
    <div className={props.class}>
      <img alt={props.alt} src={props.src} onError={setDefaultSrc} />
    </div>
  );
}
