import { useEffect, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import Image from "./Image";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);


  const {getToken} = useAuth()

  useEffect(() => {
    getToken().then((token) => console.log(token))
  }, [])
  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* logo */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image src="logo.png" alt="Venom Logo" w={32} h={32} />
        <span>Venom blog</span>
      </Link>
      {/* mobile menu */}
      <div className="md:hidden">
        <div
          className="cursor-pointer text-3 xl"
          onClick={() => setOpen((prev) => !prev)}>
          {open ? <MdClose /> : <MdMenu />}
        </div>
        <div
          className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 bg-[#e6e6ff] transition-all ease-in-out duration-200 ${
            open ? "-right-0" : "-right-full"
          }`}>
          <Link to="/">Home</Link>
          <Link to="/">Trending</Link>
          <Link to="/">Most Popular</Link>
          <Link to="/">About</Link>
          <Link to="/">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Login 👋
            </button>
          </Link>
        </div>
      </div>
      {/* desktop menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/">About</Link>

        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Login 👋
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
