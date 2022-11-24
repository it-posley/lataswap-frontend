import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/app/Header";

const AppPage: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Head>
        <title>Lataswap</title>
        <meta name="description" content="lataswap app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main></main>
    </div>
  );
};

export default AppPage;
