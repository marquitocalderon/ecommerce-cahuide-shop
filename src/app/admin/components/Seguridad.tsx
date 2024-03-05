import Link from 'next/link';
import { useState } from 'react';

interface SeguridadProps {
  selectedItem: string | null;
  handleItemClick: (item: string) => void;
}

export default function Seguridad({ selectedItem, handleItemClick }: SeguridadProps) {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const submenuDropdown = () => {
    setSubmenuOpen(!submenuOpen);
  };
  return (
    <li>
      <button
        type="button"
        className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${selectedItem === 'Seguridad' ? 'bg-gray-300' : ''}`}
        onClick={() => {
          handleItemClick('Seguridad');
          submenuDropdown();
        }}
      >
        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"

          xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
          <path fill="#c48c00" d="M44,37H4v5c0,1.105,0.895,2,2,2h36c1.105,0,2-0.895,2-2V37z"></path><linearGradient id="mqGAn~AfKUNcLhPwXVdula_EHyUO6ZGSRkX_gr1" x1="24" x2="24" y1="15.647" y2="-.296" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#92a3b0"></stop><stop offset=".015" stop-color="#a3b5c4"></stop><stop offset=".032" stop-color="#aec2d1"></stop><stop offset=".046" stop-color="#b2c6d6"></stop></linearGradient><path fill="url(#mqGAn~AfKUNcLhPwXVdula_EHyUO6ZGSRkX_gr1)" d="M11,13v3h4v-3c0-4.971,4.029-9,9-9h0c4.971,0,9,4.029,9,9v3h4v-3c0-7.18-5.82-13-13-13h0	C16.82,0,11,5.82,11,13z"></path><path fill="#fad500" d="M44,23H4v-5c0-1.105,0.895-2,2-2h36c1.105,0,2,0.895,2,2V23z"></path><rect width="40" height="7" x="4" y="23" fill="#edbe00"></rect><rect width="40" height="7" x="4" y="30" fill="#e3a600"></rect><linearGradient id="mqGAn~AfKUNcLhPwXVdulb_EHyUO6ZGSRkX_gr2" x1="24" x2="24" y1="35.373" y2="27.155" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4b4b4b"></stop><stop offset="1" stop-color="#3b3b3b"></stop></linearGradient><path fill="url(#mqGAn~AfKUNcLhPwXVdulb_EHyUO6ZGSRkX_gr2)" d="M27,29c0-1.657-1.343-3-3-3s-3,1.343-3,3c0,1.304,0.837,2.403,2,2.816V35c0,0.552,0.448,1,1,1	s1-0.448,1-1v-3.184C26.163,31.403,27,30.304,27,29z"></path>
        </svg>
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          Seguridad
        </span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <ul id="dropdown-example" className={`py-2 space-y-2 ${submenuOpen ? '' : 'hidden'}`}>
        <li>
          <Link
            href="/admin/usuarios"
            className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${selectedItem === 'Usuarios' ? 'bg-gray-300' : ''}`}
            onClick={() => handleItemClick('Usuarios')}
          >
            Usuarios
          </Link>
        </li>
        <li>
          <Link
            href="/admin/perfiles"
            className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${selectedItem === 'Perfiles' ? 'bg-gray-300' : ''}`}
            onClick={() => handleItemClick('Perfiles')}
          >
            Perfiles
          </Link>
        </li>
      </ul>
    </li>
  );
}
