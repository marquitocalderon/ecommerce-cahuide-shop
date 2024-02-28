import React, { ReactNode } from 'react';
import Dashboard from "./components/Dashboard";

interface AdminitradorProps {
    children: ReactNode;
}

export const metadata = {
    title: 'Panel Admin',
    description: 'Panel Admin',
}

export default function Adminitrador({ children }: AdminitradorProps) {
    return (
        <div>
            <Dashboard hijo={children}></Dashboard>
        </div>
    );
}
