import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const INQUIRY_RECIPIENTS = ["miketman@comcast.net", "lenoreskitchen@gmail.com"] as const;

const schema = z.object({
  form: z.enum(["Contact", "Catering"]),
  rows: z
    .array(z.object({ label: z.string().trim().max(100), value: z.string().trim().max(2000) }))
    .min(1)
    .max(30),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const fields = Object.fromEntries(data.rows.map((r) => [r.label, r.value]));
    const { data: row, error } = await supabaseAdmin
      .from("inquiries")
      .insert({ form: data.form, fields })
      .select("id")
      .single();
    if (error || !row) {
      console.error("inquiry insert failed", error);
      return { ok: false as const };
    }
    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
    for (const to of INQUIRY_RECIPIENTS) {
      try {
        await sendTemplateEmail("inquiry-alert", to, {
          templateData: { form: data.form, rows: data.rows },
          idempotencyKey: `inquiry-alert-${row.id}-${to}`,
        });
      } catch (e) {
        console.error("inquiry alert email failed", to, e);
      }
    }
    return { ok: true as const };
  });
