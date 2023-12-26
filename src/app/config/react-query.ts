import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 30000,
      refetchInterval: false,
      refetchIntervalInBackground: true,
    },
  },
});

export { queryClient };
