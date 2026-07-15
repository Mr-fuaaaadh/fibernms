import type { Alert, Device, SLARecord } from "../types/network";

// ─── Event payload map ────────────────────────────────────────────────────────
export interface EventPayloads {
  "device.updated": { device: Device };
  "fault.detected": { alert: Alert };
  "signal.changed": { deviceId: string; signalStrength: number };
  "sla.breach": { record: SLARecord };
  "simulation.toggled": { active: boolean };
}

export type EventName = keyof EventPayloads;
type Handler<E extends EventName> = (payload: EventPayloads[E]) => void;

// ─── Type-safe event emitter ──────────────────────────────────────────────────
class EventBus {
  // Use a single map with unknown values to avoid complex generic narrowing
  private listeners = new Map<EventName, Set<(payload: unknown) => void>>();

  on<E extends EventName>(event: E, handler: Handler<E>): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    (this.listeners.get(event) as Set<(p: unknown) => void>).add(
      handler as (p: unknown) => void,
    );
  }

  off<E extends EventName>(event: E, handler: Handler<E>): void {
    this.listeners.get(event)?.delete(handler as (p: unknown) => void);
  }

  emit<E extends EventName>(event: E, payload: EventPayloads[E]): void {
    const handlers = this.listeners.get(event);
    if (!handlers) return;
    for (const h of handlers) {
      try {
        h(payload);
      } catch (err) {
        console.error(`[EventBus] Error in handler for "${event}":`, err);
      }
    }
  }

  once<E extends EventName>(event: E, handler: Handler<E>): void {
    const wrapper: Handler<E> = (payload) => {
      handler(payload);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

// ─── Singleton export ─────────────────────────────────────────────────────────
export const eventBus = new EventBus();
