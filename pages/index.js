import { useEffect } from "react";
import { useRouter } from "next/router";

function Home({ sessionUser }) {
  const router = useRouter();

  useEffect(() => {
    console.log("sessionUser::", sessionUser);
    if (!sessionUser) {
      router.push("/login");
    }
  }, [sessionUser]);

  return <div>Loading</div>;
}

Home.getInitialProps = async (ctx) => {
  return { sessionUser: false };
};

export default Home;
