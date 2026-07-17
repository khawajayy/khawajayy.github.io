// Tiny event bus over window CustomEvents — lets the terminal,
// easter eggs, and overlays talk without prop drilling.

export type EggEvent =
  | "confetti"
  | "matrix"
  | "matrix-off"
  | "football"
  | "devmode"
  | "konami";

export function emitEgg(name: EggEvent) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("egg", { detail: name }));
  }
}

export function onEgg(handler: (name: EggEvent) => void) {
  const fn = (e: Event) => handler((e as CustomEvent).detail as EggEvent);
  window.addEventListener("egg", fn);
  return () => window.removeEventListener("egg", fn);
}
