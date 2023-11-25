export type NavPage = {
  name: React.ReactNode;
  page: string;
  exact?: boolean;
};
export type NavPageWithChildren = NavPage & {
  children: NavPage[];
};
