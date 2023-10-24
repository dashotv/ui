import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(weekday);

interface DateProps {
  fromNow?: boolean;
  format?: string;
  special?: boolean;
  children: string;
}
export default function Chrono({ fromNow, format = 'YYYY-MM-DD', special, children }: DateProps) {
  const raw = dayjs(children);

  const process = () => {
    if (special !== undefined || special) {
      const today = dayjs().startOf('day');
      const diff = raw.diff(today, 'days', true);
      // console.log('today: ', today.toString(), 'raw: ', raw.toString(), 'diff: ', diff);
      if (diff > 7 || diff < -7) {
        return raw.format(format);
      }
      if (diff > -1 && diff < 0) {
        return 'Yesterday';
      }
      if (diff < 1) {
        return 'Today';
      }
      if (diff < 2) {
        return 'Tomorrow';
      }
      if (diff > -7 && diff < 0) {
        return 'last ' + raw.weekday(diff).format('dddd');
      }
      return raw.weekday(diff).format('dddd');
    }

    if (fromNow !== undefined || fromNow) {
      return raw.fromNow();
    }

    return raw.format(format);
  };

  return (
    <span className="dashotv-date" title={`${raw}`}>
      {process()}
    </span>
  );
}
