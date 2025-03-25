import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Calendar from '../components/Calendar';
import SesionCard from '../components/SesionCard';
import SesionModal from '../components/SesionModal';
import API from '../api/api';
import dayjs from 'dayjs';

export default function Home() {
    const [sesiones, setSesiones] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState<string | null>(null);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [sesionActual, setSesionActual] = useState<any>(null);

    useEffect(() => {
        API.get('/sesiones').then((res) => setSesiones(res.data));
        API.get('/estudiantes').then((res) => setEstudiantes(res.data));
    }, []);

    const fechasUnicas = Array.from(
        new Set(
            sesiones.map((s: any) =>
                dayjs(s.start_datetime).format('YYYY-MM-DD'),
            ),
        ),
    );

    const sesionesFiltradas = fechaSeleccionada
        ? sesiones.filter((s: any) =>
            dayjs(s.start_datetime).format('YYYY-MM-DD') === fechaSeleccionada,
        )
        : null;

    const asignar = (estudianteId: number) => {
        API.post('/asignaciones', {
            estudianteId,
            sesionId: sesionActual.id,
        }).then(() => {
                API.get('/sesiones').then((res) => setSesiones(res.data));
                alert('✅ Estudiante asignado correctamente.')
        }
        ).catch((error) => alert(`❌ Error al asignar estudiante: ${error.response.data.message}`));
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 transition text-gray-800 dark:text-white">
            <Header />
            <main className="p-6 max-w-6xl mx-auto">
                <section>
                    <h2 className="text-xl font-semibold mb-4">Calendario:</h2>
                    <Calendar
                        fechas={fechasUnicas}
                        seleccionada={fechaSeleccionada}
                        onSelect={setFechaSeleccionada}
                    />
                </section>

                {sesionesFiltradas && (
                    <section className="mt-10">
                    <h2 className="text-xl font-semibold mb-4">Sesiones disponibles:</h2>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {sesionesFiltradas.map((s: any) => (
                            <SesionCard
                                key={s.id}
                                sesion={s}
                                onClick={(s: any) => {
                                    setSesionActual(s);
                                    setModalAbierto(true);
                                }}
                            />
                        ))}
                    </div>
                </section>
                )}
            </main>

            <SesionModal
                open={modalAbierto}
                onClose={() => setModalAbierto(false)}
                sesion={sesionActual}
                estudiantes={estudiantes}
                onAsignar={asignar}
            />
        </div>
    );
}
