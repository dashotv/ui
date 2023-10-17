import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';

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
