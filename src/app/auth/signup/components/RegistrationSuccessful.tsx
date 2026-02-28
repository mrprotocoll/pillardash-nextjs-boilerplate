import React from "react";

import Link from "next/link";

import { ArrowRight, CheckCircle } from "lucide-react";

import { ROUTES } from "@/lib/routes";

const RegistrationSuccessful = ({ name = "John Doe", email = "john.doe@example.com" }) => {
    return (
        <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4'>
            <div className='w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl md:p-12'>
                {/* Success Icon */}
                <div className='mb-6'>
                    <div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100'>
                        <CheckCircle className='h-12 w-12 text-green-500' />
                    </div>
                    <h1 className='mb-2 text-2xl font-bold text-gray-800 md:text-3xl'>
                        Registration Successful!
                    </h1>
                    <p className='text-sm text-gray-600 md:text-base'>
                        Welcome to our consultant network
                    </p>
                </div>

                {/* Success Details */}
                <div className='mb-6 rounded-xl bg-primary-50 p-6'>
                    <h2 className='mb-3 font-semibold text-primary-800'>Account Created For:</h2>
                    <div className='space-y-2 text-sm'>
                        <p className='text-gray-700'>
                            <span className='font-medium'>Name:</span> {name}
                        </p>
                        <p className='text-gray-700'>
                            <span className='font-medium'>Email:</span> {email}
                        </p>
                    </div>
                </div>

                {/* Next Steps */}
                <div className='mb-8'>
                    <h3 className='mb-3 font-semibold text-gray-800'>What&#39;s Next?</h3>
                    <div className='space-y-2 text-left text-sm text-gray-600'>
                        {/*<div className="flex items-center">*/}
                        {/*    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>*/}
                        {/*    <span>Check your email for verification</span>*/}
                        {/*</div>*/}
                        {/*<div className="flex items-center">*/}
                        {/*    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>*/}
                        {/*    <span>Complete your profile setup</span>*/}
                        {/*</div>*/}
                        <div className='flex items-center'>
                            <div className='mr-3 h-2 w-2 rounded-full bg-primary-500'></div>
                            <span>Start connecting with clients</span>
                        </div>
                        <div className='flex items-center'>
                            <div className='mr-3 h-2 w-2 rounded-full bg-primary-500'></div>
                            <span>We will notify you immediately your portal is ready</span>
                        </div>
                    </div>
                </div>

                {/* Continue Button */}
                <Link
                    href={ROUTES.home}
                    className='group flex w-full items-center justify-center rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-primary-600'
                >
                    Continue to Dashboard
                    <ArrowRight className='ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1' />
                </Link>
            </div>
        </div>
    );
};

export default RegistrationSuccessful;
