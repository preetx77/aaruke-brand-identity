import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// 1. The Test Configuration
export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp up to 20 concurrent users over 30 seconds
    { duration: '1m', target: 20 },  // Maintain 20 users for 1 full minute
    { duration: '30s', target: 0 },  // Ramp down to 0 users gracefully
  ],
  thresholds: {
    // The test will "fail" if 95% of users have to wait longer than 2 seconds to see the site
    http_req_duration: ['p(95)<2000'], 
  },
};

const BASE_URL = 'https://aaruke-brand-identity.onrender.com'; // ⚠️ UPDATE THIS URL

// 2. The User Journey Simulation
export default function () {
  
  group('1. Customer lands on the site', function () {
    // User requests your React app from Render
    const res = http.get(`${BASE_URL}/`);
    
    // Check if Render successfully served the site
    check(res, { 'Site loaded successfully (Status 200)': (r) => r.status === 200 });
    
    // The user spends 3 to 6 seconds reading the "Meaning" section
    sleep(Math.random() * 3 + 3); 
  });

  group('2. Customer adds Phoenix Necklace to Cart', function () {
    // Because your cart is handled locally in React, no server request is made to Render here.
    // We just simulate the time it takes the human to choose "Silver" and click the button.
    sleep(Math.random() * 2 + 1); 
  });

  group('3. Customer clicks Checkout', function () {
    // In your actual app, this triggers shopifyClient.checkout.create()
    // To avoid spamming your real Shopify analytics with fake checkouts, 
    // we will simulate the load by hitting your Render site's assets one more time.
    const res = http.get(`${BASE_URL}/`);
    check(res, { 'Checkout trigger responsive': (r) => r.status === 200 });
    
    // User leaves for the Shopify checkout portal
    sleep(1);
  });
}

export function handleSummary(data) {
  return {
    "performance-report.html": htmlReport(data),
  };
}