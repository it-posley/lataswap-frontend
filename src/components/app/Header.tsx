import Link from "next/link";
import { Logo } from "../ui";
import ConnectButton from "./ConnectButton";

export interface IHeader {
  className?: string;
}

const navigation = [
  { name: "Swap", href: "#" },
  { name: "Funds", href: "#" },
];

const Header: React.FC<IHeader> = ({ className }) => {
  return (
    <header className="px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl justify-between">
        {/* <div className="flex-1 bg-red-500">logo</div> */}
        <nav className="flex flex-1 items-center">
          <div>
            <Logo size={40} />
          </div>
          <div className="ml-8 flex min-w-0 gap-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-xl px-5 py-2 font-extrabold text-gray-700 hover:bg-gray-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        <div className="flex items-center">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

Header.displayName = "Header";
export default Header;
