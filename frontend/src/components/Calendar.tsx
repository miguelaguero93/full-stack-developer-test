import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);


type CalendarProps = {
    fechas: string[];
    seleccionada: string | null;
    onSelect: (f: string) => void;
};

export default function Calendar({ fechas, seleccionada, onSelect }: CalendarProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {fechas.map((fecha) => {
                const obj = dayjs(fecha);
                const activa = fecha === seleccionada;
                return (
                    <div
                        key={fecha}
                        onClick={() => onSelect(fecha)}
                        className={`p-4 rounded-xl text-center cursor-pointer transition-all duration-200 transform shadow-sm 
            ${
                            activa
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white dark:bg-zinc-800 dark:text-white hover:bg-blue-50 dark:hover:bg-zinc-700'
                        }`}
                    >
                        <div className="text-sm font-semibold capitalize">{obj.format('dddd')}</div>
                        <div className="text-2xl font-bold">{obj.format('D')}</div>
                        <div className="text-sm capitalize">{obj.format('MMMM')}</div>
                    </div>
                );
            })}
        </div>
    );
}
