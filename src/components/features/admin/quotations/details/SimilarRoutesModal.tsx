import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { X, MapPin, Gauge, Users, Clock, Euro, Filter, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { ILeadDetails } from "@/types/lead.interface";

interface SimilarRoutesModalProps {
    isOpen: boolean;
    onClose: () => void;
    quotation: ILeadDetails;
}

export const SimilarRoutesModal = ({
    isOpen,
    onClose,
    quotation,
}: SimilarRoutesModalProps) => {
    const [filter, setFilter] = useState("Same Journey");

    // Mock data for similar routes
    const similarRoutes = [
        {
            id: "MTSM-001",
            passengers: 53,
            distance: "139.24 km",
            school: "MTSM",
            date: "13 Feb 2026",
            type: "Round",
            price: "€495.00",
        },
        // Add more mock data if needed
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all w-full max-w-[1000px] flex flex-col h-[85vh]">
                                {/* Header */}
                                <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between shrink-0">
                                    <Dialog.Title className="text-xl font-bold text-gray-900">
                                        Similar Routes • ID #{quotation.id}
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="flex-1 flex min-h-0">
                                    {/* Left Sidebar: Current Quotation Summary */}
                                    <div className="w-[320px] bg-blue-50/30 border-r border-blue-100/50 p-6 overflow-y-auto no-scrollbar shrink-0">
                                        <div className="flex items-center gap-2 mb-6 text-blue-800 font-bold">
                                            <div className="p-1.5 bg-blue-100 rounded-lg">
                                                <MapPin className="h-4 w-4" />
                                            </div>
                                            Current Quotation
                                        </div>

                                        <div className="space-y-8">
                                            {/* Outbound */}
                                            <div className="relative">
                                                <div className="absolute left-[11px] top-[24px] bottom-[-24px] w-0.5 bg-blue-200" />
                                                <h5 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-4">Outbound Journey</h5>

                                                <div className="space-y-6">
                                                    <div className="flex gap-3 relative z-10">
                                                        <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
                                                            <span className="text-[8px] font-bold text-white">V</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Depart From</p>
                                                            <p className="text-xs font-bold text-gray-900 leading-tight">
                                                                {quotation.outbound_trip?.pickup_location}
                                                            </p>
                                                            <p className="text-[10px] text-gray-500 mt-0.5">
                                                                {quotation.outbound_trip?.pickup_date && format(new Date(quotation.outbound_trip.pickup_date), "dd MMM yyyy • h:mm a")}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-3 relative z-10">
                                                        <div className="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center shrink-0">
                                                            <span className="text-[8px] font-bold text-white">P</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Arrive At</p>
                                                            <p className="text-xs font-bold text-gray-900 leading-tight">
                                                                {quotation.outbound_trip?.dropoff_location}
                                                            </p>
                                                            <p className="text-[10px] text-gray-500 mt-0.5">
                                                                {quotation.outbound_trip?.pickup_date && format(new Date(quotation.outbound_trip.pickup_date), "dd MMM yyyy • h:mm a")} (estimated)
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Return (if any) */}
                                            {quotation.return_trip && (
                                                <div className="relative pt-2">
                                                    <div className="absolute left-[11px] top-[24px] bottom-[-24px] w-0.5 bg-blue-200" />
                                                    <h5 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-4">Return Journey</h5>

                                                    <div className="space-y-6">
                                                        <div className="flex gap-3 relative z-10">
                                                            <div className="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center shrink-0">
                                                                <span className="text-[8px] font-bold text-white">P</span>
                                                            </div>
                                                            <div>
                                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Depart From</p>
                                                                <p className="text-xs font-bold text-gray-900 leading-tight">
                                                                    {quotation.return_trip.pickup_location}
                                                                </p>
                                                                <p className="text-[10px] text-gray-500 mt-0.5">
                                                                    {format(new Date(quotation.return_trip.pickup_date), "dd MMM yyyy • h:mm a")}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-3 relative z-10">
                                                            <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center shrink-0">
                                                                <span className="text-[8px] font-bold text-blue-600">V</span>
                                                            </div>
                                                            <div>
                                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Return To</p>
                                                                <p className="text-xs font-bold text-gray-900 leading-tight">
                                                                    {quotation.return_trip.dropoff_location}
                                                                </p>
                                                                <p className="text-[10px] text-gray-500 mt-0.5">
                                                                    {format(new Date(quotation.return_trip.pickup_date), "dd MMM yyyy • h:mm a")} (estimated)
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Stats */}
                                            <div className="grid grid-cols-2 gap-4 pt-4">
                                                <div>
                                                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Distance</p>
                                                    <p className="text-xs font-bold text-gray-900 flex items-center gap-1">
                                                        <Gauge className="h-3 w-3 text-blue-600" />
                                                        {quotation.outbound_trip?.distance || "0 km"}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Duration</p>
                                                    <p className="text-xs font-bold text-gray-900 flex items-center gap-1">
                                                        <Clock className="h-3 w-3 text-blue-600" />
                                                        {quotation.outbound_trip?.duration || "0 hrs"}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Passengers</p>
                                                    <p className="text-xs font-bold text-gray-900 flex items-center gap-1">
                                                        <Users className="h-3 w-3 text-blue-600" />
                                                        {quotation.number_of_passengers || 0}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Price</p>
                                                    <p className="text-xs font-bold text-green-600 flex items-center gap-1">
                                                        <Euro className="h-3 w-3" />
                                                        {quotation.estimated_price || "0.00"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Content: Comparisons and Table */}
                                    <div className="flex-1 p-8 flex flex-col min-h-0">
                                        {/* Filters */}
                                        <div className="mb-8 flex items-center justify-between">
                                            <div className="relative">
                                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-medium text-gray-600 shadow-sm hover:bg-gray-50 transition-all">
                                                    <div className="p-1 bg-blue-100 rounded">
                                                        <Filter className="h-2.5 w-2.5 text-blue-600" />
                                                    </div>
                                                    Filter by School
                                                    <ChevronRight className="h-3 w-3 rotate-90 text-gray-400" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Comparison Cards */}
                                        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 no-scrollbar">
                                            <button
                                                className={cn(
                                                    "flex flex-col items-center justify-center min-w-[140px] px-6 py-4 rounded-2xl border transition-all text-center",
                                                    filter === "Same Journey"
                                                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
                                                        : "bg-white border-gray-100 text-gray-500 hover:border-blue-200"
                                                )}
                                                onClick={() => setFilter("Same Journey")}
                                            >
                                                <p className="text-[11px] font-bold mb-1">Same Journey</p>
                                                <p className={cn("text-[9px]", filter === "Same Journey" ? "text-blue-100" : "text-gray-400")}>+12 passengers</p>
                                            </button>

                                            <button
                                                className={cn(
                                                    "flex flex-col items-center justify-center min-w-[140px] px-6 py-4 rounded-2xl border transition-all text-center",
                                                    filter === "Distance"
                                                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
                                                        : "bg-white border-gray-100 text-gray-500 hover:border-blue-200"
                                                )}
                                                onClick={() => setFilter("Distance")}
                                            >
                                                <p className="text-[11px] font-bold mb-1">Distance</p>
                                                <p className={cn("text-[9px]", filter === "Distance" ? "text-blue-100" : "text-gray-400")}>+25 km & +12 pass.</p>
                                            </button>

                                            <button
                                                className={cn(
                                                    "flex flex-col items-center justify-center min-w-[140px] px-6 py-4 rounded-2xl border transition-all text-center",
                                                    filter === "Passengers"
                                                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
                                                        : "bg-white border-gray-100 text-gray-500 hover:border-blue-200"
                                                )}
                                                onClick={() => setFilter("Passengers")}
                                            >
                                                <p className="text-[11px] font-bold mb-1">Passengers</p>
                                                <p className={cn("text-[9px]", filter === "Passengers" ? "text-blue-100" : "text-gray-400")}>+12 pass. & ±25 km</p>
                                            </button>

                                            <button
                                                className={cn(
                                                    "flex flex-col items-center justify-center min-w-[140px] px-6 py-4 rounded-2xl border transition-all text-center",
                                                    filter === "Duration"
                                                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
                                                        : "bg-white border-gray-100 text-gray-500 hover:border-blue-200"
                                                )}
                                                onClick={() => setFilter("Duration")}
                                            >
                                                <p className="text-[11px] font-bold mb-1">Duration</p>
                                                <p className={cn("text-[9px]", filter === "Duration" ? "text-blue-100" : "text-gray-400")}>±5 min & ±12 pass.</p>
                                            </button>

                                            <button
                                                className={cn(
                                                    "flex flex-col items-center justify-center min-w-[140px] px-6 py-4 rounded-2xl border transition-all text-center",
                                                    filter === "Price"
                                                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
                                                        : "bg-white border-gray-100 text-gray-500 hover:border-blue-200"
                                                )}
                                                onClick={() => setFilter("Price")}
                                            >
                                                <p className="text-[11px] font-bold mb-1">Price</p>
                                                <p className={cn("text-[9px]", filter === "Price" ? "text-blue-100" : "text-gray-400")}>±€ & ±12 pass.</p>
                                            </button>
                                        </div>

                                        <div className="mb-4 flex items-center justify-between">
                                            <p className="text-[10px] font-medium text-gray-500">
                                                Showing <span className="font-bold text-blue-600">{similarRoutes.length}</span> results
                                            </p>
                                            <p className="text-[9px] font-medium text-gray-400">
                                                Exact journey • ±12 passengers
                                            </p>
                                        </div>

                                        {/* Table */}
                                        <div className="flex-1 overflow-y-auto border border-gray-100 rounded-2xl no-scrollbar overflow-hidden">
                                            <table className="w-full text-left border-collapse">
                                                <thead className="sticky top-0 bg-gray-50 border-b border-gray-100 z-10">
                                                    <tr>
                                                        <th className="pl-6 py-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest w-10"></th>
                                                        <th className="px-4 py-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Passengers</th>
                                                        <th className="px-4 py-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Distance</th>
                                                        <th className="px-4 py-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest">School</th>
                                                        <th className="px-4 py-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                                        <th className="px-4 py-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Type</th>
                                                        <th className="px-4 py-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50 px-6">
                                                    {similarRoutes.map((route) => (
                                                        <tr key={route.id} className="hover:bg-blue-50/50 transition-colors group">
                                                            <td className="pl-6 py-4">
                                                                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-blue-400 transition-colors" />
                                                            </td>
                                                            <td className="px-4 py-4 text-xs font-bold text-gray-900">{route.passengers}</td>
                                                            <td className="px-4 py-4 text-xs font-bold text-gray-900">{route.distance}</td>
                                                            <td className="px-4 py-4 text-xs font-bold text-gray-600">{route.school}</td>
                                                            <td className="px-4 py-4 text-xs font-bold text-gray-600">{route.date}</td>
                                                            <td className="px-4 py-4">
                                                                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">
                                                                    {route.type}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-4 text-xs font-bold text-green-600">{route.price}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
