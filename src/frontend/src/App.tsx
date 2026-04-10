import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
});

// Lazy-loaded pages for performance
const MapDashboard = lazy(() => import("@/pages/MapDashboard"));
const Devices = lazy(() => import("@/pages/Devices"));
const Topology = lazy(() => import("@/pages/Topology"));
const Monitoring = lazy(() => import("@/pages/Monitoring"));
const Tools = lazy(() => import("@/pages/Tools"));
const Analytics = lazy(() => import("@/pages/Analytics"));
const Workflows = lazy(() => import("@/pages/Workflows"));
const AIAssistant = lazy(() => import("@/pages/AIAssistant"));
const SLADashboard = lazy(() => import("@/pages/SLADashboard"));
const PredictiveIntelligence = lazy(
  () => import("@/pages/PredictiveIntelligence"),
);
const CapacityPlanning = lazy(() => import("@/pages/CapacityPlanning"));
const AuditLogs = lazy(() => import("@/pages/AuditLogs"));

function PageLoader() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-48 bg-muted/50" />
      <div className="grid grid-cols-4 gap-4">
        {["a", "b", "c", "d"].map((k) => (
          <Skeleton key={k} className="h-24 rounded-2xl bg-muted/40" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-2xl bg-muted/40" />
    </div>
  );
}

const rootRoute = createRootRoute({ component: Layout });

const routes = [
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => (
      <Suspense fallback={<PageLoader />}>
        <MapDashboard />
      </Suspense>
    ),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/devices",
    component: () => (
      <Suspense fallback={<PageLoader />}>
        <Devices />
      </Suspense>
    ),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/topology",
    component: () => (
      <Suspense fallback={<PageLoader />}>
        <Topology />
      </Suspense>
    ),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/monitoring",
    component: () => (
      <Suspense fallback={<PageLoader />}>
        <Monitoring />
      </Suspense>
    ),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/tools",
    component: () => (
      <Suspense fallback={<PageLoader />}>
        <Tools />
      </Suspense>
    ),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/analytics",
    component: () => (
      <Suspense fallback={<PageLoader />}>
        <Analytics />
      </Suspense>
    ),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/workflows",
    component: () => (
      <Suspense fallback={<PageLoader />}>
        <Workflows />
      </Suspense>
    ),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/ai",
    component: () => (
      <Suspense fallback={<PageLoader />}>
        <AIAssistant />
      </Suspense>
    ),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/sla",
    component: () => (
      <Suspense fallback={<PageLoader />}>
        <SLADashboard />
      </Suspense>
    ),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/predictive",
    component: () => (
      <Suspense fallback={<PageLoader />}>
        <PredictiveIntelligence />
      </Suspense>
    ),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/capacity",
    component: () => (
      <Suspense fallback={<PageLoader />}>
        <CapacityPlanning />
      </Suspense>
    ),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/audit",
    component: () => (
      <Suspense fallback={<PageLoader />}>
        <AuditLogs />
      </Suspense>
    ),
  }),
];

const routeTree = rootRoute.addChildren(routes);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
