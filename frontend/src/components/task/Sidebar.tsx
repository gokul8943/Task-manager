import { ReactNode, useState } from 'react';
import {
  CheckCircle,
  Home,
  CheckSquare,
  Settings,
  Users,
  PlusSquare,
  ChevronRight,
  ChevronLeft,
  FileText,
  LogOut
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={toggleMobileSidebar}
      />

      {/* Mobile Toggle Button */}
      <button
        className="fixed bottom-4 left-4 p-2 rounded-full bg-blue-600 text-white shadow-lg z-30 lg:hidden"
        onClick={toggleMobileSidebar}
      >
        <ChevronRight size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full bg-white shadow-lg transition-all duration-300 flex flex-col
          ${collapsed ? 'w-16' : 'w-64'} 
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-gray-200">
          <CheckCircle className="h-8 w-8 text-blue-600 flex-shrink-0" />
          {!collapsed && (
            <span className="ml-2 text-xl font-bold text-gray-900">TaskManager</span>
          )}
          <button
            className="ml-auto p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:block hidden"
            onClick={toggleSidebar}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button
            className="ml-auto p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden"
            onClick={toggleMobileSidebar}
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        {/* User Profile */}


        {/* Navigation - Top Section */}
        <div className="p-2 overflow-y-auto flex-grow">
          <nav className="space-y-1">
            <SidebarItem icon={<Home size={20} />} text="Dashboard" active collapsed={collapsed} />
            <SidebarItem icon={<CheckSquare size={20} />} text="Tasks" collapsed={collapsed} />
            {/* <SidebarItem icon={<Calendar size={20} />} text="Calendar" collapsed={collapsed} /> */}
            <SidebarItem icon={<PlusSquare size={20} />} text="Projects" collapsed={collapsed} />
            <SidebarItem icon={<FileText size={20} />} text="Notes" collapsed={collapsed} />
            <SidebarItem icon={<Users size={20} />} text="Team" collapsed={collapsed} />
          </nav>
        </div>
        <div className={`p-4 border-b border-gray-200 ${collapsed ? 'flex justify-center' : ''}`}>
          {collapsed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>John Doe</p>
                  <p className="text-xs text-gray-500">john.doe@example.com</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">John Doe</span>
                <span className="text-xs text-gray-500">john.doe@example.com</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="mt-auto p-2 border-t border-gray-200">
          <nav className="space-y-1">
            <SidebarItem icon={<Settings size={20} />} text="Settings" collapsed={collapsed} />
            <SidebarItem icon={<LogOut size={20} />} text="Logout" collapsed={collapsed} danger />
          </nav>
        </div>

      </div>
    </>
  );
};

interface SidebarItems{
  icon: ReactNode;
  text:any
  active?: boolean;
  collapsed?: boolean;
  danger?: boolean  
}

const SidebarItem: React.FC<SidebarItems> = ({ icon, text, active = false, collapsed = false, danger = false }) => {
  const baseClasses = `
    flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
    ${active
      ? 'bg-blue-50 text-blue-600'
      : danger
        ? 'text-red-600 hover:bg-red-50'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }
  `;

  return collapsed ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a href="#" className={`${baseClasses} justify-center`}>
            {icon}
          </a>
        </TooltipTrigger>
        <TooltipContent side="right">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <a href="#" className={baseClasses}>
      {icon}
      <span className="ml-3">{text}</span>
    </a>
  );
};

export default Sidebar;