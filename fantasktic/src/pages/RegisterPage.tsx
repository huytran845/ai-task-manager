// Node Modules
import { SignUp } from "@clerk/clerk-react";

// Components
import Head from "@/components/Head";

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
