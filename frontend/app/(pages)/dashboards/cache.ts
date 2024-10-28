import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useDashboardsCache = () => {
  const queryClient = useQueryClient();

  return useMemo(
    () => ({
      invalidateList: () =>
        queryClient.invalidateQueries({ queryKey: ["dashboards", "list"] }),
    }),
    [queryClient]
  );
};
