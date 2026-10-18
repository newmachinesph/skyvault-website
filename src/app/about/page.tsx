import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import {
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const values = [
  {
    name: "Craftsmanship",
    description:
      "Every cab we design reflects decades of expertise in elevator interiors, combining premium materials with precision engineering.",
    icon: SparklesIcon,
  },
  {
    name: "Safety First",
    description:
      "All configurations are validated against current building codes and accessibility standards before reaching your inbox.",
    icon: ShieldCheckIcon,
  },
  {
    name: "Client Partnership",
    description:
      "We work closely with architects, contractors, and building owners to deliver elevator cabs that exceed expectations.",
    icon: UserGroupIcon,
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero */}
      <div className="relative isolate overflow-hidden bg-navy-800 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            About SKYVAULT
          </h1>
          <p className="mt-6 text-lg/8 text-white/70">
            We specialize in custom elevator cab design and manufacturing,
            bringing together cutting-edge technology and timeless
            craftsmanship.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2">
            <div>
              <h2 className="text-base/7 font-semibold text-brand-500">
                Our Mission
              </h2>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-navy-800 sm:text-4xl">
                Elevating spaces, one cab at a time
              </p>
              <p className="mt-6 text-lg/8 text-navy-400">
                SKYVAULT was founded with a simple belief: every elevator ride
                should be an experience. From luxury residential towers to
                high-traffic commercial buildings, we create elevator interiors
                that are beautiful, durable, and built to code.
              </p>
            </div>
            <div>
              <p className="text-base/7 text-navy-400">
                Our interactive 3D configurator puts the design process in your
                hands. Choose from a curated selection of materials, finishes,
                and accessories &mdash; and see your cab come to life in
                real-time before placing your order.
              </p>
              <p className="mt-6 text-base/7 text-navy-400">
                With over 500 projects delivered, our team of designers and
                engineers brings deep industry knowledge to every configuration.
                We handle everything from initial design through manufacturing,
                quality inspection, and delivery.
              </p>
              <p className="mt-6 text-base/7 text-navy-400">
                Based in the United States, SKYVAULT serves architects, general
                contractors, building owners, and elevator companies nationwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-brand-500">
              Our Values
            </h2>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-navy-800 sm:text-4xl">
              What drives us
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {values.map((value) => (
                <div key={value.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-navy-800">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy-800">
                      <value.icon
                        aria-hidden="true"
                        className="size-6 text-brand-400"
                      />
                    </div>
                    {value.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base/7 text-navy-400">
                    <p className="flex-auto">{value.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-navy-800 sm:text-4xl">
              Ready to design your cab?
            </h2>
            <p className="mt-4 text-lg/8 text-navy-400">
              Use our configurator or reach out to discuss your project.
            </p>
          </div>
          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:shrink-0">
            <Link
              href="/configure"
              className="rounded-md bg-brand-400 px-3.5 py-2.5 text-sm font-semibold text-navy-900 shadow-xs hover:bg-brand-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              Start Configuring
            </Link>
            <Link
              href="/contact"
              className="text-sm/6 font-semibold text-navy-800"
            >
              Contact Us <span aria-hidden="true">&rarr;</span>
            </Link>
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
