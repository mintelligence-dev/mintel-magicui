"use client"

import { useEffect, useRef, useState } from "react"

import { Conversation, type ChatMessage } from "@/registry/mintel/ui/conversation"

const ago = (min: number) => new Date(Date.now() - min * 60_000).toISOString()
const customer = { name: "Somchai K." }
const agent = { name: "Nina" }

const START: ChatMessage[] = [
  { id: "1", direction: "in", author: customer, time: ago(60 * 26), text: "Hi, I ordered a jacket last week" },
  { id: "2", direction: "in", author: customer, time: ago(60 * 26 - 1), text: "Order #A-10293" },
  { id: "3", direction: "system", time: ago(60 * 25), text: "Assigned to Nina" },
  { id: "4", direction: "out", author: agent, time: ago(60 * 25), text: "Hi Somchai! Let me check that for you.", status: "read" },
  { id: "5", direction: "out", author: agent, time: ago(12), text: "It ships today. Here is the receipt:", status: "read" },
  { id: "6", direction: "out", author: agent, time: ago(12), attachments: [{ type: "file", url: "#", name: "receipt-A-10293.pdf", size: "84 KB" }], status: "delivered" },
  { id: "7", direction: "in", author: customer, time: ago(2), text: "Great, thank you 🙏" },
]

export default function ConversationExample() {
  const [messages, setMessages] = useState(START)
  const [typing, setTyping] = useState<string>()
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const send = (text: string) => {
    const id = crypto.randomUUID()
    setMessages((m) => [...m, { id, direction: "out", author: agent, time: new Date().toISOString(), text, status: "sent" }])
    // Demo only: the customer reads it, types, then replies.
    timers.current.push(
      setTimeout(() => {
        setMessages((m) => m.map((x) => (x.id === id ? { ...x, status: "read" } : x)))
        setTyping(customer.name)
      }, 900),
      setTimeout(() => {
        setTyping(undefined)
        setMessages((m) => [...m, { id: crypto.randomUUID(), direction: "in", author: customer, time: new Date().toISOString(), text: "👍" }])
      }, 2400)
    )
  }

  return (
    <Conversation
      className="h-[30rem] w-full max-w-md"
      locale="en"
      channel="line"
      header={
        <div>
          <p className="font-semibold">Somchai K.</p>
          <p className="text-xs text-muted-foreground">Case #00012345</p>
        </div>
      }
      messages={messages}
      typing={typing}
      onSend={send}
    />
  )
}
