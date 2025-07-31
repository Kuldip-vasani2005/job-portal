import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";


const Navbar = () => {
  const user = false;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl text-blue-500 font-bold cursor-pointer">
            Job<span className="text-[#d51d1d]">Seek</span>
          </h1>
        </div>

        <div className="flex items-center gap-8">
          <ul className="hidden md:flex font-medium items-center gap-5">
            <li className="hover:text-[#d51d1d] cursor-pointer transition-colors">
              Home
            </li>
            <li className="hover:text-[#d51d1d] cursor-pointer transition-colors">
              Jobs
            </li>
            <li className="hover:text-[#d51d1d] cursor-pointer transition-colors">
              Browse
            </li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button className="bg-gray-800">Signup</Button></Link>
              
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <button className="cursor-pointer">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 space-y-4">
                <div className="flex gap-4 items-center">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Kuldip Vasani</h4>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600 gap-2">
                  <Button
                    variant="link"
                    className="flex items-center gap-2 p-0 h-auto"
                  >
                    <User2 className="w-4 h-4" />
                    View Profile
                  </Button>
                  <Button
                    variant="link"
                    className="flex items-center gap-2 p-0 h-auto"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
