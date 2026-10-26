/** Browser deterrents only: publicly displayed content cannot be made download-proof. */
export function installContentProtection(target: Document): () => void {
  const prevent = (event: Event) => event.preventDefault();
  const preventImageDrag = (event: Event) => {
    if (event.target instanceof Element && event.target.closest("img")) {
      event.preventDefault();
    }
  };

  target.addEventListener("contextmenu", prevent, true);
  target.addEventListener("copy", prevent, true);
  target.addEventListener("dragstart", preventImageDrag, true);

  return () => {
    target.removeEventListener("contextmenu", prevent, true);
    target.removeEventListener("copy", prevent, true);
    target.removeEventListener("dragstart", preventImageDrag, true);
  };
}