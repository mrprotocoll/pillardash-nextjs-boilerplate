"use client";

import React, { useState } from "react";

import Link from "next/link";

import {
    ChevronDown,
    Code,
    Component,
    ExternalLink,
    FolderGit2,
    GitBranch,
    Palette,
    Shield,
    Zap,
} from "lucide-react";

import useOnMountUnsafe from "@/hooks/useOnMountUnsafe";
import CONSTANTS from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

export const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
};

const floatingElements = Array.from({ length: 20 }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${3 + Math.random() * 4}s`,
}));

const HomePage = () => {
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScrollToNext = () => {
        smoothScrollTo("features");
    };

    useOnMountUnsafe(() => {
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height =
                document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setScrollProgress((winScroll / height) * 100);
            setScrollY(winScroll);
        };
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowDown") {
                handleScrollToNext();
            }
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("keydown", handleScrollToNext);
        };
    });

    const features = [
        {
            icon: <Zap className='h-8 w-8' />,
            title: "Next.js 16",
            description:
                "Latest version with App Router, Server Components, and enhanced performance optimizations out of the box.",
            gradient: "from-blue-500 to-cyan-500",
            bgGradient: "from-blue-50 to-cyan-50",
        },
        {
            icon: <Code className='h-8 w-8' />,
            title: "TypeScript",
            description:
                "Full TypeScript support with strict type checking for better code quality and developer experience.",
            gradient: "from-purple-500 to-violet-500",
            bgGradient: "from-purple-50 to-violet-50",
        },
        {
            icon: <Palette className='h-8 w-8' />,
            title: "Tailwind CSS",
            description:
                "Utility-first CSS framework integrated and configured for rapid UI development.",
            gradient: "from-emerald-500 to-teal-500",
            bgGradient: "from-emerald-50 to-teal-50",
        },
        {
            icon: <Shield className='h-8 w-8' />,
            title: "Code Quality",
            description:
                "Pre-configured Prettier and ESLint for consistent code formatting and quality standards.",
            gradient: "from-orange-500 to-red-500",
            bgGradient: "from-orange-50 to-red-50",
        },
        {
            icon: <GitBranch className='h-8 w-8' />,
            title: "Git Hooks",
            description:
                "Husky and Commit Lint ensure consistent commit messages and code quality checks.",
            gradient: "from-pink-500 to-rose-500",
            bgGradient: "from-pink-50 to-rose-50",
        },
        {
            icon: <Component className='h-8 w-8' />,
            title: "Components",
            description: "Reusable components library including buttons, inputs, tables, and more.",
            gradient: "from-indigo-500 to-purple-500",
            bgGradient: "from-indigo-50 to-purple-50",
            comingSoon: true,
        },
    ];

    const steps = [
        {
            number: "01",
            title: "Clone Repository",
            code: "git clone git@github.com:mrprotocoll/pillardash-nextjs-15-boilerplate.git",
            description: "Get the latest version of the boilerplate",
        },
        {
            number: "02",
            title: "Install Dependencies",
            code: "npm install && npm run dev",
            description: "Install packages and start development server",
        },
        {
            number: "03",
            title: "Start Building",
            code: "localhost:3000",
            description: "Your app is ready at localhost:3000",
        },
    ];

    return (
        <div className='min-h-screen overflow-hidden bg-slate-950 text-white'>
            <div
                className='fixed left-0 top-0 z-50 h-1 bg-gradient-to-r from-blue-500 to-purple-500'
                style={{ width: `${scrollProgress}%` }}
            />
            {/* Animated Background */}
            <div className='pointer-events-none fixed inset-0 overflow-hidden'>
                <div
                    className='absolute inset-0 opacity-30'
                    style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
                    }}
                />
                <div className='absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20' />

                {/* Floating Elements */}
                {floatingElements.map((style, i) => (
                    <div
                        key={i}
                        className='absolute h-2 w-2 animate-pulse rounded-full bg-white/10'
                        style={style}
                    />
                ))}
            </div>

            {/* Navigation */}
            <nav
                className={`fixed top-0 z-50 w-full transition-all duration-500 ${
                    scrollY > 50 ? "border-b border-white/10 bg-slate-950/80 backdrop-blur-xl" : ""
                }`}
            >
                <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                    <div className='flex h-16 items-center justify-between'>
                        <div className='flex items-center space-x-3'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25'>
                                <span className='text-lg font-bold text-white'>
                                    {CONSTANTS.appName}
                                </span>
                            </div>
                        </div>

                        <div className='hidden items-center space-x-8 md:flex'>
                            <a
                                href='#features'
                                className='text-slate-300 transition-colors duration-200 hover:text-white'
                            >
                                Features
                            </a>
                            <a
                                href='#getting-started'
                                className='text-slate-300 transition-colors duration-200 hover:text-white'
                            >
                                Get Started
                            </a>
                            <a
                                href='#components'
                                className='text-slate-300 transition-colors duration-200 hover:text-white'
                            >
                                Components
                            </a>
                            <Link
                                href={ROUTES.signup}
                                className='text-slate-300 transition-colors duration-200 hover:text-white'
                            >
                                <span>Auth Page</span>
                            </Link>
                            <Link
                                href={CONSTANTS.socials.github}
                                className='flex items-center space-x-2 rounded-lg border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-sm transition-all duration-200 hover:bg-white/20'
                            >
                                <FolderGit2 className='h-4 w-4' />
                                <span>GitHub</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className='relative flex min-h-screen items-center justify-center px-6'>
                <div className='relative z-10 mx-auto max-w-5xl text-center'>
                    <div
                        className='mb-8'
                        style={{
                            transform: `translateY(${scrollY * 0.1}px)`,
                        }}
                    >
                        <h1 className='mb-6 text-6xl font-black leading-tight md:text-8xl'>
                            <span className='animate-pulse bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                                {CONSTANTS.appName} NextJs
                            </span>
                            <br />
                            <span className='text-white/90'>Boilerplate</span>
                        </h1>

                        <p className='mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-slate-300 md:text-2xl'>
                            The ultimate Next.js 16 starter template with TypeScript, Tailwind CSS,
                            and developer-friendly tooling.
                            <span className='bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text font-semibold text-transparent'>
                                {" "}
                                Build faster, deploy sooner.
                            </span>
                        </p>
                    </div>

                    <div className='mb-16 flex flex-col items-center justify-center gap-6 sm:flex-row'>
                        <Link
                            href={CONSTANTS.socials.github}
                            className='group relative rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25'
                        >
                            <span className='relative z-10 flex items-center space-x-2'>
                                <Zap className='h-5 w-5' />
                                <span>Get Started Now</span>
                            </span>
                            <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                        </Link>

                        <Link
                            href={ROUTES.docs}
                            className='group rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10'
                        >
                            <span className='flex items-center space-x-2'>
                                <ExternalLink className='h-5 w-5' />
                                <span>View Documentation</span>
                            </span>
                        </Link>
                    </div>

                    {/* Code Preview */}
                    <div className='mx-auto max-w-2xl'>
                        <div className='rounded-2xl border border-white/10 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-sm'>
                            <div className='mb-4 flex items-center justify-between'>
                                <div className='flex space-x-2'>
                                    <div className='h-3 w-3 rounded-full bg-red-500'></div>
                                    <div className='h-3 w-3 rounded-full bg-yellow-500'></div>
                                    <div className='h-3 w-3 rounded-full bg-green-500'></div>
                                </div>
                                <span className='text-sm text-slate-400'>Terminal</span>
                            </div>
                            <div className='text-left font-mono'>
                                <div className='mb-1 text-slate-400'>$</div>
                                <div className='mb-2 text-green-400'>
                                    npx create-next-app@latest my-app
                                </div>
                                <div className='mb-2 text-blue-400'>
                                    --template mp-next-boilerplate
                                </div>
                                <div className='text-yellow-400'>✨ Ready to go!</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <button
                    onClick={handleScrollToNext}
                    className='absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce focus:outline-none'
                    aria-label='Scroll to next section'
                >
                    <ChevronDown className='h-6 w-6 text-slate-400 transition-colors duration-200 hover:text-white' />
                </button>
            </section>

            {/* Features Section */}
            <section id='features' className='relative py-32'>
                <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                    <div className='mb-20 text-center'>
                        <h2 className='mb-6 text-5xl font-bold md:text-6xl'>
                            <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                                Everything You Need
                            </span>
                        </h2>
                        <p className='mx-auto max-w-2xl text-xl text-slate-400'>
                            Pre-configured with the best tools and practices for modern web
                            development
                        </p>
                    </div>

                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`group relative cursor-pointer rounded-3xl p-8 transition-all duration-500 hover:scale-105 ${feature.comingSoon ? "border-2 border-dashed border-purple-500/30" : "border border-white/10 bg-white/5 backdrop-blur-sm"} hover:border-white/20 hover:bg-white/10 hover:shadow-2xl`}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                            >
                                {feature.comingSoon && (
                                    <div className='absolute -right-3 -top-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-xs font-bold text-white'>
                                        Coming Soon
                                    </div>
                                )}

                                <div
                                    className={`h-16 w-16 bg-gradient-to-br ${feature.gradient} mb-6 flex items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
                                >
                                    <div className='text-white'>{feature.icon}</div>
                                </div>

                                <h3 className='mb-4 text-2xl font-bold text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent'>
                                    {feature.title}
                                </h3>

                                <p className='leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300'>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Getting Started Section */}
            <section id='getting-started' className='relative py-32'>
                <div className='mx-auto max-w-5xl px-6 lg:px-8'>
                    <div className='mb-20 text-center'>
                        <h2 className='mb-6 text-5xl font-bold md:text-6xl'>
                            <span className='bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent'>
                                Ready in Minutes
                            </span>
                        </h2>
                        <p className='mx-auto max-w-2xl text-xl text-slate-400'>
                            Get your Next.js project up and running with zero configuration
                        </p>
                    </div>

                    <div className='space-y-12'>
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className='group flex flex-col items-start space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/10 lg:flex-row lg:items-center lg:space-x-8 lg:space-y-0'
                            >
                                <div className='flex-shrink-0'>
                                    <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-bold text-white shadow-lg'>
                                        {step.number}
                                    </div>
                                </div>

                                <div className='flex-grow'>
                                    <h3 className='mb-2 text-2xl font-bold text-white'>
                                        {step.title}
                                    </h3>
                                    <p className='mb-4 text-slate-400'>{step.description}</p>

                                    <div className='rounded-xl border border-white/10 bg-slate-900/50 p-4 font-mono text-green-400 backdrop-blur-sm transition-colors duration-300 group-hover:border-green-500/30'>
                                        {step.code}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className='relative border-t border-white/10 py-16'>
                <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                    <div className='flex flex-col items-center justify-between md:flex-row'>
                        <div className='mb-6 flex items-center space-x-3 md:mb-0'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg'>
                                <span className='text-lg font-bold text-white'>
                                    {CONSTANTS.appName}
                                </span>
                            </div>
                            <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-xl font-bold text-transparent'>
                                Next Boilerplate
                            </span>
                        </div>

                        <div className='flex space-x-8'>
                            <Link
                                href={CONSTANTS.socials.github}
                                target='_blank'
                                className='flex items-center space-x-2 text-slate-400 transition-colors duration-200 hover:text-white'
                            >
                                <FolderGit2 className='h-5 w-5' />
                                <span>GitHub</span>
                            </Link>
                            <Link
                                href={ROUTES.docs}
                                target='_blank'
                                className='flex items-center space-x-2 text-slate-400 transition-colors duration-200 hover:text-white'
                            >
                                <ExternalLink className='h-5 w-5' />
                                <span>Docs</span>
                            </Link>
                        </div>
                    </div>

                    <div className='mt-12 border-t border-white/10 pt-8 text-center'>
                        <p className='text-slate-400'>
                            © 2025 {CONSTANTS.appName} NextJs Boilerplate.
                            <span className='bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent'>
                                {" "}
                                Built with ❤️ for developers.
                            </span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
