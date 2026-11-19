"use client"

import { useState } from "react"
import { CheckCircle2, ShieldCheck } from "lucide-react"

import { Button } from "@/registry/mintel/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/mintel/ui/card"
import { Input } from "@/registry/mintel/ui/input"
import { Label } from "@/registry/mintel/ui/label"
import { OtpInput } from "@/registry/mintel/ui/otp-input"
import { Stepper } from "@/registry/mintel/ui/stepper"
import { ThaiAddressPicker, type ThaiAddressNames, type ThaiAddressValue } from "@/registry/mintel/ui/thai-address"
import { ThaiIdInput } from "@/registry/mintel/ui/thai-id-input"
import { ThaiPhoneInput } from "@/registry/mintel/ui/thai-phone-input"

const STEPS = [
  { value: "account", label: "Account", description: "Name & email" },
  { value: "identity", label: "Identity", description: "Citizen ID" },
  { value: "phone", label: "Phone", description: "Verify by SMS" },
  { value: "address", label: "Address", description: "Where we deliver" },
]

// Replace with your own SMS / OTP service. The demo accepts 123456.
const DEMO_CODE = "123456"

export default function RegisterPage() {
  const [step, setStep] = useState("account")
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", id: "", idValid: false, phone: "", phoneValid: false })
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpState, setOtpState] = useState<"idle" | "ok" | "wrong">("idle")
  const [address, setAddress] = useState<{ value: ThaiAddressValue; names: ThaiAddressNames }>({ value: {}, names: {} })
  const [detail, setDetail] = useState("")

  const index = STEPS.findIndex((s) => s.value === step)
  const canNext = {
    account: form.name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(form.email),
    identity: form.idValid,
    phone: otpState === "ok",
    address: Boolean(address.value.subDistrictId) && detail.trim().length > 2,
  }[step]

  const next = () => (index === STEPS.length - 1 ? setDone(true) : setStep(STEPS[index + 1].value))

  if (done) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-grouped p-4">
        <Card className="w-full max-w-md text-center motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95">
          <CardHeader className="justify-items-center">
            <CheckCircle2 className="size-12 text-success motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:duration-700 motion-safe:ease-spring-bouncy" />
            <CardTitle className="text-xl">Welcome, {form.name.split(" ")[0]}!</CardTitle>
            <CardDescription>Your account is ready.</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-2 rounded-xl bg-muted/60 p-4 text-left text-sm">
              {[
                ["Email", form.email],
                ["Phone", form.phone.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3")],
                ["Address", [detail, address.names.subDistrict, address.names.district, address.names.province, address.names.zip].filter(Boolean).join(", ")],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[5rem_1fr] gap-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="flex min-h-svh items-start justify-center bg-grouped px-4 py-10 sm:items-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>Takes about two minutes. We use this to verify you and deliver your orders.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <Stepper variant="steps" steps={STEPS} value={step} aria-label="Sign-up progress" />

          <div key={step} className="grid gap-4 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-right-2 motion-safe:duration-300">
            {step === "account" && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="reg-name">Full name</Label>
                  <Input id="reg-name" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Somchai Kittisak" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input id="reg-email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@company.com" />
                </div>
              </>
            )}

            {step === "identity" && (
              <div className="grid gap-2">
                <Label htmlFor="reg-id">Thai citizen ID</Label>
                <ThaiIdInput id="reg-id" locale="en" value={form.id} onValueChange={(id, valid) => setForm({ ...form, id, idValid: valid })} />
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="size-3.5" /> Checked on your device; try 1101700230708.
                </p>
              </div>
            )}

            {step === "phone" && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="reg-phone">Mobile number</Label>
                  <div className="flex gap-2">
                    <ThaiPhoneInput
                      id="reg-phone"
                      className="flex-1"
                      value={form.phone}
                      onValueChange={(phone, { valid }) => {
                        setForm({ ...form, phone, phoneValid: valid })
                        setOtpSent(false)
                        setOtp("")
                        setOtpState("idle")
                      }}
                    />
                    <Button variant="outline" disabled={!form.phoneValid || otpSent} onClick={() => setOtpSent(true)}>
                      {otpSent ? "Sent" : "Send code"}
                    </Button>
                  </div>
                </div>
                {otpSent && (
                  <div className="grid justify-items-start gap-2 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1">
                    <Label>Enter the 6-digit code (demo: {DEMO_CODE})</Label>
                    <OtpInput
                      value={otp}
                      autoFocus
                      onValueChange={(v) => {
                        setOtp(v)
                        setOtpState("idle")
                      }}
                      onComplete={(v) => setOtpState(v === DEMO_CODE ? "ok" : "wrong")}
                      invalid={otpState === "wrong"}
                      aria-label="Verification code"
                    />
                    <p role="status" className="h-5 text-sm">
                      {otpState === "ok" && <span className="text-success">Phone verified</span>}
                      {otpState === "wrong" && <span className="text-destructive">That code is not right</span>}
                    </p>
                  </div>
                )}
              </>
            )}

            {step === "address" && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="reg-detail">House no., building, street</Label>
                  <Input id="reg-detail" autoComplete="address-line1" value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="99/1 Sukhumvit Rd." />
                </div>
                <ThaiAddressPicker
                  locale="en"
                  idPrefix="reg-address"
                  value={address.value}
                  onValueChange={(value, names) => setAddress({ value, names })}
                />
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-between gap-2">
          <Button variant="ghost" disabled={index === 0} onClick={() => setStep(STEPS[Math.max(0, index - 1)].value)}>
            Back
          </Button>
          <Button variant="brand" disabled={!canNext} onClick={next}>
            {index === STEPS.length - 1 ? "Create account" : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
