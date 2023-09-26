import { useCallback } from 'react';

export function useQueryString() {
  const queryString = useCallback(form => {
    const str = [];
    for (const p in form)
      if (form.hasOwnProperty(p)) {
        // @ts-ignore
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(form[p]));
      }

    const qs = str.join('&');
    return qs;
  }, []);

  return { queryString };
}
