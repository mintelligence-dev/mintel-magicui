"use client"

import { useState } from "react"

import { Button } from "@/registry/mintel/ui/button"
import { Stepper } from "@/registry/mintel/ui/stepper"

const stages = [
  { value: "new", label: "New" },
  { value: "working", label: "Working" },
  { value: "escalated", label: "Escalated" },
  { value: "closed", label: "Closed" },
]

export default function StepperExample() {
  const [current, setCurrent] = useState("working")
  const [selected, setSelected] = useState<string>()
  const [step, setStep] = useState("details")

  return (
    <div className="grid w-full max-w-3xl gap-10">
      {/* Path: pick a stage, then confirm — like Salesforce's "Mark as current stage" */}
      <div className="grid gap-3">
        <Stepper steps={stages} value={current} selected={selected} onStepClick={setSelected} aria-label="Case status" />
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="brand"
            disabled={!selected || selected === current}
            onClick={() => {
              if (selected) setCurrent(selected)
              setSelected(undefined)
            }}
          >
            Mark as current
          </Button>
        </div>
      </div>

      {/* Wizard steps */}
      <Stepper
        variant="steps"
        aria-label="Sign-up"
        value={step}
        onStepClick={setStep}
        steps={[
          { value: "account", label: "Account", description: "Email & password" },
          { value: "details", label: "Details", description: "Company info" },
          { value: "channels", label: "Channels", description: "LINE, Facebook" },
          { value: "done", label: "Done" },
        ]}
      />
    </div>
  )
}
