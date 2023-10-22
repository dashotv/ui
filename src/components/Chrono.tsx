import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface DateProps {
  fromNow?: boolean;
  format?: string;
  special?: boolean;
  children: string;
}
export default function Chrono({ fromNow, format = 'YYYY-MM-DD', special, children }: DateProps) {
  const process = (date: string) => {
    const i = dayjs(date);
    const offset = i.utcOffset();
    let d = i.subtract(offset, 'minutes');

    if (special !== undefined) {
      const diff = d.diff(dayjs(), 'days');
      if (diff > 7 || diff < -7) {
        return d.format(format);
      }
      if (diff == 1) {
        return 'Tomorrow';
      }
      if (diff == 0) {
        return 'Today';
      }
      if (diff == -1) {
        return 'Yesterday';
      }
      if (diff > -7 && diff <= -1) {
        return d.subtract(diff, 'days').format('dddd');
      }
      return d.format('dddd');
    }

    if (fromNow !== undefined || fromNow) {
      return d.fromNow();
    }

    return d.format(format);
  };

  return (
    <span className="dashotv-date" title={`fromnow: ${fromNow}`}>
      {process(children)}
    </span>
  );
}
