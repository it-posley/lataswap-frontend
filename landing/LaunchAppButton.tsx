import Link from "next/link";

export interface ILaunchAppButton {
  className?: string;
}

const LaunchAppButton: React.FC<ILaunchAppButton> = ({ className }) => {
  return (
    <Link
      href="/app"
      className={`inline-block rounded-xl bg-gradient-to-r from-fuchsia-900  to-rose-500 px-5 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:to-fuchsia-900 ${className}`}
    >
      Launch App
    </Link>
  );
};

LaunchAppButton.displayName = "LaunchAppButton";
export default LaunchAppButton;
