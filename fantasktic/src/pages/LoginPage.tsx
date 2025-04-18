// Node Modules
import { SignIn } from "@clerk/clerk-react";

// Components
import Head from "@/components/Head";

const LoginPage = () => {
  return (
    <>
      <Head
        title="Login to your Account - Fantasktic To-Do List and Project Management App"
        metaContent="The Login Page for Fantasktic, users can sign in with various accounts to start their journey of task creation."
      />

      <section>
        <div className="container flex justify-center">
          <SignIn signUpUrl="/register" />
        </div>
      </section>
    </>
  );
};

export default LoginPage;
