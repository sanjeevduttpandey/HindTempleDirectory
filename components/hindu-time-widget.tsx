"use client"

// This file re-exports the SanatanTimeWidget to satisfy the missing module reference.
// It allows for backward compatibility with components that might still be looking for "HinduTimeWidget".
export { default } from "./sanatan-time-widget"
