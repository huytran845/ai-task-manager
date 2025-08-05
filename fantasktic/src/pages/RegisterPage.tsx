// Node Modules
import { SignUp } from "@clerk/clerk-react";

// Components
import Head from "@/components/Head";

// RegisterPage for users to register an account with the app, utilizing Clerk API.
const RegisterPage = () => {
  return (
    <>
      <Head
        title="Create your Account - Fantasktic To-Do List and Project Management App"
        metaContent="Sign up with Fantasktic today to get your tasks created and managed."
      />

      <section>
        <div className="container flex justify-center">
          <SignUp signInUrl="/login" />
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
