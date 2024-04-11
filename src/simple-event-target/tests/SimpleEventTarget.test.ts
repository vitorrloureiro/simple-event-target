import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import { SimpleEventTarget } from "../SimpleEventTarget";

type CustomEventMapper = {
  message: (message: string) => void;
  click: (pi: number, clickMessage: string) => void;
};

describe("SimpleEventTarget", () => {
  const PI = 3.14;
  const TEST_MESSAGE = "Test message";
  const CLICK_MESSAGE = "Test click";

  class MockEventEmitter extends SimpleEventTarget<CustomEventMapper> {
    constructor() {
      super(["click", "message"]);
    }
    sendMessage() {
      this.dispatchEvent("message", TEST_MESSAGE);
    }

    click() {
      this.dispatchEvent("click", PI, CLICK_MESSAGE);
    }
  }

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should run sync callbacks with correct params", () => {
    function messageListener(message: string) {
      expect(message).toBe(TEST_MESSAGE);
    }

    function clickListener(pi: number, clickMessage: string) {
      expect(pi).toBe(PI);
      expect(clickMessage).toBe(CLICK_MESSAGE);
    }

    const mockEventEmitter = new MockEventEmitter();
    mockEventEmitter.addEventListener("message", messageListener);
    mockEventEmitter.addEventListener("click", clickListener);

    mockEventEmitter.sendMessage();
    mockEventEmitter.click();
  });

  it("should run async callbacks with correct params", async () => {
    const TIMER1 = 10000;
    const TIMER2 = 20000;

    const mockFn = vi.fn();
    async function messageListener(message: string) {
      await new Promise((res) => {
        setTimeout(() => res(null), TIMER1);
      });
      expect(message).toBe(TEST_MESSAGE);
      mockFn();
    }

    async function clickListener(pi: number, clickMessage: string) {
      await new Promise((res) => {
        setTimeout(() => res(null), TIMER2);
      });

      expect(pi).toBe(PI);
      expect(clickMessage).toBe(CLICK_MESSAGE);
      mockFn();
    }

    const mockEventEmitter = new MockEventEmitter();
    mockEventEmitter.addEventListener("message", messageListener);
    mockEventEmitter.addEventListener("click", clickListener);

    mockEventEmitter.sendMessage();
    mockEventEmitter.click();

    await vi.advanceTimersByTimeAsync(TIMER1 / 2);
    expect(mockFn).not.toBeCalled();

    await vi.advanceTimersByTimeAsync(TIMER1);
    expect(mockFn).toBeCalledTimes(1);

    await vi.runAllTimersAsync();
    expect(mockFn).toBeCalledTimes(2);
  });

  it("should remove event listener", () => {
    const mockEventEmitter = new MockEventEmitter();

    const mockCallback = vi.fn();

    mockEventEmitter.addEventListener("message", mockCallback);
    mockEventEmitter.removeEventListener("message", mockCallback);
    mockEventEmitter.sendMessage();

    expect(mockCallback);
  });

  it("should gracefully return when trying to remove an event listener that is not registered", () => {
    const mockEventEmitter = new MockEventEmitter();
    const mockCallbackNeverAdded = vi.fn();

    expect(() => mockEventEmitter.removeEventListener("click", mockCallbackNeverAdded)).not.toThrow();

    mockEventEmitter.click();
    expect(mockCallbackNeverAdded).not.toBeCalled();
  });
});
