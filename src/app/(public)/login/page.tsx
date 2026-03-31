"use client";

import { useState } from "react";
import { validate } from "@/utils/validator";
import { LoginErrors } from "@/types/error.types";
import { LoginPayload } from "@/types";
import Link from "next/link";

export default function LoginPage() {
    const [form, setForm] = useState<LoginPayload>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<LoginErrors>({});
    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });

  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const newForm = { ...form, [name]: value };
        setForm(newForm);

        //  real-time validation
        setErrors(validate(newForm));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validate(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        console.log("Login success:", form);
        // TODO: call API
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                                ${
                                    errors.email && touched.email
                                        ? "border-red-500 focus:ring-red-500"
                                        : "focus:ring-blue-500"
                                }`}
                        />
                        {errors.email && touched.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                                ${
                                    errors.password && touched.password
                                        ? "border-red-500 focus:ring-red-500"
                                        : "focus:ring-blue-500"
                                }`}
                        />
                        {errors.password && touched.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={Object.keys(errors).length > 0}
                        className={`w-full py-2 rounded-lg text-white transition
                            ${
                                Object.keys(errors).length > 0
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        Sign In
                    </button>
                </form>
               {/* don't have an account? */}
               <p className="text-sm text-center mt-4">
                    Don't have an account?{" "}
                    <span className="text-blue-600 cursor-pointer">
                        <Link href="/register">
                            Register
                        </Link>
                    </span>
                </p>
            </div>
        </div>
    );
}