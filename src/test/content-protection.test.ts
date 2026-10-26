import { afterEach, describe, expect, it } from "vitest";
import { installContentProtection } from "@/lib/content-protection";

let cleanup: (() => void) | undefined;
afterEach(() => {
  cleanup?.();
  document.body.replaceChildren();
});

describe("Site content restrictions", () => {
  it("blocks right-click menus", () => {
    cleanup = installContentProtection(document);
    const event = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
    document.body.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it("blocks copying text and images", () => {
    cleanup = installContentProtection(document);
    const event = new Event("copy", { bubbles: true, cancelable: true });
    document.body.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it("blocks dragging an image", () => {
    cleanup = installContentProtection(document);
    const image = document.createElement("img");
    document.body.append(image);
    const event = new Event("dragstart", { bubbles: true, cancelable: true });
    image.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it("removes restrictions when the site shell unmounts", () => {
    cleanup = installContentProtection(document);
    cleanup();
    const event = new Event("copy", { bubbles: true, cancelable: true });
    document.body.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });
});