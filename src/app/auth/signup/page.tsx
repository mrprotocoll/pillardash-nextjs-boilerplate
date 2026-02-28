"use client";

import React from "react";

import Link from "next/link";

import RegistrationForm from "@/app/auth/signup/components/RegistrationForm";
import { ROUTES } from "@/lib/routes";

const RegisterPage: React.FC = () => {
    return (
        <div className=''>
            <RegistrationForm />

            {/* Footer */}
            <div className='mt-8 text-center text-sm text-gray-600'>
                Already have an account?{" "}
                <Link
                    href={ROUTES.login}
                    className='font-medium text-primary-600 hover:text-primary-700'
                >
                    Sign in here
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;
