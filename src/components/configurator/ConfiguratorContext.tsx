"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { ConfiguratorState, LeadInfo, ValidationError } from "@/types";
import { validateConfiguration } from "@/lib/validation";

interface ConfiguratorContextType {
  step: number;
  setStep: (step: number) => void;
  config: ConfiguratorState;
  updateConfig: (updates: Partial<ConfiguratorState>) => void;
  lead: LeadInfo;
  updateLead: (updates: Partial<LeadInfo>) => void;
  errors: ValidationError[];
  isSubmitting: boolean;
  setIsSubmitting: (v: boolean) => void;
  submittedId: string | null;
  setSubmittedId: (id: string | null) => void;
}

const defaultConfig: ConfiguratorState = {
  cabType: "",
  cabSize: "",
  wallFinish: "",
  floorType: "",
  ceilingType: "",
  handrail: "",
  lighting: "",
  mirror: "none",
  options: [],
};

const defaultLead: LeadInfo = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectInfo: "",
};

const ConfiguratorContext = createContext<ConfiguratorContextType | null>(null);

export function ConfiguratorProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<ConfiguratorState>(defaultConfig);
  const [lead, setLead] = useState<LeadInfo>(defaultLead);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const updateConfig = useCallback((updates: Partial<ConfiguratorState>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateLead = useCallback((updates: Partial<LeadInfo>) => {
    setLead((prev) => ({ ...prev, ...updates }));
  }, []);

  const errors = validateConfiguration(config);

  return (
    <ConfiguratorContext.Provider
      value={{
        step,
        setStep,
        config,
        updateConfig,
        lead,
        updateLead,
        errors,
        isSubmitting,
        setIsSubmitting,
        submittedId,
        setSubmittedId,
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
}

export function useConfigurator() {
  const ctx = useContext(ConfiguratorContext);
  if (!ctx) throw new Error("useConfigurator must be used within ConfiguratorProvider");
  return ctx;
}
