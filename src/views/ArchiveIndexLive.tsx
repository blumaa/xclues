"use client";

import { useEffect, useMemo } from "react";
import { STATS_STORAGE_KEY, getStatsStore, useStatsStore } from "../store/statsStore";
import { archiveResultsByDate } from "../utils/archiveResults";
import { ArchiveIndexView, type ArchiveIndexViewProps } from "./ArchiveIndexView";

/**
 * Archive hub with this device's results. Server render and first client
 * render show every day unplayed; saved results fill in after hydration.
 */
export function ArchiveIndexLive(props: Omit<ArchiveIndexViewProps, "results">) {
  const history = useStatsStore((s) => s.gameHistory);
  const results = useMemo(
    () => archiveResultsByDate(history, props.genre),
    [history, props.genre],
  );

  useEffect(() => {
    getStatsStore().getState().hydrate(STATS_STORAGE_KEY);
  }, []);

  return <ArchiveIndexView {...props} results={results} />;
}
