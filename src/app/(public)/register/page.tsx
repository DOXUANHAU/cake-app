"use client";

import { useState } from "react";
import Link from "next/link";
import { validateRegister } from "@/utils/validator";
import { RegisterErrors } from "@/types/error.types";
export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<RegisterErrors>({});
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

   

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const newForm = { ...form, [name]: value };
        setForm(newForm);

        // 🔥 real-time validation
        setErrors(validateRegister(newForm));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateRegister(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        console.log("Register success:", form);
        // TODO: call API register
    };

    const isInvalid = Object.keys(errors).length > 0;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    Register
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full name"
                            value={form.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-2 border rounded-lg 
                                ${
                                    errors.name && touched.name
                                        ? "border-red-500"
                                        : "focus:ring-blue-500"
                                }`}
                        />
                        {errors.name && touched.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-2 border rounded-lg 
                                ${
                                    errors.email && touched.email
                                        ? "border-red-500"
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
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-2 border rounded-lg 
                                ${
                                    errors.password && touched.password
                                        ? "border-red-500"
                                        : "focus:ring-blue-500"
                                }`}
                        />
                        {errors.password && touched.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-2 border rounded-lg 
                                ${
                                    errors.confirmPassword &&
                                    touched.confirmPassword
                                        ? "border-red-500"
                                        : "focus:ring-blue-500"
                                }`}
                        />
                        {errors.confirmPassword &&
                            touched.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword}
                                </p>
                            )}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={isInvalid}
                        className={`w-full py-2 rounded-lg text-white transition
                            ${
                                isInvalid
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                            }`}
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <span className="text-blue-600 cursor-pointer">
                        <Link href="/login">
                            Login
                        </Link>
                    </span>
                </p>
            </div>
        </div>
    );
}