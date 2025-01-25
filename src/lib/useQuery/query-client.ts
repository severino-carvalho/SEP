import { QueryClient, QueryClientConfig } from "@tanstack/react-query";

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
}

export const queryClient = new QueryClient(queryClientConfig);
