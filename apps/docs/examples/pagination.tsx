"use client"

import { useState } from "react"

import { Pagination } from "@/registry/mintel/ui/pagination"

export default function PaginationExample() {
  const [page, setPage] = useState(6)
  const [small, setSmall] = useState(2)
  return (
    <div className="grid gap-6">
      <Pagination locale="en" page={page} pageCount={20} onPageChange={setPage} />
      <Pagination locale="en" page={small} pageCount={4} onPageChange={setSmall} />
    </div>
  )
}
