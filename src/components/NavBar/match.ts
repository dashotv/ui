import { NavPage, NavPageWithChildren } from './types';

export const matchPath = (path: string, exact?: boolean): boolean => {
  if (exact) {
    return path === location.pathname;
  }
  return location.pathname.startsWith(path);
};

export const matchAny = (path: string, exact?: boolean, children?: NavPage[]): boolean => {
  if (children && children?.length > 0) {
    return children.some(({ page, exact }) => matchPath(page, exact)) || matchPath(path, exact);
  }
  return matchPath(path, exact);
};

export const matchChildren = (pages: NavPageWithChildren[]): number => {
  for (let i = 0; i < pages.length; i++) {
    if (matchAny(pages[i].page, pages[i].exact, pages[i].children)) {
      return i;
    }
  }
  return 0;
};
