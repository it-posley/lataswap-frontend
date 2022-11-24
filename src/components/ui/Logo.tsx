import Link from "next/link";
import Image from "next/image";
import React from "react";

export interface ILogo {
  size: number;
}

const Logo: React.FC<ILogo> = ({ size }) => {
  return (
    <Link href="/" className="-m-1.5 p-1.5">
      <span className="sr-only">Lataswap</span>
      <Image src="/ui/logo.png" alt="Logo" height={size} width={size} />
    </Link>
  );
};

export default Logo;
