import Head from "next/head";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let payload = [];
    for (let [key, value] of formData.entries()) {
      payload[key] = value;
    }
    setLoading(true);
    const response = await fetch(
      `${window.location.origin}/api/session/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password
        })
      }
    );
    const responseJson = await response.json();
    if (responseJson && responseJson.token) {
      window.localStorage.setItem("token", responseJson.token);
      router.push("/dashboard");
    } else {
      console.log("Something went wrong.");
    }
    setLoading(false);
  };

  useEffect(async () => {
    const ls_token = window.localStorage.getItem("token");
    if (ls_token && ls_token !== "null") {
      const res = await fetch(
        `${window.location.origin}/api/session/me?token=${ls_token}`
      );
      if (res.status && res.status === 200) {
        router.push("/dashboard");
      }
    }
  }, []);
  const loginButton = loading ? (
    <button
      type="submit"
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-200 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-100"
      disabled={true}
    >
      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
        <svg
          className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      Please wait
    </button>
  ) : (
    <button
      type="submit"
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
        <svg
          className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      Login
    </button>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Heeko - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-md w-full space-y-8">
        <div>
          <svg
            width="488px"
            height="328px"
            viewBox="0 0 488 328"
            version="1.1"
            className="mx-auto h-12 w-auto"
          >
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <rect x="0" y="0" width="488" height="328"></rect>
              <path
                d="M232.263105,130.985614 C257.785782,130.985614 276.526209,150.125113 276.526209,177.492807 C276.526209,179.057953 276.45649,180.553226 276.360627,182.022298 L276.30032,182.900945 L276.169249,184.64776 L209.060671,184.64776 C211.380914,197.705549 219.947967,205.218249 233.155506,205.218249 C242.457302,205.218249 247.962327,201.759028 250.858511,195.690978 L251.003532,195.380189 L274.205966,195.380189 C268.851558,213.983066 253.323775,224 232.263105,224 C206.740427,224 188,204.860501 188,177.492807 C188,150.125113 206.740427,130.985614 232.263105,130.985614 Z M136.74833,130.933005 C162.271007,130.933005 181.011435,150.072503 181.011435,177.440197 C181.011435,179.005343 180.941716,180.500617 180.845852,181.969688 L180.785546,182.848335 L180.654474,184.59515 L113.545896,184.59515 C115.86614,197.652939 124.433192,205.165639 137.640732,205.165639 C146.942528,205.165639 152.447553,201.706418 155.343737,195.638368 L155.488758,195.327579 L178.691191,195.327579 C173.336784,213.930456 157.809001,223.94739 136.74833,223.94739 C111.225653,223.94739 92.4852257,204.807891 92.4852257,177.440197 C92.4852257,150.072503 111.225653,130.933005 136.74833,130.933005 Z M416.487534,130.933005 C442.545652,130.933005 462,150.072503 462,177.440197 C462,204.807891 442.545652,223.94739 416.487534,223.94739 C390.429416,223.94739 370.975067,204.807891 370.975067,177.440197 C370.975067,150.072503 390.429416,130.933005 416.487534,130.933005 Z M21.4176312,96 L21.4176312,144.480066 C26.9505193,134.999753 36.0530126,130.933005 47.1187887,130.933005 C66.0376963,130.933005 80.3161171,143.454172 80.3161171,168.67538 L80.3161171,168.67538 L80.3161171,222.158652 L58.8984859,222.158652 L58.8984859,172.968352 C58.8984859,157.942951 51.7592754,149.714755 40.1580585,149.714755 C28.5568416,149.714755 21.4176312,157.942951 21.4176312,172.968352 L21.4176312,172.968352 L21.4176312,222.158652 L0,222.158652 L0,96 L21.4176312,96 Z M309.831486,96 L309.831486,171.716235 L344.456656,132.721743 L372.656537,132.721743 L333.39088,173.326099 L374.976781,222.158652 L348.204742,222.158652 L309.831486,175.114838 L309.831486,222.158652 L288.413855,222.158652 L288.413855,96 L309.831486,96 Z M476.004932,197.958076 C482.629625,197.958076 488,203.328451 488,209.953144 C488,216.577837 482.629625,221.948212 476.004932,221.948212 L475.995068,221.948212 C469.370375,221.948212 464,216.577837 464,209.953144 C464,203.328451 469.370375,197.958076 475.995068,197.958076 L476.004932,197.958076 Z M416.487534,150.609125 C402.744554,150.609125 392.392699,161.341554 392.392699,177.440197 C392.392699,193.538841 402.744554,204.27127 416.487534,204.27127 C430.230514,204.27127 440.582369,193.538841 440.582369,177.440197 C440.582369,161.341554 430.230514,150.609125 416.487534,150.609125 Z M232.263105,149.767365 C219.908304,149.767365 211.74237,156.764203 209.318672,169.028103 L209.239151,169.443485 L255.287058,169.443485 C252.966815,156.922318 244.756723,149.767365 232.263105,149.767365 Z M136.74833,149.714755 C124.39353,149.714755 116.227595,156.711593 113.803897,168.975493 L113.724377,169.390875 L159.772284,169.390875 C157.45204,156.869708 149.241948,149.714755 136.74833,149.714755 Z"
                fill="#070707"
              ></path>
            </g>
          </svg>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(event) => login(event)}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>{loginButton}</div>
        </form>
      </div>
    </div>
  );
};
export default Login;
