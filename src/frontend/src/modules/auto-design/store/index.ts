import { create } from "zustand";
import type {
  AutoDesignFormValues,
  AutoDesignResult,
  DrawingMode,
  PolygonGeoJSON,
} from "../types";

// ─── State shape ─────────────────────────────────────────────────────────────

interface AutoDesignState {
  polygon: PolygonGeoJSON | null;
  formValues: AutoDesignFormValues | null;
  result: AutoDesignResult | null;
  isLoading: boolean;
  error: string | null;
  drawingMode: DrawingMode;
  animationPlayed: boolean;

  // Visibility toggles for result layer
  showNodes: boolean;
  showEdges: boolean;

  // Selected node for side panel
  selectedNodeId: string | null;
}

interface AutoDesignActions {
  setPolygon: (polygon: PolygonGeoJSON | null) => void;
  setFormValues: (values: AutoDesignFormValues | null) => void;
  setResult: (result: AutoDesignResult | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setDrawingMode: (mode: DrawingMode) => void;
  setAnimationPlayed: (played: boolean) => void;
  setShowNodes: (show: boolean) => void;
  setShowEdges: (show: boolean) => void;
  setSelectedNodeId: (id: string | null) => void;
  reset: () => void;
}

// ─── Initial state ───────────────────────────────────────────────────────────

const initialState: AutoDesignState = {
  polygon: null,
  formValues: null,
  result: null,
  isLoading: false,
  error: null,
  drawingMode: "idle",
  animationPlayed: false,
  showNodes: true,
  showEdges: true,
  selectedNodeId: null,
};

// ─── Store ───────────────────────────────────────────────────────────────────

export const useAutoDesignStore = create<AutoDesignState & AutoDesignActions>(
  (set) => ({
    ...initialState,

    setPolygon: (polygon) => set({ polygon }),
    setFormValues: (formValues) => set({ formValues }),
    setResult: (result) => set({ result }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setDrawingMode: (drawingMode) => set({ drawingMode }),
    setAnimationPlayed: (animationPlayed) => set({ animationPlayed }),
    setShowNodes: (showNodes) => set({ showNodes }),
    setShowEdges: (showEdges) => set({ showEdges }),
    setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),
    reset: () => set({ ...initialState }),
  }),
);
