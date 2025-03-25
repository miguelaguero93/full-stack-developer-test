import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function Header() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
    }, [dark]);

    return (
        <header
            className="p-4 border-b bg-white dark:bg-zinc-900 dark:text-white shadow-sm flex items-center justify-between">
            <h1 className="text-xl font-bold flex items-center gap-2">
                <span className="text-2xl">🎓</span> Gestor de Sesiones
            </h1>
            <button
                onClick={() => setDark(!dark)}
                className="text-xl hover:scale-110 transition"
                aria-label="Toggle dark mode"
            >
                {dark ? <FaSun/> : <FaMoon/>}
            </button>
        </header>
    );
}
