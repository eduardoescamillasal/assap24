import * as msal from "@azure/msal-browser";


const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID",
    authority: `https://login.microsoftonline.com/YOUR_TENANT_ID`,
    redirectUri: "http://localhost:3000", // or your app's actual URL
  },
};


const msalInstance = new msal.PublicClientApplication(msalConfig);

export const initializeMsal = async () => {
  await msalInstance.initialize();
};

// Login function
export const login = async () => {
  await initializeMsal(); 
  const loginRequest = {
    scopes: ["Sites.Read.All"], 
  };

  try {
    const loginResponse = await msalInstance.loginPopup(loginRequest);
    return loginResponse.account;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
