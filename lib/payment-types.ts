export type PaymentChannel = "stripe" | "paypal";

export type BillingCycle = "monthly" | "yearly";

export type PayPalIntent = "capture" | "subscription";

export type PaymentPlanCode = "pro_monthly" | "pro_yearly";

export type BillingApiError = {
  code: string;
  message: string;
  details?: unknown;
};

export type PaymentCreateRequest = {
  channel: PaymentChannel;
  planCode?: PaymentPlanCode;
  type?: string;
  project?: string;
  googleUserId?: string;
  billingCycle?: BillingCycle;
  paypalIntent?: PayPalIntent;
};

export type PaymentCreateResponse = {
  ok: true;
  data: {
    channel: PaymentChannel;
    checkoutUrl?: string;
    orderId?: string;
    subscriptionId?: string;
    approvalUrl?: string;
  };
};

export type PaymentVerifyRequest = {
  channel: PaymentChannel;
  sessionId?: string;
  orderId?: string;
  subscriptionId?: string;
  payerId?: string;
  paypalIntent?: PayPalIntent;
};

export type PaymentVerifyResponse = {
  ok: true;
  data: {
    paymentStatus: "paid" | "pending" | "failed";
    rawStatus?: string;
  };
};

export type BillingApiErrorResponse = {
  ok: false;
  error: BillingApiError;
};

export type BillingApiSuccessResponse<T> = {
  ok: true;
  data: T;
};

export type BillingApiResponse<T> =
  | BillingApiSuccessResponse<T>
  | BillingApiErrorResponse;
