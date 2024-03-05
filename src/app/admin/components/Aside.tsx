import Link from 'next/link';
import { useState } from 'react';
import Productos from './Productos';
import Seguridad from './Seguridad';

export default function Aside() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [securityDropdownOpen, setSecurityDropdownOpen] = useState(false);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const toggleSecurityDropdown = () => {
    setSecurityDropdownOpen(!securityDropdownOpen);
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href="/admin"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${selectedItem === 'Dashboard' ? 'bg-gray-300' : ''}`}
              onClick={() => {
                handleItemClick('Dashboard');
                toggleSecurityDropdown();
              }}
            >
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                {/* SVG Path */}
              </svg>
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <Seguridad selectedItem={selectedItem} handleItemClick={handleItemClick}/>
          <Productos selectedItem={selectedItem} handleItemClick={handleItemClick}/>
        </ul>
      </div>
    </aside>
  );
}
