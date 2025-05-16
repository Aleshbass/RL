// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity";
import { client } from "./client";

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_API_TOKEN");
}

// Use a type assertion to bypass version compatibility issues between Sanity client types
export const { sanityFetch, SanityLive } = defineLive({
  // @ts-ignore: Ignoring client type compatibility issues between versions
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 0,
  },
});

