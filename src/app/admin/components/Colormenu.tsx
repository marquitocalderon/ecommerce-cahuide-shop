import React, { useState } from 'react';

export default function Colormenu({ onColorChange }: { onColorChange: (color: string) => void }) {
    const [color, setColor] = useState("#6590D5");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;
        setColor(newColor);
        onColorChange(newColor); // Llamar a la función para actualizar el color en el componente padre
    };

    return (
        <div className="flex justify-center space-x-2">
            <h4>
                Color:
            </h4>
            <input
                id="nativeColorPicker1"
                type="color"
                value={color}
                onChange={handleChange}
            />
        </div>
    );
}

