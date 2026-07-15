/**
 * FaultVisualizationPage.tsx — deprecated
 * All fault visualization features have been merged into MapDashboard (Network Map).
 * This page redirects to "/" for any stale bookmarks.
 */
import { useEffect } from "react";

export default function FaultVisualizationPage() {
  useEffect(() => {
    window.location.replace("/");
  }, []);
  return null;
}
