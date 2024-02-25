export const validateLoginData = (data: { email: string; password: string }) => {
  if (!data.email || !data.password) {
    throw new Error('Email and password are required');
  }
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
    throw new Error('Invalid email address');
  }
  if (data.password.length < 4 || data.password.length > 15) {
    throw new Error('Password must be between 4 and 15 characters long');
  }


  return true;
};


export const validateRegistrationData = (data: { fullname: string; email: string; password: string; phone?: string }) => {
  if (!data.fullname || !data.email || !data.password || !data.phone) {
    throw new Error('fullname, email, and password are required');
  }

  if (data.fullname.length < 4 || data.fullname.length > 15) {
    throw new Error('Username must be between 4 and 15 characters long');
  }

  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
    throw new Error('Invalid email address');
  }

  if (!/^(07|06)\d{8}$/.test(data.phone || '')) {
    throw new Error('Invalid phone number. Phone number should start with 07 or 06 and have 10 digits.');
  }

  return true;
};
