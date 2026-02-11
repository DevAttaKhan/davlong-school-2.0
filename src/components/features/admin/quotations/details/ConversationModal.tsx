import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { X, MessageSquare, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversationModalProps {
    isOpen: boolean;
    onClose: () => void;
    leadId: string | number;
}

export const ConversationModal = ({
    isOpen,
    onClose,
    leadId,
}: ConversationModalProps) => {
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    const handleSend = () => {
        if (!message.trim()) return;
        setIsSending(true);
        // Mock sending behavior
        setTimeout(() => {
            setMessage("");
            setIsSending(false);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

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
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-lg">
                                {/* Header */}
                                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={onClose}
                                            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                        <Dialog.Title className="text-lg font-bold text-gray-900">
                                            Conversation History
                                        </Dialog.Title>
                                    </div>
                                    <span className="text-xs font-medium text-gray-400">
                                        0 messages
                                    </span>
                                </div>

                                {/* Subheader */}
                                <div className="px-6 py-3 bg-gray-50 flex justify-center border-b border-gray-100">
                                    <span className="text-sm font-bold text-blue-600">
                                        Lead ID: #{leadId}
                                    </span>
                                </div>

                                {/* Messages Area */}
                                <div className="h-[400px] overflow-y-auto p-6 flex flex-col items-center justify-center bg-white no-scrollbar">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                            <MessageSquare className="h-8 w-8 text-gray-300" />
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-1">
                                            No conversation yet
                                        </h4>
                                        <p className="text-sm text-gray-400">
                                            Start by sending a message below
                                        </p>
                                    </div>
                                </div>

                                {/* Input Area */}
                                <div className="p-6 border-t border-gray-100 bg-white">
                                    <div className="relative">
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
                                            className="w-full h-24 p-4 text-sm text-gray-900 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                        />
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
                                            {message.length}/500 characters
                                        </span>
                                        <button
                                            onClick={handleSend}
                                            disabled={isSending || !message.trim()}
                                            className={cn(
                                                "inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed",
                                                "bg-[#98A2B3] text-white hover:bg-[#828DA0]"
                                            )}
                                        >
                                            {isSending ? "Sending..." : "Send Message"}
                                            <Send className="h-4 w-4" />
                                        </button>
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
