import { Portfolio, Performance } from "@components/dashboard";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/app/Header";

const DashboardPage: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Head>
        <title>Lataswap</title>
        <meta name="description" content="lataswap app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="px-6 lg:px-8">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-start">
          <div className="mb-5 w-full">
            <Portfolio />
          </div>
          <div className="w-full">
            <Performance />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
