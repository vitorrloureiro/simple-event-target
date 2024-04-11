import { bench } from "vitest";
import { SimpleEventTarget } from "../SimpleEventTarget";

type MockEventMap = {
  click: () => void;
};

let mockEventTarget: SimpleEventTarget<MockEventMap>;

let mockListeners: Array<MockEventMap[keyof MockEventMap]> = [];

function createNewInstance() {
  mockEventTarget = new SimpleEventTarget<MockEventMap>(["click"]);
}

function fillMockListeners() {
  for (let i = 0; i < 1000; i++) {
    const mockFunction = () => {
      "exists";
    };
    mockListeners.push(mockFunction);
  }
}

function addEventListeners() {
  fillMockListeners();

  for (const listener of mockListeners) {
    mockEventTarget.addEventListener("click", listener);
  }
}

bench(
  "SimpleEventTarget.addEventListener",
  () => {
    for (const listener of mockListeners) {
      mockEventTarget.addEventListener("click", listener);
    }
  },
  {
    setup: () => {
      createNewInstance();
      fillMockListeners();
    },
    teardown: () => {
      mockListeners = [];
    },
  }
);

bench(
  "SimpleEventTarget.removeEventListener",
  () => {
    for (const listener of mockListeners) {
      mockEventTarget.removeEventListener("click", listener);
    }
  },
  {
    setup: () => {
      createNewInstance();
      addEventListeners();
    },
    teardown: () => {
      mockListeners = [];
    },
  }
);
bench(
  "SimpleEventTarget.dispatchEvent",
  () => {
    mockEventTarget.dispatchEvent("click");
  },
  {
    setup: () => {
      createNewInstance();
      addEventListeners();
    },
    teardown: () => {
      mockListeners = [];
    },
  }
);
