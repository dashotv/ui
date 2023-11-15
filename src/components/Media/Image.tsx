import * as React from 'react';

export function Image({ class: className, alt, src }: { class: string; alt: string; src?: string }) {
  function setDefaultSrc(ev) {
    ev.target.onerror = null;
    ev.target.src = '/blank.png';
  }
  return (
    <div className={className}>
      <img alt={alt} src={src} onError={setDefaultSrc} />
    </div>
  );
}
