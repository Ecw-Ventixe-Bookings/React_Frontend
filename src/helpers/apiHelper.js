const getEnvVar = (key) => {
    // import api urls, priority: runtime config (public/env.js) > Vite env (./config.env)
  return ( import.meta.env[key] || window._env_?.[key] )
}

export const apiBaseUrls = {
  eventService: getEnvVar("VITE_API_EVENTSERVICE"),
  bookingService: getEnvVar("VITE_API_BOOKINGSERVICE"),
  authService: getEnvVar("VITE_API_AUTHSERVICE"),
  
  CreateAccount: getEnvVar("VITE_API_CREATEACCOUNT"),
  VerifyEmail: getEnvVar("VITE_API_VERIFYEMAIL"),
  Login: getEnvVar("VITE_API_LOGIN"),
  Logout: getEnvVar("VITE_API_LOGOUT"),
}
