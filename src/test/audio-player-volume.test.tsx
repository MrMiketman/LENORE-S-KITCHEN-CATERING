import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AudioPlayer } from "@/components/site/AudioPlayer";

function getAudio(container: HTMLElement) {
  return container.querySelector("audio") as HTMLAudioElement | null;
}

describe("music player volume", () => {
  it("starts the track at 10% volume", () => {
    const { container } = render(<AudioPlayer />);
    const audio = getAudio(container);

    expect(audio).not.toBeNull();
    expect(audio!.volume).toBe(0.1);
  });

  it("applies a volume the visitor drags the slider to", () => {
    const { container } = render(<AudioPlayer />);
    const slider = container.querySelector('input[type="range"]') as HTMLInputElement | null;

    expect(slider).not.toBeNull();
    fireEvent.change(slider!, { target: { value: "0.4" } });

    expect(getAudio(container)!.volume).toBe(0.4);
  });

  it("silences the track when the mute button is pressed, and restores it", () => {
    const { container } = render(<AudioPlayer />);
    const mute = container.querySelector('button[aria-label="Mute music"]') as HTMLButtonElement | null;

    expect(mute).not.toBeNull();
    fireEvent.click(mute!);
    expect(getAudio(container)!.muted).toBe(true);

    fireEvent.click(container.querySelector('button[aria-label="Unmute music"]')!);
    expect(getAudio(container)!.muted).toBe(false);
  });
});
