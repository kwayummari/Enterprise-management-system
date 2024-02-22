// validators.tsx

// Function to validate user login data
export const validateLoginData = (data: { username: string; password: string }) => {
  if (!data.username || !data.password) {
    throw new Error('Username and password are required');
  }


  return true;
};

// Function to validate user registration data
export const validateRegistrationData = (data: { username: string; email: string; password: string; phoneNumber?: string }) => {
  if (!data.username || !data.email || !data.password) {
    throw new Error('Username, email, and password are required');
  }

  if (data.username.length < 4 || data.username.length > 15) {
    throw new Error('Username must be between 4 and 15 characters long');
  }

  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
    throw new Error('Invalid email address');
  }

  if (!/^(07|06)\d{8}$/.test(data.phoneNumber || '')) {
    throw new Error('Invalid phone number. Phone number should start with 07 or 06 and have 10 digits.');
  }

  // You can add more specific validations here, such as checking for valid email format, password strength, etc.

  return true;
};
