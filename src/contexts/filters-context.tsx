/* eslint-disable react/no-unstable-context-value */
import type { PropsWithChildren } from "react";
import { createContext, useState } from "react";

export interface FiltersHook {
  // state.
  selectedTag: string;

  // actions.
  updateSelectedTag: (tag: string) => void;
}

export const FiltersContext = createContext<FiltersHook | null>(null);

export function FiltersProvider(props: PropsWithChildren) {
  const [selectedTag, setSelectedTag] = useState("");

  const updateSelectedTag = (tag: string) => {
    if (tag === selectedTag) {
      setSelectedTag("");
      return;
    }

    setSelectedTag(tag);
  };

  return (
    <FiltersContext.Provider
      value={{
        selectedTag,
        updateSelectedTag,
      }}
    >
      {props.children}
    </FiltersContext.Provider>
  );
}
