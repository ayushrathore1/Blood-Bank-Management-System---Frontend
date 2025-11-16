import { HeartIcon } from "@heroicons/react/24/solid";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="mb-6 relative">
        <HeartIcon className="h-16 w-16 text-red-600 animate-bounce z-10 absolute left-0 top-0" />
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary opacity-60"></div>
      </div>
      <div className="text-lg text-primary font-medium">
        Loading... Someone’s life may change in moments. Thank you for your
        patience!
      </div>
    </div>
  );
};

export default Loader;
