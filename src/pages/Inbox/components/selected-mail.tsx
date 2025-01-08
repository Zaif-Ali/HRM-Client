import { useAppSelector } from '@/redux';
import React from 'react';

const SelectedMail = () => {
  const { filters } = useAppSelector((state) => state.request);
  console.log(filters);
  return (
    <React.Fragment>
      <div className="pl-4">
        <div>{filters.status?.map((status) => status)}</div>
        <div>{filters.type?.map((status) => status)}</div>
        <div>{filters.timestamp ? filters.timestamp : ''}</div>
        <div>{filters.search}</div>
      </div>
    </React.Fragment>
  );
};

export default SelectedMail;
