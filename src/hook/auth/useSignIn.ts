"use client";

import { useState } from "react";
import { validate } from "@/utils/validator";
import { LoginErrors } from "@/types/error.types";
import { LoginPayload } from "@/types";
import { authClientService } from "@/lib/service/authClientService";
import { sileo } from "sileo";
import { useRouter } from "next/navigation";

type TouchedFields = {
  email: boolean;
  password: boolean;
};
export const useSignIn = () => {
  const router = useRouter();

  // state for form data, errors, touched fields, and loading status
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<LoginPayload>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    email: false,
    password: false,
  });

  // handle input changes and validate in real-time
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof LoginPayload;
    const newForm = { ...form, [fieldName]: value };
    setForm(newForm);
    //  real-time validation
    setErrors(validate(newForm));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const fieldName = name as keyof TouchedFields;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    // validate on blur as well
    setErrors(validate(form));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setTouched((prev) => ({
      email: true,
      password: true,
    }));

    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      // call login API here with form data
      await authClientService.login(form);
      // await authClientService.login(form);
      sileo.success({
        title: "Login successful!",
        description: "You can now access your account.",
      });

      router.push("/home");
    } catch (error) {
      // handle login error (e.g., show error message)
      sileo.error({
        title: "Login failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during login",
      });
    } finally {
      // set 5 second timeout to reset loading state
      setLoading(false);
    }
  };

  return {
    loading,
    form,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
