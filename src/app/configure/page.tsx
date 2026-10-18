"use client";

import { useState, lazy, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  ConfiguratorProvider,
  useConfigurator,
} from "@/components/configurator/ConfiguratorContext";
import { StepIndicator } from "@/components/configurator/StepIndicator";
import { CabSizeStep } from "@/components/configurator/CabSizeStep";
import { FinishesStep } from "@/components/configurator/FinishesStep";
import { OptionsStep } from "@/components/configurator/OptionsStep";
import { ContactStep } from "@/components/configurator/ContactStep";
import { PreviewPanel } from "@/components/configurator/PreviewPanel";
import { CubeIcon, XMarkIcon } from "@heroicons/react/24/outline";

const CabViewer3D = lazy(() =>
  import("@/components/configurator/CabViewer3D").then((m) => ({
    default: m.CabViewer3D,
  }))
);

function ConfiguratorContent() {
  const router = useRouter();
  const {
    step,
    setStep,
    config,
    lead,
    errors,
    isSubmitting,
    setIsSubmitting,
    setSubmittedId,
  } = useConfigurator();

  const steps = [CabSizeStep, FinishesStep, OptionsStep, ContactStep];
  const CurrentStep = steps[step];

  function canProceed(): boolean {
    switch (step) {
      case 0:
        return !!config.cabType && !!config.cabSize;
      case 1: {
        const hasFinishErrors = errors.some((e) =>
          ["wallFinish", "floorType", "ceilingType", "handrail"].includes(e.field)
        );
        return (
          !!config.wallFinish &&
          !!config.floorType &&
          !!config.ceilingType &&
          !!config.handrail &&
          !hasFinishErrors
        );
      }
      case 2:
        return !!config.lighting && errors.length === 0;
      case 3:
        return (
          !!lead.name &&
          !!lead.company &&
          !!lead.email &&
          errors.length === 0
        );
      default:
        return false;
    }
  }

  async function handleSubmit() {
    if (!canProceed()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/configurations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config, lead }),
      });
      if (!res.ok) throw new Error("Failed to submit configuration");
      const data = await res.json();
      setSubmittedId(data.id);
      router.push(`/summary/${data.id}`);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image src="/logo.svg" alt="SKYVAULT" width={140} height={34} className="h-8 w-auto" />
          </Link>
          <Link
            href="/"
            className="text-sm/6 font-semibold text-navy-800 hover:text-brand-500"
          >
            <span aria-hidden="true">&larr;</span> Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <StepIndicator currentStep={step} />

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Main content */}
          <div>
            <CurrentStep />

            <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                disabled={step === 0}
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Back
              </button>

              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="rounded-md bg-brand-400 px-3.5 py-2.5 text-sm font-semibold text-navy-900 shadow-xs hover:bg-brand-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="rounded-md bg-brand-400 px-3.5 py-2.5 text-sm font-semibold text-navy-900 shadow-xs hover:bg-brand-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Configuration"}
                </button>
              )}
            </div>
          </div>

          {/* Desktop sidebar: 3D viewer + preview */}
          <div className="hidden lg:block sticky top-8 self-start space-y-4">
            <Suspense
              fallback={
                <div className="h-[350px] rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-sm text-gray-400">
                  Loading 3D viewer...
                </div>
              }
            >
              <CabViewer3D />
            </Suspense>
            <PreviewPanel />
          </div>
        </div>

        {/* Mobile: 3D preview button */}
        <MobileViewer3D />
      </main>
    </div>
  );
}

function MobileViewer3D() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 inline-flex items-center gap-x-2 rounded-full bg-brand-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-brand-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
      >
        <CubeIcon aria-hidden="true" className="size-5" />
        3D Preview
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center">
            <DialogPanel className="relative w-full transform rounded-t-2xl bg-white p-6 pb-20 shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">
                  3D Preview
                </h3>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <Suspense
                fallback={
                  <div className="h-[300px] rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-sm text-gray-400">
                    Loading 3D viewer...
                  </div>
                }
              >
                <CabViewer3D />
              </Suspense>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default function ConfigurePage() {
  return (
    <ConfiguratorProvider>
      <ConfiguratorContent />
    </ConfiguratorProvider>
  );
}
