import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { ScrollElevator } from "@/components/ScrollElevator";
import { HeroVideo } from "@/components/HeroVideo";
import {
  CubeIcon,
  SwatchIcon,
  CogIcon,
  ShieldCheckIcon,
  ClockIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Choose Cab Size",
    description:
      "Select from passenger, freight, or service elevator cabs with precise dimensions and capacity specifications.",
    icon: CubeIcon,
  },
  {
    name: "Pick Finishes",
    description:
      "Choose wall finishes, floor materials, ceiling types, and handrails from our curated collection of premium options.",
    icon: SwatchIcon,
  },
  {
    name: "Add Options",
    description:
      "Configure lighting, mirrors, and accessories including security cameras, emergency phones, and control panels.",
    icon: CogIcon,
  },
];

export default function HomePage() {
  return (
    <div className="bg-white">
      <Navbar />
      <ScrollElevator />

      {/* Hero */}
      <div className="relative isolate overflow-hidden">
        {/* Video background */}
        <HeroVideo />
        <div className="absolute inset-0 bg-navy-900/60" />

        <div className="relative px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-40">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm/6 text-white/80 ring-1 ring-white/20 hover:ring-white/40">
                Interactive 3D preview included.{" "}
                <Link
                  href="/configure"
                  className="font-semibold text-brand-400"
                >
                  <span aria-hidden="true" className="absolute inset-0" />
                  Try it now <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                Design Your Custom Elevator Cab
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-white/70 sm:text-xl/8">
                Configure your elevator cab by selecting the size, materials,
                finishes, and options. Visualize in 3D and get a detailed
                specification summary.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/configure"
                  className="rounded-md bg-brand-400 px-3.5 py-2.5 text-sm font-semibold text-navy-900 shadow-xs hover:bg-brand-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                >
                  Start Configuring
                </Link>
                <a
                  href="#features"
                  className="text-sm/6 font-semibold text-white"
                >
                  Learn more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-brand-500">
              Simple 3-Step Process
            </h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-navy-800 sm:text-5xl lg:text-balance">
              Configure your elevator cab in minutes
            </p>
            <p className="mt-6 text-lg/8 text-navy-400">
              Our intuitive configurator walks you through every decision with
              real-time 3D visualization, smart validation, and instant
              specification summaries.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-navy-800">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy-800">
                      <feature.icon
                        aria-hidden="true"
                        className="size-6 text-brand-400"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base/7 text-navy-400">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Why SKYVAULT */}
      <div className="bg-navy-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-brand-400">
              Why SKYVAULT
            </h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance">
              Trusted by professionals worldwide
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex size-12 items-center justify-center rounded-lg bg-brand-400/10 mb-4">
                <BuildingOffice2Icon className="size-6 text-brand-400" />
              </div>
              <dt className="text-3xl font-bold text-white">500+</dt>
              <dd className="mt-1 max-w-64 text-sm text-white/60">
                Projects completed across commercial and residential buildings
              </dd>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex size-12 items-center justify-center rounded-lg bg-brand-400/10 mb-4">
                <ShieldCheckIcon className="size-6 text-brand-400" />
              </div>
              <dt className="text-3xl font-bold text-white">100%</dt>
              <dd className="mt-1 max-w-64 text-sm text-white/60">
                Code-compliant designs meeting all safety and accessibility
                standards
              </dd>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex size-12 items-center justify-center rounded-lg bg-brand-400/10 mb-4">
                <ClockIcon className="size-6 text-brand-400" />
              </div>
              <dt className="text-3xl font-bold text-white">24 hrs</dt>
              <dd className="mt-1 max-w-64 text-sm text-white/60">
                Average turnaround from configuration to detailed quote delivery
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-navy-800 sm:text-5xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg/8 text-navy-400">
              Design your custom elevator cab in minutes with our interactive
              3D configurator.
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
