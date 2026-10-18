"use client";

import { useConfigurator } from "./ConfiguratorContext";

export function ContactStep() {
  const { lead, updateLead } = useConfigurator();

  return (
    <div className="space-y-10">
      <div className="border-b border-gray-900/10 pb-6">
        <h2 className="text-base/7 font-semibold text-gray-900">
          Contact Information
        </h2>
        <p className="mt-1 text-sm/6 text-gray-600">
          Tell us about yourself and your project so we can follow up.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="name"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="name"
              type="text"
              value={lead.name}
              onChange={(e) => updateLead({ name: e.target.value })}
              placeholder="John Doe"
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-400 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="company"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Company <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="company"
              type="text"
              value={lead.company}
              onChange={(e) => updateLead({ company: e.target.value })}
              placeholder="Acme Construction"
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-400 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="email"
              type="email"
              value={lead.email}
              onChange={(e) => updateLead({ email: e.target.value })}
              placeholder="john@acme.com"
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-400 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="phone"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Phone Number
          </label>
          <div className="mt-2">
            <input
              id="phone"
              type="tel"
              value={lead.phone}
              onChange={(e) => updateLead({ phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-400 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="projectInfo"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Project Information
          </label>
          <div className="mt-2">
            <textarea
              id="projectInfo"
              value={lead.projectInfo}
              onChange={(e) => updateLead({ projectInfo: e.target.value })}
              rows={4}
              placeholder="Tell us about your project - building type, number of floors, timeline, etc."
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-400 sm:text-sm/6"
            />
          </div>
          <p className="mt-3 text-sm/6 text-gray-600">
            Include building type, number of floors, timeline, and any special
            requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
