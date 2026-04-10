import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRouteWithContext,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy, useMemo } from "react";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
});

// Lazy-loaded pages
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
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Billing = lazy(() => import("@/pages/Billing"));
const UsageAnalytics = lazy(() => import("@/pages/UsageAnalytics"));
const Plans = lazy(() => import("@/pages/Plans"));
const Integrations = lazy(() => import("@/pages/Integrations"));
const Branding = lazy(() => import("@/pages/Branding"));
const License = lazy(() => import("@/pages/License"));
const Tenants = lazy(() => import("@/pages/Tenants"));

type RouterContext = { isAuthenticated: boolean };

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

function withSuspense(
  Page: React.LazyExoticComponent<() => React.ReactElement>,
) {
  return function SuspensePage() {
    return (
      <Suspense fallback={<PageLoader />}>
        <Page />
      </Suspense>
    );
  };
}

// Route tree construction
const rootRoute = createRootRouteWithContext<RouterContext>()({});

const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: Outlet,
});

const loginRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/login",
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) throw redirect({ to: "/" });
  },
  component: withSuspense(Login),
});

const registerRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/register",
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) throw redirect({ to: "/" });
  },
  component: withSuspense(Register),
});

const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) throw redirect({ to: "/login" });
  },
  component: Layout,
});

function makeProtectedPage(
  path: string,
  Page: React.LazyExoticComponent<() => React.ReactElement>,
) {
  return createRoute({
    getParentRoute: () => protectedRoute,
    path,
    component: withSuspense(Page),
  });
}

const mapRoute = makeProtectedPage("/", MapDashboard);
const devicesRoute = makeProtectedPage("/devices", Devices);
const topologyRoute = makeProtectedPage("/topology", Topology);
const monitoringRoute = makeProtectedPage("/monitoring", Monitoring);
const toolsRoute = makeProtectedPage("/tools", Tools);
const analyticsRoute = makeProtectedPage("/analytics", Analytics);
const workflowsRoute = makeProtectedPage("/workflows", Workflows);
const aiRoute = makeProtectedPage("/ai", AIAssistant);
const slaRoute = makeProtectedPage("/sla", SLADashboard);
const predictiveRoute = makeProtectedPage(
  "/predictive",
  PredictiveIntelligence,
);
const capacityRoute = makeProtectedPage("/capacity", CapacityPlanning);
const auditRoute = makeProtectedPage("/audit", AuditLogs);
const billingRoute = makeProtectedPage("/billing", Billing);
const usageRoute = makeProtectedPage("/usage", UsageAnalytics);
const plansRoute = makeProtectedPage("/plans", Plans);
const integrationsRoute = makeProtectedPage("/integrations", Integrations);
const brandingRoute = makeProtectedPage("/settings/branding", Branding);
const licenseRoute = makeProtectedPage("/settings/license", License);
const tenantsRoute = makeProtectedPage("/tenants", Tenants);

const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([loginRoute, registerRoute]),
  protectedRoute.addChildren([
    mapRoute,
    devicesRoute,
    topologyRoute,
    monitoringRoute,
    toolsRoute,
    analyticsRoute,
    workflowsRoute,
    aiRoute,
    slaRoute,
    predictiveRoute,
    capacityRoute,
    auditRoute,
    billingRoute,
    usageRoute,
    plansRoute,
    integrationsRoute,
    brandingRoute,
    licenseRoute,
    tenantsRoute,
  ]),
]);

// Stable router instance used for type registration only
const router = createRouter({
  routeTree,
  context: { isAuthenticated: false },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InitializingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center noc-glow animate-pulse">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.143 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
            />
          </svg>
        </div>
        <p className="text-xs font-mono text-muted-foreground tracking-widest">
          INITIALIZING NOC SYSTEM…
        </p>
      </div>
    </div>
  );
}

function AppRouter() {
  const { isAuthenticated, isInitializing } = useAuth();

  const authenticatedRouter = useMemo(
    () =>
      createRouter({
        routeTree,
        context: { isAuthenticated },
      }),
    [isAuthenticated],
  );

  if (isInitializing) return <InitializingScreen />;

  return <RouterProvider router={authenticatedRouter} />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}
