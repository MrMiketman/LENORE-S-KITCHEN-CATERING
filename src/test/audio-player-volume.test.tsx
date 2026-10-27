import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AudioPlayer } from "@/components/site/AudioPlayer";

describe("music player volume", () => {
  it("starts the track at 5% volume", () => {
    const { container } = render(<AudioPlayer />);
    const audio = container.querySelector("audio") as HTMLAudioElement | null;

    expect(audio).not.toBeNull();
    expect(audio!.volume).toBe(0.05);
  });
});
