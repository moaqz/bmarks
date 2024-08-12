import { useContext } from "react";

import type { FiltersHook } from "~/contexts/filters-context";
import { FiltersContext } from "~/contexts/filters-context";

export function useFilters(): FiltersHook {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }

  return context;
}
