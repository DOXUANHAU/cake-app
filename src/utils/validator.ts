import { LoginPayload, RegisterPayload } from "@/types";
import { LoginErrors, RegisterErrors } from "@/types/error.types";

// Validate email and password for login
export function validate(data: LoginPayload): LoginErrors {
  const newErrors: LoginErrors = {};

  const config = {
    required: true,
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/,
  };

  // setup bypass if email is not required
  if (config.required && !data.email) {
    newErrors.email = "Email is required";
  }

  if (config.regex && data.email && !config.regex.test(data.email)) {
    newErrors.email = "Invalid email format";
  }
  if (!data.password) {
    newErrors.password = "Password is required";
    return newErrors;
  }
  if (data.password.length < 8)
    newErrors.password = "Password must be at least 8 characters";
  if (!/[A-Z]/.test(data.password))
    newErrors.password = "Password must contain at least one uppercase letter";
  if (!/[0-9]/.test(data.password))
    newErrors.password = "Password must contain at least one number";
  return newErrors;
}

// Validate registration data
export function validateRegister(data: RegisterPayload): RegisterErrors {
  const newErrors: RegisterErrors = {};
  const config = {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/,
  };
  // Validate name
  if (!data.name) newErrors.name = "Name is required";
  // Validate email
  if (!data.email) newErrors.email = "Email is required";
  else if (config.regex && data.email && !config.regex.test(data.email))
    newErrors.email = "Invalid email format";
  // Validate password
  if (!data.password) newErrors.password = "Password is required";
  else if (data.password.length < 8)
    newErrors.password = "Password must be at least 8 characters";
  else if (!/[A-Z]/.test(data.password))
    newErrors.password = "Password must contain at least one uppercase letter";
  else if (!/[0-9]/.test(data.password))
    newErrors.password = "Password must contain at least one number";
  // Validate confirm password
  if (!data.confirmPassword)
    newErrors.confirmPassword = "Confirm your password";
  else if (data.confirmPassword !== data.password)
    newErrors.confirmPassword = "Passwords do not match";
  return newErrors;
}
