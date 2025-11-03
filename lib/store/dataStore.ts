import { create } from "zustand";

import { siteConfig } from "@/config/site";
let dataIsLoading: Promise<any> | null = null;

export const useDataStore = create<{
  data: any | null;
  load: {
    strategies: () => Promise<any>;
  };
}>(() => ({
  data: null,
  load: {
    strategies: async () => {
      if (dataIsLoading) return dataIsLoading;
      // /api/subscriptions/user-subscriptions
      console.log(
        "%cLoad strategies...",
        "background-color: lightskyblue; color: blue",
      );
      dataIsLoading = fetch(
        `/api${siteConfig.innerItems.statistics.strategies.href}`,
        { credentials: "include" },
      )
        .then((result) => result.json())
        .then((data) => {
          useDataStore.setState({ data: data });
          dataIsLoading = null;
          console.log("%cStrategies are loaded", "color: #eee", data);

          return data;
        })
        .catch((e) => {
          dataIsLoading = null;
          throw e;
        });

      return dataIsLoading;
    },
  },
}));
