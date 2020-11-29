import { useRouter } from "next/router";

import React, { useEffect } from "react";
const Home = () => {
  const router = useRouter();
  useEffect(async () => {
    const ls_token = window.localStorage.getItem("token");
    if (!ls_token) router.push("/login");
    const res = await fetch(
      `${window.location.origin}/api/session/me?token=${ls_token}`
    );
    if (res.status && res.status !== 200) {
      router.push("/login");
    }
    router.push("/dashboard");
  }, []);
  return <div>Welcome</div>;
};
export default Home;
