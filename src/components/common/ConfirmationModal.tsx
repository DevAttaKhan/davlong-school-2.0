import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    variant?: "danger" | "warning" | "info";
}

export const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isLoading = false,
    variant = "danger",
}: ConfirmationModalProps) => {
    const variantStyles = {
        danger: {
            headerBg: "bg-red-600",
            icon: <AlertCircle className="h-6 w-6 text-white" />,
            confirmBtn: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
        },
        warning: {
            headerBg: "bg-amber-500",
            icon: <AlertTriangle className="h-6 w-6 text-white" />,
            confirmBtn: "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500",
        },
        info: {
            headerBg: "bg-blue-600",
            icon: <Info className="h-6 w-6 text-white" />,
            confirmBtn: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
        },
    };

    const currentVariant = variantStyles[variant];

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[1000]" onClose={onClose}>
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
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                {/* Header */}
                                <div className={cn("px-6 py-4 flex items-center gap-3", currentVariant.headerBg)}>
                                    <div className="shrink-0">
                                        {currentVariant.icon}
                                    </div>
                                    <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-white flex-1">
                                        {title}
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="bg-white px-6 py-8">
                                    <div className="mt-2">
                                        <p className="text-base text-gray-500 leading-relaxed text-center">
                                            {message}
                                        </p>
                                    </div>
                                </div>

                                {/* Footer / Actions */}
                                <div className="bg-gray-50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-center gap-3 border-t border-gray-100">
                                    <button
                                        type="button"
                                        className="w-full sm:w-32 inline-flex justify-center items-center px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-all shadow-sm"
                                        onClick={onClose}
                                        disabled={isLoading}
                                    >
                                        {cancelText}
                                    </button>
                                    <button
                                        type="button"
                                        disabled={isLoading}
                                        className={cn(
                                            "w-full sm:w-32 inline-flex justify-center items-center px-4 py-2.5 rounded-xl text-white font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50",
                                            currentVariant.confirmBtn
                                        )}
                                        onClick={onConfirm}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4 text-white mr-2" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                ...
                                            </>
                                        ) : confirmText}
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
