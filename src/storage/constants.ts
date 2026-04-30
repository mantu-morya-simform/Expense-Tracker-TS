export const bankOptions = [
  { value: "All__Bank", label: "All Bank" },
  { value: "HDFC__Bank", label: "HDFC Bank" },
  { value: "SBI", label: "SBI" },
  { value: "ICICI__Bank", label: "ICICI Bank" },
  { value: "AXIS__Bank", label: "AXIS Bank" },
  { value: "Paytm", label: "Paytm" },
  { value: "GPay", label: "GPay" },
  { value: "Cash", label: "Cash" },
  { value: "Other", label: "Other" },
];

export const ErrorMessages = {
  FORM_NOT_FOUND: "Form elements not found",
  DESCRIPTION_REQUIRED: "Description not defined",
  AMOUNT_REQUIRED: "Amount not defined",
  INVALID_AMOUNT: "Provide correct amount",
} as const;

export const SuccessMessages = {
  DATA_SAVED: "Data saved successfully",
} as const;
