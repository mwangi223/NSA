This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


Use Conditional Rendering for Form Fields

    Simplify the conditional rendering of form fields (e.g., CustomFormField) by using a ternary operator or extracting the logic into a separate function.
    Commit message: Simplify conditional rendering of form fields

const renderFormFields = () => {
  if (type === "cancel") {
    return <CustomFormField ... />;
  }
  return (
    <>
      <CustomFormField ... />
      <CustomFormField ... />
    </>
  );
};

Optimize buttonLabel Logic

    Use a map or object for buttonLabel assignment to make it more scalable and cleaner.
    Commit message: Optimize buttonLabel assignment with a map

const buttonLabels: Record<string, string> = {
  cancel: "Cancel Appointment",
  schedule: "Schedule Appointment",
  create: "Submit Appointment",
};
const buttonLabel = buttonLabels[type];

Remove Redundant useState for isLoading

    If the isLoading state is only used for the button, you could use a direct isLoading prop in SubmitButton instead of managing it separately.
    Commit message: Remove redundant isLoading state for cleaner code

    <SubmitButton isLoading={isLoading} ... />

These changes improve readability, maintainability, and scalability while also making the code cleaner and more efficient.