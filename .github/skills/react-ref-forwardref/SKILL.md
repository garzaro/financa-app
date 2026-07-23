---
name: react-ref-forwardref
description: "Diagnose and fix the React warning: 'Function components cannot be given refs. Did you mean to use React.forwardRef()?' Use when a component receives a ref prop (directly or via react-hook-form register spread) but is not wrapped with forwardRef. Triggers: ref warning, forwardRef, useRef, react-hook-form ref, register ref, cannot be given refs."
argument-hint: "component name or file path where the warning occurs"
---

# React `ref` / `forwardRef` Diagnosis & Fix

## When to Use

- Browser/console warning: `"Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?"`
- A component receives a `ref` prop directly (`<MyInput ref={someRef} />`)
- A component receives `{...register('field')}` from **react-hook-form** and does NOT forward the ref
- A `useRef` value is always `null` despite pointing at a component

---

## How It Happens

React Hook Form's `register()` returns `{ ref, name, onChange, onBlur }`. When you spread it:

```jsx
<Input {...register('email')} />
```

React tries to attach `ref` to `Input`. If `Input` is a plain function component, React cannot reach the inner DOM element and emits the warning.

---

## Diagnostic Procedure

### Step 1 — Identify the culprit component

1. Open the browser console and note the **component name** in the warning stack trace.
2. Search the workspace for that component's definition:
   ```
   grep_search: "function <ComponentName>|const <ComponentName>"
   ```
3. Check whether the component file contains `forwardRef`. If not, that is the source.

### Step 2 — Confirm how `ref` arrives

Look at every usage of the component in the codebase:

| Scenario | Example |
|---|---|
| Explicit ref prop | `<Input ref={inputRef} />` |
| react-hook-form spread | `<Input {...register('field')} />` |
| Third-party HOC | `<AnimatedInput ref={...} />` |

If the component does **not** need to expose a DOM ref externally, consider whether the ref is necessary at all (e.g., react-hook-form only needs the ref for uncontrolled inputs — controlled inputs via `Controller` do not need it).

### Step 3 — Choose the fix

| Situation | Fix |
|---|---|
| Component wraps a native DOM element (input, div, button…) | Wrap with `React.forwardRef` and pass `ref` to the element |
| Component wraps another custom component | That inner component also needs `forwardRef` — fix it recursively |
| react-hook-form controlled flow is acceptable | Replace `register` spread with `<Controller>` — eliminates the ref requirement |
| ref is unused/irrelevant | Remove the `ref` prop from the call site |

---

## Fix: Wrap with `React.forwardRef`

### Before

```jsx
// src/components/ui/input.jsx
function Input({ className, type, ...props }) {
  return <input type={type} className={cn(..., className)} {...props} />;
}
export { Input };
```

### After

```jsx
// src/components/ui/input.jsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(function Input({ className, type, ...props }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border ...",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
export { Input };
```

Key rules:
- Add `ref` as the **second parameter** of the inner function (after props).
- Pass `ref` to the **native element** or the first forwardRef-capable child.
- Set `displayName` so React DevTools labels it correctly.

---

## Fix: react-hook-form `Controller` alternative

Use `Controller` when you prefer a controlled component and want to avoid `forwardRef` entirely:

```jsx
import { useForm, Controller } from "react-hook-form";

const { control } = useForm();

<Controller
  name="email"
  control={control}
  render={({ field }) => <Input {...field} />}
/>
```

`field` does not include a `ref` that requires `forwardRef` in the controlled pattern.

---

## Verification

After applying the fix, confirm:

1. **Warning disappears** — no `forwardRef` warning in the console.
2. **Validation works** — react-hook-form can trigger validation and focus the field on error.
3. **ref.current is populated** — if using `useRef`, log `ref.current` after mount; it should point to the DOM element.
4. **No TypeScript errors** — if using TS, the component type should be `React.ForwardRefExoticComponent<...>`.

---

## Common Mistakes

| Mistake | Symptom |
|---|---|
| Forgot to pass `ref` to the DOM element | Warning gone but `ref.current` is still `null` |
| Applied `forwardRef` to a component that wraps another custom component without `forwardRef` | Warning moves down one level |
| Mixed `register` spread + explicit `ref` | Duplicate ref; use one or the other |
| Used `React.memo` without `forwardRef` | Re-wrapping with `memo(forwardRef(...))` is required |
