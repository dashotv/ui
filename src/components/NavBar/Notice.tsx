import Typography from '@mui/material/Typography';

export function Notice(props) {
  return (
    <div className="notice">
      <div className="title">
        <Typography variant="overline">{props.data.class}</Typography>
      </div>
      <div className="message">
        <Typography variant="body1">{props.data.message}</Typography>
      </div>
    </div>
  );
}
