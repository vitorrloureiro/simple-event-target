import type { EventMap } from "./types/EventMap";

export class SimpleEventTarget<T extends EventMap> {
  #events: Map<keyof T, Set<T[keyof T]>> = new Map();

  addEventListener<U extends keyof T>(event: U, listener: T[U]) {
    const hasEventListenersSet = this.#events.has(event);

    if (!hasEventListenersSet) {
      this.#events.set(event, new Set());
    }

    const eventListenersSet = this.#events.get(event);
    eventListenersSet?.add(listener);
  }

  removeEventListener<U extends keyof T>(event: U, listener: T[U]) {
    const eventListenersSet = this.#events.get(event);

    eventListenersSet?.delete(listener);
  }

  dispatchEvent<U extends keyof T>(event: U, ...args: Parameters<T[U]>) {
    const eventListenersSet = this.#events.get(event);

    eventListenersSet?.forEach((listener) => {
      try {
        listener(...args);
      } catch (error) {
        console.error(error);
      }
    });
  }
}
