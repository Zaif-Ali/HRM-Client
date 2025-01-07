import { LucideIcon } from 'lucide-react';

type RequestT = {
  label: string;
  value: string;
  icon?: LucideIcon;
  availableRequests: number;
};

type RequestFilters = {
  search: string | null;
  status: string | null;
  type: string | null;
  timestamp: string | null;
};
