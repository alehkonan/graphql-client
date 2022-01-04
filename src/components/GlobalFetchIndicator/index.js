import { LinearProgress } from '@mui/material';
import React from 'react';
import { useIsFetching } from 'react-query';

export const GlobalFetchIndicator = () => {
  const isFetching = useIsFetching();

  return isFetching ? (
    <LinearProgress style={{ position: 'fixed', top: 0, width: '100%' }} />
  ) : null;
};
