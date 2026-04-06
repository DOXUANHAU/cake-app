"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClientService } from "@/lib/service/authClientService";
import { RegisterUserDto } from "@/dto/register/users";
import { RegisterErrors } from "@/types/error.types";
import { validateRegister } from "@/utils/validator";
import { sileo } from "sileo";
// import lib to call api for register

type TouchedFields = {
  name: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
};

export const useRegister = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [form, setForm] = useState<RegisterUserDto>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof RegisterUserDto;
    const newForm = { ...form, [fieldName]: value };
    setForm(newForm);
    setErrors(validateRegister(newForm));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const fieldName = name as keyof TouchedFields;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    setErrors(validateRegister(form));
  };

  const register = async () => {
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    const validationErrors = validateRegister(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      await authClientService.register(form);
      sileo.success({
        title: "Registration successful!",
        description: "You can now log in.",
      });
      router.push("/login?registered=true");
    } catch (e) {
      sileo.error({
        title: "Registration failed!",
        description:
          e instanceof Error ? e.message : "An unknown error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    errors,
    form,
    touched,
    handleChange,
    handleBlur,
  };
};
