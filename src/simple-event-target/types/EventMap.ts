export type EventMap = {
  [key: string]: (...args: any | undefined) => void;
};
