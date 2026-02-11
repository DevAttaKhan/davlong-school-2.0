import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X, History, ChevronRight } from "lucide-react";

interface BookingHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    schoolName: string;
}

export const BookingHistoryModal = ({
    isOpen,
    onClose,
    schoolName,
}: BookingHistoryModalProps) => {
    // Mock data for school history
    const history = [
        {
            id: "BK-7721",
            date: "10 Feb 2026",
            route: "MTSM → Páirc Uí Chaoimh",
            status: "Completed",
            price: "€495.00"
        },
        {
            id: "BK-7654",
            date: "05 Feb 2026",
            route: "MTSM → Dublin Airport",
            status: "Completed",
            price: "€650.00"
        },
        {
            id: "BK-7601",
            date: "01 Feb 2026",
            route: "MTSM → Cork Center",
            status: "Completed",
            price: "€320.00"
        }
    ];

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[1001]" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all w-full max-w-lg">
                                {/* Header */}
                                <div className="px-6 py-4 bg-blue-600 flex items-center gap-3">
                                    <div className="shrink-0 p-2 bg-white/20 rounded-lg">
                                        <History className="h-6 w-6 text-white" />
                                    </div>
                                    <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-white flex-1">
                                        Booking History • {schoolName}
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="bg-white p-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-500">
                                            Recent bookings from this school
                                        </p>
                                        <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded">
                                            {history.length} bookings total
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        {history.map((item) => (
                                            <div key={item.id} className="p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer group">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs font-bold text-gray-900">{item.id}</span>
                                                    <span className="text-[10px] font-bold text-gray-400">{item.date}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-gray-600">{item.route}</p>
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-sm font-bold text-green-600">{item.price}</span>
                                                        <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="w-full mt-6 py-3 bg-gray-50 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors">
                                        View Full History Report
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
