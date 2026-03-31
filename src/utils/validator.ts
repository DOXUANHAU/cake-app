import { LoginPayload, RegisterPayload } from "@/types";
import { LoginErrors, RegisterErrors  } from "@/types/error.types"


// Validate email and password for login
 export function validate(data:LoginPayload): LoginErrors {
        const newErrors: LoginErrors = {};
    if (!data.email) return { email: "Email is required" };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return { email: "Invalid email format" };


    if (!data.password) return { password: "Password is required" };
    if (data.password.length < 8) return { password: "Password must be at least 8 characters" };
    if (!/[A-Z]/.test(data.password)) return { password: "Password must contain at least one uppercase letter" };
    if (!/[0-9]/.test(data.password)) return { password: "Password must contain at least one number" };
        return newErrors;
    };


// Validate registration data
export function validateRegister(data: RegisterPayload): RegisterErrors {
    const newErrors: RegisterErrors = {};
    if (!data.name) newErrors.name = "Name is required";
    if (!data.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        newErrors.email = "Invalid email format";

    if (!data.password) newErrors.password = "Password is required";
    else if (data.password.length < 8)
        newErrors.password = "Password must be at least 8 characters";
    else if (!/[A-Z]/.test(data.password))
        newErrors.password = "Password must contain at least one uppercase letter";
    else if (!/[0-9]/.test(data.password))
        newErrors.password = "Password must contain at least one number";

    if (!data.confirmPassword)
        newErrors.confirmPassword = "Confirm your password";
    else if (data.confirmPassword !== data.password)
        newErrors.confirmPassword = "Passwords do not match";   
    return newErrors;
}

export function validateName(name: string): string | null {
  if (name.trim().length < 2) return 'Tên phải có ít nhất 2 ký tự'
  return null
}   