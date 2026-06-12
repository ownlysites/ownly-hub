/* Client-side hub utilities: analytics beacon + cross-component events.
   Analytics ride the existing /api/route-click receiver (LeadConnector/DBC). */

export const SET_PATH_EVENT = "ownly:set-path";
export const OPEN_VAULT_EVENT = "ownly:open-vault";
export const PATH_STORAGE_KEY = "ownly_path";

export function track(type: string, extra: Record<string, unknown> = {}) {
  try {
    const payload = JSON.stringify({ type, ...extra, ts: Date.now() });
    navigator.sendBeacon?.(
      "/api/route-click",
      new Blob([payload], { type: "application/json" })
    );
  } catch {
    /* fire-and-forget */
  }
}

export function requestPath(pathId: string) {
  window.dispatchEvent(new CustomEvent(SET_PATH_EVENT, { detail: pathId }));
}

export function openVault(source: string) {
  window.dispatchEvent(new CustomEvent(OPEN_VAULT_EVENT, { detail: source }));
}
