export type TRequestFilters = {
  search: string | null;
  status: string[] | null;
  type: string[] | null;
  timestamp: string  | null;
};

export type TRequest = {
  id: string;
  type: string;
  status: string;
  timestamp: string;
  subject: string;
  content: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
};

export type TRequestState = {
  filters: TRequestFilters;
  currentRequestID: string | null;
  requests: TRequest[];
};
