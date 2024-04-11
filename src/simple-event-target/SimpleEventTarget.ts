import type { EventMap } from "./types/EventMap";

export class SimpleEventTarget<T extends EventMap> {
  #events: { [K in keyof T]: Set<T[K]> } = {} as { [K in keyof T]: Set<T[K]> };

  constructor(eventTypes: Array<keyof T>) {
    eventTypes.forEach((eventType) => {
      this.#events[eventType] = new Set();
    });
  }

  addEventListener<U extends keyof T>(event: U, listener: T[U]) {
    const eventListenersSet = this.#events[event];
    eventListenersSet.add(listener);
  }

  removeEventListener<U extends keyof T>(event: U, listener: T[U]) {
    const eventListenersSet = this.#events[event];

    eventListenersSet.delete(listener);
  }

  dispatchEvent<U extends keyof T>(event: U, ...args: Parameters<T[U]>) {
    const eventListenersSet = this.#events[event];

    eventListenersSet.forEach((listener) => {
      try {
        listener(...args);
      } catch (error) {
        console.error(error);
      }
    });
  }
}
