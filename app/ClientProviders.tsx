'use client';

import { ReactNode } from 'react';
import { Providers } from './redux/providers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { store } from './redux/store';

const queryClient = new QueryClient();

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <Providers store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Providers>
  );
}
