import { useRouter } from "next/router";
import Head from "next/head";

import React, { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  const logout = async () => {
    const ls_token = window.localStorage.getItem("token");
    if (!ls_token) router.push("/login");
    const res = await fetch(
      `${window.location.origin}/api/session/logout?token=${ls_token}`
    );
    if (res.status && res.status !== 200) {
      console.error("Something went wrong.");
    } else {
      window.localStorage.setItem("token", null);
      router.push("/login");
    }
  };
  useEffect(async () => {
    const ls_token = window.localStorage.getItem("token");
    if (!ls_token) router.push("/login");
    const res = await fetch(
      `${window.location.origin}/api/session/me?token=${ls_token}`
    );
    if (res.status && res.status !== 200) {
      router.push("/login");
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Heeko - Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  width="488px"
                  height="328px"
                  viewBox="0 0 488 328"
                  version="1.1"
                  className="mx-auto h-12 w-auto"
                >
                  <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <rect x="0" y="0" width="488" height="328"></rect>
                    <path
                      d="M232.263105,130.985614 C257.785782,130.985614 276.526209,150.125113 276.526209,177.492807 C276.526209,179.057953 276.45649,180.553226 276.360627,182.022298 L276.30032,182.900945 L276.169249,184.64776 L209.060671,184.64776 C211.380914,197.705549 219.947967,205.218249 233.155506,205.218249 C242.457302,205.218249 247.962327,201.759028 250.858511,195.690978 L251.003532,195.380189 L274.205966,195.380189 C268.851558,213.983066 253.323775,224 232.263105,224 C206.740427,224 188,204.860501 188,177.492807 C188,150.125113 206.740427,130.985614 232.263105,130.985614 Z M136.74833,130.933005 C162.271007,130.933005 181.011435,150.072503 181.011435,177.440197 C181.011435,179.005343 180.941716,180.500617 180.845852,181.969688 L180.785546,182.848335 L180.654474,184.59515 L113.545896,184.59515 C115.86614,197.652939 124.433192,205.165639 137.640732,205.165639 C146.942528,205.165639 152.447553,201.706418 155.343737,195.638368 L155.488758,195.327579 L178.691191,195.327579 C173.336784,213.930456 157.809001,223.94739 136.74833,223.94739 C111.225653,223.94739 92.4852257,204.807891 92.4852257,177.440197 C92.4852257,150.072503 111.225653,130.933005 136.74833,130.933005 Z M416.487534,130.933005 C442.545652,130.933005 462,150.072503 462,177.440197 C462,204.807891 442.545652,223.94739 416.487534,223.94739 C390.429416,223.94739 370.975067,204.807891 370.975067,177.440197 C370.975067,150.072503 390.429416,130.933005 416.487534,130.933005 Z M21.4176312,96 L21.4176312,144.480066 C26.9505193,134.999753 36.0530126,130.933005 47.1187887,130.933005 C66.0376963,130.933005 80.3161171,143.454172 80.3161171,168.67538 L80.3161171,168.67538 L80.3161171,222.158652 L58.8984859,222.158652 L58.8984859,172.968352 C58.8984859,157.942951 51.7592754,149.714755 40.1580585,149.714755 C28.5568416,149.714755 21.4176312,157.942951 21.4176312,172.968352 L21.4176312,172.968352 L21.4176312,222.158652 L0,222.158652 L0,96 L21.4176312,96 Z M309.831486,96 L309.831486,171.716235 L344.456656,132.721743 L372.656537,132.721743 L333.39088,173.326099 L374.976781,222.158652 L348.204742,222.158652 L309.831486,175.114838 L309.831486,222.158652 L288.413855,222.158652 L288.413855,96 L309.831486,96 Z M476.004932,197.958076 C482.629625,197.958076 488,203.328451 488,209.953144 C488,216.577837 482.629625,221.948212 476.004932,221.948212 L475.995068,221.948212 C469.370375,221.948212 464,216.577837 464,209.953144 C464,203.328451 469.370375,197.958076 475.995068,197.958076 L476.004932,197.958076 Z M416.487534,150.609125 C402.744554,150.609125 392.392699,161.341554 392.392699,177.440197 C392.392699,193.538841 402.744554,204.27127 416.487534,204.27127 C430.230514,204.27127 440.582369,193.538841 440.582369,177.440197 C440.582369,161.341554 430.230514,150.609125 416.487534,150.609125 Z M232.263105,149.767365 C219.908304,149.767365 211.74237,156.764203 209.318672,169.028103 L209.239151,169.443485 L255.287058,169.443485 C252.966815,156.922318 244.756723,149.767365 232.263105,149.767365 Z M136.74833,149.714755 C124.39353,149.714755 116.227595,156.711593 113.803897,168.975493 L113.724377,169.390875 L159.772284,169.390875 C157.45204,156.869708 149.241948,149.714755 136.74833,149.714755 Z"
                      fill="#ffffff"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  onClick={() => logout()}
                >
                  <span className="sr-only">Logout</span>
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                    title="Logout"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </button>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">Logout</span>
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  title="Logout"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
