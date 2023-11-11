import React from 'react';

export function Notice({ data: { class: className, message } }: { data: { class: string; message: string } }) {
  return (
    <div className="notice">
      <div className="title">
        <b>{className}</b>
      </div>
      <div className="message">{message}</div>
    </div>
  );
}
