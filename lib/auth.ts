// Temporary shim to keep the build working now that authentication
// has been removed.  This replaces the previous implementation and
// always resolves to null.  If you re-introduce auth later, replace
// this file with real logic or delete unused imports.

export async function getCurrentDevotee() {
  return null
}
