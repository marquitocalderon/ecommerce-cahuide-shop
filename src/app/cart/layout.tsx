
import Navbar from '@/components/Navbar/Navbar';
import React, { ReactNode } from 'react';


interface Props {
    children: ReactNode;
}

export const metadata = {
    title: 'Carrito',
    description: 'Carrito',
}

export default function Carrito({ children }: Props) {
    return (
        <div>
            <Navbar></Navbar>
            {children}
        </div>
    );
}
