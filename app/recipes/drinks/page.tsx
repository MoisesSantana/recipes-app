'use client';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { CardList } from '../components/card-list';

const queryClient = new QueryClient();

export default function Drinks() {
  return (
    <QueryClientProvider client={queryClient}>
      <CardList />
    </QueryClientProvider>
  );
}