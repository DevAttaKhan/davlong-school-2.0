import { useState } from "react";
import { dummyEmailTemplates, type EmailTemplate } from "./data";
import { EmailTemplateDetails } from "./EmailTemplateDetails";
import { EmailTemplateMobileCard } from "./EmailTemplateMobileCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronRight } from "lucide-react";
import { BottomDrawer } from "@/components/common/BottomDrawer";

export const AdminEmailTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplate | null>(null);
  const isMobile = useIsMobile();

  // Desktop: Select first template by default if none selected
  // Actually, standard behavior usually is nothing selected or first one.
  // The image shows "pickup_reminder_user" selected on the right.
  // Let's default to null, but if user clicks, it shows.
  // Or maybe on desktop we can just show the list and when clicked it opens.
  // The image shows split view: List on left, Details on right.

  const handleTemplateClick = (template: EmailTemplate) => {
    setSelectedTemplate(template);
  };

  const closeDetails = () => {
    setSelectedTemplate(null);
  };

  return (
    <div className="p-4 sm:p-6 h-[calc(100vh-80px)]">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Email Templates</h1>

      <div className="flex gap-6 h-[calc(100%-60px)]">
        {/* List Section */}
        <div
          className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col ${
            selectedTemplate && !isMobile ? "w-1/3" : "w-full"
          } transition-all duration-300`}
        >
          <div className="overflow-y-auto flex-1">
            {dummyEmailTemplates.map((template) =>
              isMobile ? (
                <EmailTemplateMobileCard
                  key={template.id}
                  template={template}
                  onClick={() => handleTemplateClick(template)}
                />
              ) : (
                <div
                  key={template.id}
                  onClick={() => handleTemplateClick(template)}
                  className={`p-4 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 last:border-0 ${
                    selectedTemplate?.id === template.id ? "bg-blue-50" : ""
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      selectedTemplate?.id === template.id
                        ? "text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    {template.name}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 ${
                      selectedTemplate?.id === template.id
                        ? "text-blue-500"
                        : "text-gray-400"
                    }`}
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Desktop Detail Section */}
        {!isMobile && selectedTemplate && (
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-hidden">
            <EmailTemplateDetails
              template={selectedTemplate}
              onClose={closeDetails}
            />
          </div>
        )}
      </div>

      {/* Mobile Bottom Drawer */}
      <BottomDrawer
        isOpen={!!selectedTemplate && isMobile}
        onClose={closeDetails}
        title={selectedTemplate?.name || "Edit Template"}
      >
        {selectedTemplate && (
          <div className="p-4 h-[80vh] overflow-y-auto">
            {/* Pass a dummy onClose that doesn't necessarily close it if we want save to close? 
                 Actually, just pass closeDetails. 
                 The Drawer handles the close button, but the internal Cancel button should also close it. */}
            <EmailTemplateDetails
              template={selectedTemplate}
              onClose={closeDetails}
            />
          </div>
        )}
      </BottomDrawer>
    </div>
  );
};
