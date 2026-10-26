import { describe, expect, it } from "vitest";
import { validateFields, type FieldDef } from "@/components/site/InquiryForm";

const fields: FieldDef[] = [
  { name: "name", label: "Full name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "guests", label: "Guests", type: "number", required: true },
];

describe("inquiry validation", () => {
  it("requires required fields", () => {
    expect(Object.keys(validateFields(fields, {}))).toEqual(["name", "email", "phone", "guests"]);
  });
  it("rejects a bad email", () => {
    expect(validateFields(fields, { name: "A", email: "nope", phone: "773-633-7999", guests: "50" }).email).toBeDefined();
  });
  it("accepts a complete inquiry", () => {
    expect(validateFields(fields, { name: "A", email: "a@b.co", phone: "773-633-7999", guests: "50" })).toEqual({});
  });
});
