'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { MainRecipeDetails } from '../../components/main-recipe-details';

const queryClient = new QueryClient();

export default function MealDetails() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainRecipeDetails />
    </QueryClientProvider>
  );
}