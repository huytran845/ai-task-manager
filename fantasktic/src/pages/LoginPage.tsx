// Node Modules
import { SignIn } from "@clerk/clerk-react";

// Components
import Head from "@/components/Head";

const LoginPage = () => {
  return (
    <>
      <Head title="Login to your Account - Fantasktic To-Do List and Project Management App" />

      <section>
        <div className="container flex justify-center">
          <SignIn signUpUrl="/register" />
        </div>
      </section>
    </>
  );
};

export default LoginPage;
