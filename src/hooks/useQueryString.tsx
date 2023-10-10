import { useCallback } from 'react';

export function useQueryString() {
  const queryString = useCallback(form => {
    return objectToQueryString(form);
  }, []);

  return { queryString };
}

export function objectToQueryString(obj) {
  let str: any[] = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }

  const qs = str.join('&');
  return qs;
}
