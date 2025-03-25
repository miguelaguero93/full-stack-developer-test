import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FaUserPlus } from 'react-icons/fa'
import dayjs from "dayjs";

export default function SesionModal({ open, onClose, sesion, estudiantes, onAsignar }: any) {
    const [estudianteId, setEstudianteId] = useState<number | null>(null);

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white dark:bg-zinc-900 dark:text-white p-6 shadow-xl transition-all">
                                <Dialog.Title className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <FaUserPlus className="text-blue-600" /> Asignar a {sesion?.nombre}
                                </Dialog.Title>

                                <div className="text-sm space-y-1 mb-4">
                                    <p><strong>Fecha:</strong> {dayjs(sesion?.start_datetime).format('DD/MM/YYYY')}</p>
                                    <p><strong>Horario:</strong> {dayjs(sesion?.start_datetime).format('HH:mm')} - {dayjs(sesion?.end_datetime).format('HH:mm')}</p>
                                    <p><strong>Cupo:</strong> {sesion?.cuposRestantes}</p>
                                </div>

                                <label className="block text-sm font-medium mb-1">Selecciona estudiante:</label>
                                <select
                                    className="w-full border border-gray-300 rounded p-2 mb-4 dark:bg-zinc-800"
                                    onChange={(e) => setEstudianteId(Number(e.target.value))}
                                    value={estudianteId ?? ''}
                                >
                                    <option value="">-- Selecciona --</option>
                                    {estudiantes.map((e) => (
                                        <option key={e.id} value={e.id}>{e.nombre}</option>
                                    ))}
                                </select>

                                <div className="flex justify-end gap-2">
                                    <button
                                        className="px-4 py-2 rounded border text-sm dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-zinc-700"
                                        onClick={onClose}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                                        disabled={!estudianteId}
                                        onClick={() => {
                                            onAsignar(estudianteId);
                                            onClose();
                                        }}
                                    >
                                        Asignar
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
