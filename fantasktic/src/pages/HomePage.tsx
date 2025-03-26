// Node Modules
import { Link } from "react-router";

// Components
import { Button } from "@/components/ui/button";
import Head from "@/components/Head";

// Assets
import { heroBannerLg, heroBannerSm } from "@/assets";

const HomePage = () => {
  return (
    <>
      <Head title="Fantasktic - AI Creates Your Tasks So You Don't Have To!" />

      <section>
        <div className="">
          <div className="">
            <h1 className="">
              From Chaos to Clarity, Stay Organized with{" "}
              <span className="">AI-Powered</span> Task Management.
            </h1>

            <p className="">
              Conquer your projects while ensuring that you and your team can
              stay on track with this Fantasktic to-do list app.
            </p>

            <Button
              asChild
              size="lg"
            >
              <Link to="/register">Start free today!</Link>
            </Button>
          </div>

          <figure className="bg-secondary rounded-2xl overflow-hidden aspect-square max-md:max-w-[480px] max-md:mx-auto md:aspect-video">
            <img
              src={heroBannerSm}
              width={480}
              height={480}
              alt="Fantasktic Website"
              className="md:hidden"
            />

            <img
              src={heroBannerLg}
              width={960}
              height={540}
              alt="Fantasktic Website"
              className="max-md:hidden"
            />
          </figure>
        </div>
      </section>
    </>
  );
};

export default HomePage;
