import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { LaunchAppButton, Header } from "../components/landing";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-start bg-white">
      <Head>
        <title>Lataswap</title>
        <meta name="description" content="lataswap" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-7xl pt-20 pb-32 sm:pt-48 sm:pb-40">
            <div>
              {/* annoucement */}
              <div className="hidden sm:mb-8 sm:flex">
                <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  <span className="text-gray-600">
                    Announcing our next index fund.{" "}
                    <Link href="#" className="font-semibold text-fuchsia-600">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Read more <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </span>
                </div>
              </div>
              {/* hero */}
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:max-w-3xl sm:text-6xl">
                  Gain exposure on a trustless trading basket
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-3xl">
                  Lataswap protocols, manages various investment tokens to track
                  a basket of cryptocurrencies.
                </p>
                <div className="mt-8 flex gap-x-4 lg:hidden">
                  <LaunchAppButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
