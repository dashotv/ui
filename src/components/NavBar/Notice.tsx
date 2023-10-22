export function Notice(props) {
  return (
    <div className="notice">
      <div className="title">
        <b>{props.data.class}</b>
      </div>
      <div className="message">{props.data.message}</div>
    </div>
  );
}
