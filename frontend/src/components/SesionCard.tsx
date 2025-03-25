import { FaClock } from 'react-icons/fa';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export default function SesionCard({ sesion, onClick }: any) {
    const inicio = dayjs(sesion.start_datetime);
    const fin = dayjs(sesion.end_datetime);

    return (
        <div
            onClick={() => onClick(sesion)}
            className="border border-gray-200 dark:border-zinc-700 p-5 rounded-xl w-full sm:w-64 cursor-pointer bg-white dark:bg-zinc-800 dark:text-white hover:shadow-md hover:-translate-y-1 transition-all"
        >
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-2">{sesion.nombre}</h3>
            <p className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <FaClock className="mr-2" />
                {inicio.format('HH:mm')} - {fin.format('HH:mm')}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Cupo: {sesion.cuposRestantes}</p>
        </div>
    );
}
