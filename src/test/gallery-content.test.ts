import { describe, expect, it } from "vitest";
import { allPhotos, galleryCollections, mediaItems, pick } from "@/content/gallery";

describe("Recovered original gallery data", () => {
  it.each([24, 38, 29, 19, 19, 15, 63, 31, 51, 27].map((count, index) => [index + 1, count]))(
    "keeps Gallery %i's original photo count of %i",
    (number, count) => {
      expect(galleryCollections.find((collection) => collection.id === `gallery-${number}`)?.images).toHaveLength(count);
    },
  );

  it("reuses shared originals without dropping gallery membership", () => {
    expect(allPhotos).toHaveLength(316);
    expect(new Set(allPhotos.map((photo) => photo.src)).size).toBe(282);
    expect(allPhotos.every((photo) => photo.src.startsWith("/__l5e/assets-v1/"))).toBe(true);
  });

  it("selects photos from the requested collection with a safe fallback", () => {
    const collection = galleryCollections.find((item) => item.id === "gallery-8");
    expect(pick(8, 31)).toBe(collection?.images[0]);
    expect(pick(99, 0)).toBe(galleryCollections[0]?.images[0]);
  });

  it("preserves all three owner-uploaded videos and covers", () => {
    expect(mediaItems.map((item) => item.src?.split("/").at(-1))).toEqual([
      "daniel001.mp4", "daniel02.mp4", "daniel0005.mp4",
    ]);
    expect(mediaItems.map((item) => item.poster.split("/").at(-1))).toEqual([
      "lkc1.jpg", "lkc2.jpg", "lkc3.jpg",
    ]);
  });
});