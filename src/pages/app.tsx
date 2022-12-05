import type { NextPage } from "next";
import Head from "next/head";
import FundStat from "../components/app/FundStat";
import Header from "../components/app/Header";
import Swap from "../components/app/Swap";

const AppPage: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Head>
        <title>Lataswap</title>
        <meta name="description" content="lataswap app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="px-6 lg:px-8">
        <div className="mx-auto flex min-h-screen max-w-7xl items-start justify-between">
          <div className="">
            <FundStat />
          </div>
          <div className="flex-1">
            <Swap />
            {/* <Test /> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppPage;
