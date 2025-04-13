// Collection of response generator functions for different portals

// Placeholder response for both portals
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

// Simulates an API call for student portal
export const studentResponseGenerator = () => {
  // This would be replaced with an actual fetch call to your backend API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(loremIpsum);
    }, 1000);
  });
};

// Simulates an API call for staff portal
export const staffResponseGenerator = () => {
  // Staff responses could be different or have different parameters
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(loremIpsum + "\n\nAdditional staff-specific information here.");
    }, 1000);
  });
};

// In the future, these could be connected to different API endpoints
// or have different parameters based on portal type 