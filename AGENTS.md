# Pillardash — Next.js 16 Boilerplate Instructions

## Stack

- **Next.js 16**, TypeScript, TailwindCSS 3
- **State**: Redux Toolkit + `redux-persist` (key: `root`)
- **Server state**: React Query (`@tanstack/react-query`)
- **HTTP**: Axios (instance in `api/config/axios.ts`)
- **Icons**: `lucide-react`
- **Commits**: Husky + lint-staged + Commitlint (conventional commits)

---

## Critical Rules

- **Never use `fetch` directly** — all API calls go through the `api` axios instance (`@/api/index.ts`)
- **Never access Redux state with `useSelector` without a typed selector** — use `RootState` from `@/redux/store`
- **Never hardcode routes** — use constants from `@/lib/routes.ts`
- **Never duplicate helper functions locally** — before adding formatting, parsing, validation, or reusable utility functions, check `@/lib/` first. Add to `constants.ts` or a new dedicated helper file if truly reusable.
- **Notifications**: use `alert.success` and `alert.error` from `@/lib/alert`; the root `NotificationProvider` displays them.

---

## Folder Structure

```
├── api/
│   ├── config/
│   │   ├── axios.ts       # Axios instance with auth interceptor — DO NOT MODIFY lightly
│   │   ├── util.ts        # handleApiResponse helper
│   │   └── error.ts       # ApiErrorHandler class
│   ├── endpoints/         # Endpoint path constants (e.g. auth-endpoints.ts)
│   ├── requests/          # Request functions wrapping api calls (e.g. auth-requests.ts)
│   ├── types.ts           # ApiResponse<T>, ApiError
│   └── index.ts           # Exported axios instance
├── src/
│   ├── app/
│   │   ├── auth/          # Login, signup, forgot/reset password
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── ...
│   ├── components/
│   │   ├── layouts/       # AppWrapper, Logo
│   │   ├── ui/            # Button, Input, NotificationProvider
│   │   └── utilities/     # Icons
│   ├── hooks/             # useAuth, useOnMountUnsafe
│   ├── lib/
│   │   ├── constants.ts   # App-wide constants (name, URLs, colors, SEO keywords)
│   │   ├── metadata.ts    # Next.js Metadata config
│   │   ├── alert.ts       # App notifications
│   │   └── routes.ts      # Route path constants — always use these
│   ├── redux/
│   │   ├── store.ts       # configureStore + persist
│   │   └── reducers/
│   │       └── authSlice.ts
│   └── styles/
│       └── globals.css
```

---

## API Call Pattern

All API calls go through the `api` axios instance. Use the two-file pattern:

**Endpoints** (`api/endpoints/`):

```typescript
// api/endpoints/auth-endpoints.ts
export const authEndpoints = {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
};
```

**Requests** (`api/requests/`):

```typescript
// api/requests/auth-requests.ts
import { authEndpoints } from "@/api/endpoints/auth-endpoints";
import api from "@/api/index";
import { ApiResponse } from "@/api/types";

const AuthRequests = {
    login: async ({ email, password }: { email: string; password: string }) => {
        const response = await api.post(authEndpoints.login, { email, password });
        return response.data;
    },
};

export default AuthRequests;
```

**In hooks** (React Query):

```typescript
import { useMutation } from "@tanstack/react-query";

import { ApiErrorHandler } from "@/api/config/error";
import AuthRequests from "@/api/requests/auth-requests";

export function useLogin() {
    return useMutation({
        mutationFn: AuthRequests.login,
        onError: (error) => {
            ApiErrorHandler.handle(error);
        },
    });
}
```

---

## Redux State

```typescript
import { useSelector } from "react-redux";

import type { RootState } from "@/redux/store";

const accessToken = useSelector((state: RootState) => state.auth.accessToken);
const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
```

### Key Slice

**`authSlice`** — `accessToken`, `refreshToken`, `isAuthenticated`, `loading`, `error`

- `loginSuccess` — sets tokens + `isAuthenticated = true`
- `logout` — clears all auth state
- `refreshToken` — updates `accessToken`

---

## Route Constants

```typescript
import { ROUTES } from "@/lib/routes";

router.push(ROUTES.login);
router.push(ROUTES.signup);
<Link href={ROUTES.forgotPassword}>Forgot Password?</Link>
```

If a route doesn't exist in `routes.ts`, add it there first, then use the constant.

---

## Component Patterns

### Page Component Structure

```typescript
"use client";

import { useQuery } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function ExamplePage() {
    const { data, isLoading, error } = useQuery({ ... });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Page Title</h1>
                <Button onClick={() => {}}>Action</Button>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Unable to load data.</p>
            ) : (
                <div>{/* content */}</div>
            )}
        </div>
    );
}
```

---

## Tailwind & Styling

- Use Tailwind utility classes only — no custom CSS unless unavoidable
- Spacing scale: 4px base unit — use `space-4`, `gap-4`, `p-4`, etc.
- Typography: `text-sm` for secondary text, `text-base` for body, `text-lg`/`text-xl`/`text-2xl` for headings
- No hardcoded hex colors in className — reference Tailwind theme colors
- Responsive: mobile-first — `sm:`, `md:`, `lg:` breakpoints
- Theme colors from `CONSTANTS.colors` — use Tailwind config `primary`/`secondary` classes

---

## Error Handling

```typescript
import { ApiErrorHandler } from "@/api/config/error";

// In React Query mutations
onError: (error) => {
    ApiErrorHandler.handle(error); // shows a notification via @/lib/alert
};

// Manual
try {
    await someApiCall();
} catch (error) {
    ApiErrorHandler.handle(error);
}
```

The 401 interceptor in `axios.ts` automatically: dispatches `logout`, shows error toast, redirects to `/auth/login`. Do not duplicate this logic.

---

## Authentication

The `useAuth` hook (`@/hooks/useAuth.ts`) provides:

- `login`, `logout`, `register`
- `sendVerificationEmail`, `verifyEmailOTP`, `resendVerificationEmail`
- `requestPasswordReset`, `resetPassword`, `changePassword`
- `refreshToken`, `checkEmailAvailability`, `validateRegistrationToken`
- `state` object with all mutation states (`isPending`, `isError`, etc.)

---

## TypeScript Rules

- Strict mode is on — no `any`
- Define interfaces for all API request/response shapes
- Use `type` for unions/intersections, `interface` for object shapes
- Export types alongside the functions that use them
