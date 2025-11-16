import { HeartIcon } from "@heroicons/react/24/solid";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white mt-auto">
      <div className="w-full max-w-screen-2xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center text-center">
          <HeartIcon className="h-7 w-7 text-red-600 mb-2 animate-bounce" />
          <p className="text-sm font-semibold">
            © 2025 Blood Bank Management System. All rights reserved.
          </p>
          <p className="text-xs mt-2 text-gray-400 font-medium max-w-md">
            Every donor is a hero. Every moment here can change a life.
          </p>
          <p className="text-xs text-red-300 mt-1 font-bold">
            Save Lives. Donate Blood.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
