// Node Modules
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

// CSS File
import "@/index.css";

// Routes
import router from "@/routes";

// Environment Variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const SIGN_IN_FORCE_REDIRECT_URL = import.meta.env
  .VITE_CLERK_SIGN_IN_FORCE_REDIRECT_URL;
const SIGN_UP_FORCE_REDIRECT_URL = import.meta.env
  .VITE_CLERK_SIGN_UP_FORCE_REDIRECT_URL;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const theme = (() => {
  const storedTheme = localStorage.getItem("theme") || "dark";
  return storedTheme;
})();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/auth-sync"
      signInForceRedirectUrl={SIGN_IN_FORCE_REDIRECT_URL}
      signUpForceRedirectUrl={SIGN_UP_FORCE_REDIRECT_URL}
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        variables:
          theme === "dark"
            ? {
                // Dark Mode Clerk Theme Variables
                colorBackground: "hsl(20 14.3% 4.1%)",
                colorText: "hsl(60 9.1% 97.8%)",
                colorDanger: "hsl(0 72.2% 50.6%)",
                colorTextSecondary: "hsl(24 5.4% 63.9%)",
                colorInputBackground: "hsl(20 14.3% 4.1%)",
                colorInputText: "hsl(60 9.1% 97.8%)",
                borderRadius: "0.35rem",
                colorPrimary: "hsl(20.5 90.2% 48.2%)",
                colorTextOnPrimaryBackground: "hsl(60 9.1% 97.8%)",
              }
            : {
                // Light Mode Clerk Theme Variables
                colorBackground: "hsl(97 100% 99%)",
                colorText: "hsl(220 15% 15%)",
                colorDanger: "hsl(0 80% 60%)",
                colorTextSecondary: "hsl(220 10% 40%)",
                colorInputBackground: "hsl(220 10% 95%)",
                colorInputText: "hsl(220 15% 15%)",
                borderRadius: "0.35rem",
                colorPrimary: "hsl(220 80% 50%)",
                colorTextOnPrimaryBackground: "hsl(0 0% 100%)",
              },
      }}
    >
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
);

// Previous cleaner implementation, but incompatible with React's HMR so using simpler approach
// const Root = () => {
//   const [theme, setTheme] = useState("dark");

//   useEffect(() => {
//     setTheme(localStorage.getItem("theme") || "dark");
//   }, []);

//   return (
//     <StrictMode>
//       <ClerkProvider
//         publishableKey={PUBLISHABLE_KEY}
//         afterSignOutUrl="/auth-sync"
//         signInForceRedirectUrl={SIGN_IN_FORCE_REDIRECT_URL}
//         signUpForceRedirectUrl={SIGN_UP_FORCE_REDIRECT_URL}
//         appearance={{
//           baseTheme: theme === "dark" ? dark : undefined,
//           variables:
//             theme === "dark"
//               ? {
//                   // Dark Mode Clerk Variable Theme
//                   colorBackground: "hsl(20 14.3% 4.1%)",
//                   colorText: "hsl(60 9.1% 97.8%)",
//                   colorDanger: "hsl(0 72.2% 50.6%)",
//                   colorTextSecondary: "hsl(24 5.4% 63.9%)",
//                   colorInputBackground: "hsl(20 14.3% 4.1%)",
//                   colorInputText: "hsl(60 9.1% 97.8%)",
//                   borderRadius: "0.35rem",
//                   colorPrimary: "hsl(20.5 90.2% 48.2%)",
//                   colorTextOnPrimaryBackground: "hsl(60 9.1% 97.8%)",
//                 }
//               : {
//                   // Light Mode Clerk Variable Theme
//                   colorBackground: "hsl(97 100% 99%)",
//                   colorText: "hsl(220 15% 15%)",
//                   colorDanger: "hsl(0 80% 60%)",
//                   colorTextSecondary: "hsl(220 10% 40%)",
//                   colorInputBackground: "hsl(220 10% 95%)",
//                   colorInputText: "hsl(220 15% 15%)",
//                   borderRadius: "0.35rem",
//                   colorPrimary: "hsl(220 80% 50%)",
//                   colorTextOnPrimaryBackground: "hsl(0 0% 100%)",
//                 },
//         }}
//       >
//         <RouterProvider router={router} />
//       </ClerkProvider>
//     </StrictMode>
//   );
// };

//createRoot(document.getElementById("root")!).render(<Root />);
