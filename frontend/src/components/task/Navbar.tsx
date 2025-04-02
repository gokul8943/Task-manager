import { useState } from 'react';
import { ReactNode } from "react";

import { Button } from '@/components/ui/button';
import { CheckCircle, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TaskManagerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and website name */}
          <div className="flex-shrink-0 flex items-center">
            <CheckCircle className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">TaskManager</span>
          </div>

          {/* Profile dropdown (desktop) */}
          <div className="hidden sm:flex sm:items-center">
            <ProfileDropdown />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Button 
              variant="ghost"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">John Doe</div>
              <div className="text-sm font-medium text-gray-500">john.doe@example.com</div>
            </div>
          </div>
          <div className="mt-3 space-y-1 px-2">
            <MobileMenuItem>Profile</MobileMenuItem>
            <MobileMenuItem>Settings</MobileMenuItem>
            <MobileMenuItem>My Teams</MobileMenuItem>
            <MobileMenuItem className="text-red-600">Sign out</MobileMenuItem>
          </div>
        </div>
      </div>
    </nav>
  );
};


interface MobileMenuItemProps {
  children: ReactNode;
  className?: string;
}

// Mobile menu item component
const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ children, className = "" }) => (
  <a
    href="#"
    className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 ${className}`}
  >
    {children}
  </a>
);

// Profile dropdown component
const ProfileDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-gray-700">John Doe</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuItem>My Teams</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-red-600">Sign out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default TaskManagerNavbar;