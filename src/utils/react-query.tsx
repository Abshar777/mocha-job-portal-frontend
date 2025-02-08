"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

type Props = { children: React.ReactNode };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
      refetchOnMount: "always", 
      refetchOnReconnect: "always", 
      retry: false, 
      staleTime: 60000, 
    },

    mutations: {
      retry: false, 
    },
  },
});

const ReactQueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
