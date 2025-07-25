import React, { Component } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"; // ✅ Correct import
import { Button } from "../ui/button";

class Navbar extends Component {
  render() {
    return (
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-bold cursor-pointer">
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

            <Popover>
              <PopoverTrigger asChild>
                <button className="rounded-full overflow-hidden">
                  <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                      className="object-cover"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-48 p-2">
                <div className="flex flex-col space-y-2">
                  <button className="hover:bg-gray-100 p-2 rounded text-left">
                    Profile
                  </button>
                  <button className="hover:bg-gray-100 p-2 rounded text-left">
                    Settings
                  </button>
                  <button className="hover:bg-gray-100 p-2 rounded text-left">
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
