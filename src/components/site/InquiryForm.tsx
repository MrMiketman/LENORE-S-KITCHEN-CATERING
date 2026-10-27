import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business } from "@/content/site";
import { cn } from "@/lib/utils";
import { useServerFn } from "@tanstack/react-start";
import { submitInquiry } from "@/lib/inquiries.functions";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "number" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  full?: boolean;
};

const emailSchema = z.string().trim().email().max(255);
const phoneSchema = z.string().trim().regex(/^[0-9()+\-.\s]{7,20}$/);

export function validateFields(fields: FieldDef[], values: Record<string, string>) {
  const errors: Record<string, string> = {};
  for (const f of fields) {
    const v = (values[f.name] ?? "").trim();
    if (f.required && !v) errors[f.name] = `${f.label} is required.`;
    else if (v && f.type === "email" && !emailSchema.safeParse(v).success) errors[f.name] = "Enter a valid email address.";
    else if (v && f.type === "tel" && !phoneSchema.safeParse(v).success) errors[f.name] = "Enter a valid phone number.";
    else if (v && f.type === "number" && !(Number(v) > 0)) errors[f.name] = "Enter a number greater than zero.";
    else if (v.length > 2000) errors[f.name] = "Please keep this under 2000 characters.";
  }
  return errors;
}

const inputCls =
  "w-full rounded-none border-0 border-b border-input bg-transparent px-0 py-3 text-base text-ink placeholder:text-muted-foreground focus:border-ink focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-destructive";

/**
 * Validated inquiry form. Submissions are saved and emailed to the business.
 */
export function InquiryForm({ fields, submitLabel, form }: { fields: FieldDef[]; submitLabel: string; form: "Contact" | "Catering" }) {
  const send = useServerFn(submitInquiry);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "checking" | "sent" | "failed">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const values = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const errs = validateFields(fields, values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus("idle");
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }
    setStatus("checking");
    try {
      const rows = fields.map((f) => ({ label: f.label, value: (values[f.name] ?? "").trim() }));
      const res = await send({ data: { form, rows } });
      if (res.ok) {
        setStatus("sent");
        formEl.reset();
      } else setStatus("failed");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-x-8 gap-y-7 md:grid-cols-2">
      <p className="text-sm text-muted-foreground md:col-span-2">Fields marked * are required.</p>
      {fields.map((f) => {
        const id = `f-${f.name}`;
        const err = errors[f.name];
        const common = {
          id,
          name: f.name,
          "aria-invalid": !!err,
          "aria-describedby": err ? `${id}-err` : undefined,
          "aria-required": f.required,
          className: inputCls,
        };
        return (
          <div key={f.name} className={cn(f.full && "md:col-span-2")}>
            <label htmlFor={id} className="eyebrow text-muted-foreground">
              {f.label}{f.required && " *"}
            </label>
            {f.type === "textarea" ? (
              <textarea rows={4} maxLength={2000} {...common} />
            ) : f.type === "select" ? (
              <select defaultValue="" {...common}>
                <option value="">Select…</option>
                {f.options?.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : (
              <input type={f.type ?? "text"} min={f.type === "number" ? 1 : undefined} {...common} />
            )}
            {err && <p id={`${id}-err`} className="mt-2 text-sm text-destructive">{err}</p>}
          </div>
        );
      })}
      <p className="text-xs leading-relaxed text-muted-foreground md:col-span-2">
        Privacy: the details you enter are used only to respond to your inquiry and are not shared or sold.
      </p>
      <div className="md:col-span-2">
        <Button type="submit" variant="editorial" size="xl" disabled={status === "checking"}>
          {status === "checking" && <Loader2 className="animate-spin" />} {submitLabel}
        </Button>
      </div>
      <div aria-live="polite" className="md:col-span-2">
        {status === "sent" && (
          <div role="status" className="border-l-2 border-gold bg-paper px-6 py-5 text-sm leading-relaxed">
            <p className="font-medium">Thank you — your inquiry was received.</p>
            <p className="mt-1">We’ll be in touch soon. For anything urgent, call{" "}
              <a href={business.phoneHref} className="font-medium underline underline-offset-4">{business.phoneDisplay}</a>.</p>
          </div>
        )}
        {status === "failed" && (
          <div role="alert" className="border-l-2 border-destructive bg-paper px-6 py-5 text-sm leading-relaxed">
            <p className="font-medium">Your message was not sent.</p>
            <p className="mt-1">Something went wrong. Please try again or call us at{" "}
              <a href={business.phoneHref} className="font-medium underline underline-offset-4">{business.phoneDisplay}</a>.</p>
          </div>
        )}
      </div>
    </form>
  );
}
