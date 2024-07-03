// app/components/Navbar.tsx

import Link from "next/link";
import { Toggle } from "../theme/Toggle";
import { User, LogIn, ShoppingCart, LogOut } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  return (
    <header className="w-full shadow-md transition-colors duration-300">
      <div className="max-w-6xl flex justify-between items-center py-4 mx-auto px-4">
        <Link href="/" className="text-2xl font-bold">
          E-Commerce
        </Link>
        <div className="flex items-center space-x-4">
          <Toggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button aria-label="User Menu">
                <User size={24} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Register or Login</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Sign In</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Log In</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  <span>My Cart</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}