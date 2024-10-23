import * as msal from "@azure/msal-browser";

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID",
    authority: `https://login.microsoftonline.com/YOUR_TENANT_ID`,
    redirectUri: "http://localhost:3000", // or your app's actual URL
  },
};

// Create MSAL instance
const msalInstance = new msal.PublicClientApplication(msalConfig);

// Initialize MSAL and ensure that it's awaited before making any API calls
export const initializeMsal = async () => {
  await msalInstance.initialize(); // Make sure MSAL is initialized before use
};

// Login function
export const login = async () => {
  await initializeMsal(); // Ensure initialization
  const loginRequest = {
    scopes: ["Sites.Read.All"], // Add any required scopes
  };

  try {
    const loginResponse = await msalInstance.loginPopup(loginRequest);
    return loginResponse.account;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
