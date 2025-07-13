"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type ReactNode, useState } from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

interface Props {
  children: ReactNode
}

export default function QueryProvider({ children }: Props) {
  // Ensure QueryClient is created once per browser tab
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
