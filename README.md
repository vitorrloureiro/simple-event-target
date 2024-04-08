# Simple Event Target

**Simple Event Target** is a TypeScript library designed to simplify the creation of classes that emit events. By leveraging TypeScript's powerful type system, it offers a streamlined, type-safe interface for event handling that closely mimics the familiar browser's EventListener API. The primary motivation behind **Simple Event Target** is to provide a lightweight, easy-to-use solution for event management without the overhead of additional options found in similar libraries.

## Features

- Full TypeScript support for type-safe event handling.
- Mimics the browser's EventListener API for ease of use.
- Lightweight and straightforward, with no unnecessary options.
- No dependencies.

## Installation

Install **Simple Event Target** using your favorite package manager:

```bash
pnpm add vrls-simple-event-target
```

Or, if you prefer `npm` or `yarn`, you can use:

```bash
npm install vrls-simple-event-target
# or
yarn add vrls-simple-event-target
```

## Usage

To get started with **Simple Event Target**, follow these steps:

1. **Define a Custom Event Map:** Start by creating a type that represents your custom event map. This map will define the events your class can emit and the type of the event handler functions.

2. **Extend Your Class:** Extend `SimpleEventTarget` with your custom event map to create a new class capable of emitting events.

### Example

Below is an example demonstrating how to create a custom class that emits a `statechange` event:

```typescript
import { SimpleEventTarget } from "vrls-simple-event-target";

// Define possible states
type CustomState = "loading" | "ready";

// Define event map
type CustomEventMap = {
  statechange: (newState: CustomState) => void;
};

// Extend SimpleEventTarget to create a custom class
class MyClass extends SimpleEventTarget<CustomEventMap> {
  changeState(newState: CustomState) {
    // Dispatch the 'statechange' event with the new state
    this.dispatchEvent("statechange", newState);
  }
}

// Usage
const myClassInstance = new MyClass();
myClassInstance.addEventListener("statechange", (newState) => {
  console.log(`State changed to: ${newState}`);
});

// Trigger the state change
myClassInstance.changeState("loading"); // Logs: "State changed to: loading"
myClassInstance.changeState("ready"); // Logs: "State changed to: ready"
```

## Contributing

We welcome contributions from the community! Whether it's adding new features, fixing bugs, or improving documentation, please feel free to make a pull request.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository. We're here to help!

---

By using **Simple Event Target**, you can easily add robust event-handling capabilities to your TypeScript projects with minimal overhead and maximum type safety. Give it a try today!
