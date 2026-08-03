// src/lib/shopify.ts
import Client from 'shopify-buy';

// Initialize the client using the secure environment variables
export const shopifyClient = Client.buildClient({
  domain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN,
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN,

});

