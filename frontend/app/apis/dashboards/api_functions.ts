import { ServerApi } from "@/providers/axios";
import {
  AccountHistory
} from "@/types/account_history";

const path = "";

export const DashboardsApi = {
  list: async (): Promise<{ data: AccountHistory[] }> => {
    return await ServerApi.get(path).then((res) => res.data);
  },
};
