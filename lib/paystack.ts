import axios from "axios";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_API_URL = "https://api.paystack.co";

export async function initializePaystackTransaction({ email, amount, callback_url, metadata }: { email: string; amount: number; callback_url: string; metadata?: Record<string, any>; }) {
  try {
    const response = await axios.post(
      `${PAYSTACK_API_URL}/transaction/initialize`,
      {
        email,
        amount, // amount in kobo
        callback_url,
        metadata,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Paystack initialization error:", error?.response?.data || error);
    throw new Error("Failed to initialize Paystack transaction");
  }
}
