export function Notice(props) {
  return (
    <div>
      <div>
        <b>{props.data.class}</b>
      </div>
      <div>{props.data.message}</div>
    </div>
  );
}
