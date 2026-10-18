"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // For now just show success — hook up to an API later
    setSubmitted(true);
  }

  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero */}
      <div className="relative isolate overflow-hidden bg-navy-800 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-6 text-lg/8 text-white/70">
            Have a question or ready to start your project? We&apos;d love to
            hear from you.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-2">
          {/* Contact info */}
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-navy-800">
              Get in touch
            </h2>
            <p className="mt-4 text-lg/8 text-navy-400">
              Whether you need help with a configuration, want a custom quote,
              or have a general inquiry, our team is ready to assist.
            </p>

            <dl className="mt-10 space-y-6">
              <div className="flex gap-x-4">
                <dt>
                  <BuildingOffice2Icon className="size-6 text-brand-400" />
                </dt>
                <dd className="text-sm/6 text-navy-400">
                  1234 Elevator Blvd, Suite 500
                  <br />
                  New York, NY 10001
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt>
                  <PhoneIcon className="size-6 text-brand-400" />
                </dt>
                <dd>
                  <a
                    href="tel:+1-555-000-0000"
                    className="text-sm/6 text-navy-400 hover:text-navy-800"
                  >
                    +1 (555) 000-0000
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt>
                  <EnvelopeIcon className="size-6 text-brand-400" />
                </dt>
                <dd>
                  <a
                    href="mailto:info@skyvault.com"
                    className="text-sm/6 text-navy-400 hover:text-navy-800"
                  >
                    info@skyvault.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="rounded-lg bg-brand-50 p-8 text-center">
                <h3 className="text-lg font-semibold text-navy-800">
                  Thank you!
                </h3>
                <p className="mt-2 text-sm text-navy-400">
                  We&apos;ve received your message and will be in touch within
                  one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm/6 font-medium text-navy-800"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-navy-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-400 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-sm/6 font-medium text-navy-800"
                    >
                      Company
                    </label>
                    <div className="mt-2">
                      <input
                        id="contact-company"
                        type="text"
                        value={form.company}
                        onChange={(e) =>
                          setForm({ ...form, company: e.target.value })
                        }
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-navy-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-400 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm/6 font-medium text-navy-800"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-navy-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-400 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm/6 font-medium text-navy-800"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        id="contact-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-navy-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-400 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm/6 font-medium text-navy-800"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Tell us about your project or question..."
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-navy-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-400 sm:text-sm/6"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="rounded-md bg-brand-400 px-3.5 py-2.5 text-sm font-semibold text-navy-900 shadow-xs hover:bg-brand-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-navy-800">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <Image
              src="/logo.svg"
              alt="SKYVAULT"
              width={100}
              height={24}
              className="h-6 w-auto brightness-0 invert mx-auto md:mx-0"
            />
            <nav className="mt-6 flex justify-center gap-x-8 md:mt-0">
              <Link
                href="/about"
                className="text-sm text-white/60 hover:text-white"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm text-white/60 hover:text-white"
              >
                Contact
              </Link>
              <Link
                href="/configure"
                className="text-sm text-white/60 hover:text-white"
              >
                Configure
              </Link>
            </nav>
          </div>
          <div className="mt-8 border-t border-white/10 pt-8">
            <p className="text-center text-sm text-white/40">
              &copy; {new Date().getFullYear()} SKYVAULT. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
