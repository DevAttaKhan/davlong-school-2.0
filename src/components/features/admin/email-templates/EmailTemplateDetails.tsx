import type { EmailTemplate } from "./data";
import { useState, useEffect } from "react";

interface EmailTemplateDetailsProps {
  template: EmailTemplate;
  onClose: () => void;
}

export const EmailTemplateDetails = ({
  template,
  onClose,
}: EmailTemplateDetailsProps) => {
  const [subject, setSubject] = useState(template.subject);
  const [content, setContent] = useState(template.content);

  useEffect(() => {
    setSubject(template.subject);
    setContent(template.content);
  }, [template]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{template.name}</h2>
          <p className="text-sm text-gray-500">Edit email template</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto pr-2">
        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Message Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          />
        </div>

        {/* Template Variables */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">
            Template Variables
          </h4>
          <p className="text-sm text-blue-600 mb-3">
            Variables in curly braces will be replaced with actual values when
            the email is sent.
          </p>
          <div className="space-y-2">
            <p className="text-xs font-medium text-blue-700 uppercase">
              Examples:
            </p>
            <div className="bg-white/50 rounded p-2 text-xs text-blue-800 font-mono space-y-1">
              {template.variables.map((variable) => (
                <div key={variable}>{variable}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
