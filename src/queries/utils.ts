import { QueryClient } from "@tanstack/react-query";
import { config } from "@utils/config";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: config.queryStaleTime,
      gcTime: config.queryGCTime,
    },
  },
});
