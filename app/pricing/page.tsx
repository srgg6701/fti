"use client";

import { useEffect, useMemo, useState } from "react";

import type { status } from "@/types/ui";
import { apiFetch } from "@/lib/api";
import {
  ButtonRoundedBlue,
  ButtonRoundedGrey,
} from "@/components/button-rounded";
import ErrMess from "@/components/errMess";

type SaasRawPlan = Record<string, unknown>;

type PlanCard = {
  id: string;
  name: string;
  badge: string | null;
  priceLabel: string;
  periodLabel: string;
  description: string;
  isPopular: boolean;
  matchKeys: string[];
};

const DEFAULT_DESCRIPTION =
  "The service uses database characteristics, scenarios and interactions.";

const FALLBACK_PLANS: PlanCard[] = [
  {
    id: "fallback-standard",
    name: "Standard",
    badge: "Popular",
    priceLabel: "$50.99",
    periodLabel: "1 month",
    description: DEFAULT_DESCRIPTION,
    isPopular: true,
    matchKeys: ["fallback-standard", "standard"].map((value) =>
      value.toLowerCase()
    ),
  },
  {
    id: "fallback-custom",
    name: "Let's discuss it",
    badge: null,
    priceLabel: "Contractual",
    periodLabel: "1 month",
    description: DEFAULT_DESCRIPTION,
    isPopular: false,
    matchKeys: ["fallback-custom", "let's discuss it", "custom"].map((value) =>
      value.toLowerCase()
    ),
  },
];

export default function Tariffplan() {
  const [plans, setPlans] = useState<PlanCard[]>(FALLBACK_PLANS);
  const [status, setStatus] = useState<status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const [activePlanLabel, setActivePlanLabel] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPlans = async () => {
      setStatus("loading");
      setError(null);

      try {
        const response = await apiFetch<unknown>(
          "/api/saas-subscriptions/plans"
        );
        let activePayload: unknown = null;

        try {
          activePayload = await apiFetch<unknown>(
            "/api/saas-subscriptions/active"
          );
        } catch (activeError) {
          if (!cancelled) {
            console.warn("Unable to fetch active subscription:", activeError);
          }
        }

        if (cancelled) return;

        const normalized = normalizePlans(response);
        const resolvedPlans = normalized.length ? normalized : FALLBACK_PLANS;
        const activeMetadata = extractActivePlanMetadata(activePayload);
        const matchedActiveId = findActivePlanId(
          resolvedPlans,
          activeMetadata.identifiers
        );
        const label =
          (matchedActiveId
            ? resolvedPlans.find((plan) => plan.id === matchedActiveId)?.name
            : activeMetadata.label) ?? null;

        setPlans(resolvedPlans);
        setActivePlanId(matchedActiveId);
        setActivePlanLabel(label);
        setStatus("success");
      } catch (err) {
        if (cancelled) return;

        const message =
          err instanceof Error ? err.message : "Unable to load plans.";
        setError(message);
        setPlans(FALLBACK_PLANS);
        setActivePlanId(null);
        setActivePlanLabel(null);
        setStatus("error");
      }
    };

    loadPlans();

    return () => {
      cancelled = true;
    };
  }, []);

  const primaryPlanId = useMemo(() => {
    if (activePlanId) return activePlanId;

    const popularPlan = plans.find((plan) => plan.isPopular);

    return popularPlan?.id ?? plans[0]?.id ?? null;
  }, [plans, activePlanId]);

  const handlePlanSelect = (plan: PlanCard) => {
    console.log("Selected plan:", plan.id);
  };

  const buttonHeight = "h-[45px]";

  return (
    <div className="w-full pt-20 pb-[56px]">
      <section className="flex flex-col items-center pb-10">
        <h2 className="pb-2.5 !text-[28px] leading-[33px] font-semibold">
          Choose a data plan
        </h2>
        <p className="max-w-[207px] text-center text-sm leading-[17px] opacity-80">
          Choose the most suitable tariff plan for yourself
        </p>
      </section>
      <div className="flex flex-wrap justify-center gap-[15px] max-[560px]:flex-col">
        {plans.map((plan) => {
          const isActivePlan = plan.id === activePlanId;
          const ButtonComponent =
            plan.id === primaryPlanId ? ButtonRoundedBlue : ButtonRoundedGrey;

          return (
            <section
              key={plan.id}
              className="bg-translucent-extreme blick-rounded flex w-[380px] max-w-full flex-col justify-between rounded-[15px] p-10 text-center"
            >
              <div className="mb-5 flex flex-col justify-center gap-[15px]">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <h3 className="text-lg font-semibold text-white">
                    {plan.name}
                  </h3>
                  {plan.badge ? (
                    <ButtonRoundedBlue
                      bgColor="bg-blue-second"
                      btnText={plan.badge}
                      fontSize="text-xs"
                      height="!h-[18px]"
                      padding="!px-[5px]"
                      width="min-w-[53px]"
                    />
                  ) : null}
                </div>
                <div className="flex flex-col justify-center gap-[5px]">
                  <span className="h-[43px] text-4xl font-medium">
                    {plan.priceLabel}
                  </span>
                  <span className="text-base font-medium">
                    {plan.periodLabel}
                  </span>
                </div>
                <p className="text-sm leading-[17px] opacity-80">
                  {plan.description}
                </p>
              </div>
              {isActivePlan ? (
                <ButtonRoundedBlue
                  bgColor="bg-[#0F9D58]"
                  btnText="Active"
                  height={buttonHeight}
                  isDisabled
                />
              ) : (
                <ButtonComponent
                  btnText="Buy"
                  height={buttonHeight}
                  onClick={() => handlePlanSelect(plan)}
                />
              )}
            </section>
          );
        })}
      </div>
      {activePlanLabel ? (
        <p className="mt-5 text-center text-sm opacity-80">
          Current plan:
          <span className="ml-1 font-semibold text-white">
            {activePlanLabel}
          </span>
        </p>
      ) : null}
      {error ? <ErrMess error={error} mx="mx-0" /> : null}
      {status === "loading" && !error ? (
        <p className="mt-5 text-center text-sm opacity-60">Loading plans…</p>
      ) : null}
    </div>
  );
}

function normalizePlans(payload: unknown): PlanCard[] {
  const source = Array.isArray(payload)
    ? payload
    : isPlainObject(payload) && Array.isArray(payload.data)
      ? payload.data
      : [];

  return source
    .map((item, index) => normalizePlan(item, index))
    .filter((plan): plan is PlanCard => Boolean(plan));
}

function normalizePlan(item: unknown, index: number): PlanCard | null {
  if (!isPlainObject(item)) return null;

  const id =
    pickString(
      item.id,
      item.code,
      item.slug,
      `plan-${index + 1}` // fallback
    ) ?? `plan-${index + 1}`;

  const name =
    pickString(
      item.name,
      item.title,
      item.displayName,
      item.planName,
      `Plan ${index + 1}`
    ) ?? `Plan ${index + 1}`;

  const badge =
    pickString(item.badge, item.label, item.tagline) ??
    (pickBoolean(item.isPopular, item.popular, item.recommended)
      ? "Popular"
      : null);

  const periodLabel =
    pickString(
      item.periodLabel,
      item.period,
      item.billingPeriodLabel,
      item.billingPeriod,
      item.intervalLabel
    ) ??
    buildPeriodLabel(
      pickNumber(item.periodValue, item.billingPeriodValue, item.intervalCount),
      pickString(item.periodUnit, item.billingPeriodUnit, item.intervalUnit)
    ) ??
    "per month";

  const formattedPrice =
    pickString(
      item.priceLabel,
      item.priceFormatted,
      item.priceLabelUsd,
      item.displayPrice
    ) ??
    formatCurrency(
      pickNumber(
        item.price,
        item.priceAmount,
        item.monthlyPrice,
        item.usdPrice,
        item.amount
      ),
      pickString(item.currency, item.currencyCode, item.currencySymbol)
    ) ??
    "Contact sales";

  const description =
    pickString(item.description, item.shortDescription, item.details) ??
    DEFAULT_DESCRIPTION;

  const isPopular = pickBoolean(item.isPopular, item.popular, item.recommended);
  const matchKeys = buildMatchKeys(
    id,
    name,
    pickString(
      item.code,
      item.planCode,
      item.plan_code,
      item.slug,
      item.planSlug,
      item.plan_slug
    ),
    pickNumber(item.planId, item.plan_id, item.numericId, item.numeric_id)
  );

  if (isPlainObject(item.plan)) {
    const nested = item.plan as Record<string, unknown>;
    matchKeys.push(
      ...buildMatchKeys(
        pickString(
          nested.id,
          nested.code,
          nested.planCode,
          nested.plan_code,
          nested.slug
        ),
        pickNumber(
          nested.planId,
          nested.plan_id,
          nested.numericId,
          nested.numeric_id
        ),
        pickString(nested.name, nested.planName, nested.title)
      )
    );
  }

  return {
    id,
    name,
    badge,
    priceLabel: formattedPrice,
    periodLabel,
    description,
    isPopular,
    matchKeys: Array.from(new Set(matchKeys.filter(Boolean))),
  };
}

function pickString(...values: unknown[]): string | null {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }

  return null;
}

function pickNumber(...values: unknown[]): number | null {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === "string") {
      const parsed = Number(value);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
  }

  return null;
}

function pickBoolean(...values: unknown[]): boolean {
  for (const value of values) {
    if (typeof value === "boolean") {
      return value;
    }
    if (typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    if (typeof value === "number") {
      if (value === 1) return true;
      if (value === 0) return false;
    }
  }

  return false;
}

function formatCurrency(
  amount: number | null,
  currencyLike: string | null
): string | null {
  if (amount == null) return null;

  const currency =
    currencyLike && currencyLike.length >= 3
      ? currencyLike.slice(0, 3).toUpperCase()
      : "USD";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount}`;
  }
}

function buildPeriodLabel(
  periodValue: number | null,
  unit: string | null
): string | null {
  if (!periodValue && !unit) return null;

  if (!unit) {
    return periodValue ? `every ${periodValue} days` : null;
  }

  const normalizedUnit = unit.toLowerCase();
  const value = periodValue ?? 1;
  const plural = value === 1 ? normalizedUnit : `${normalizedUnit}s`;

  if (["monthly", "weekly", "daily", "yearly"].includes(normalizedUnit)) {
    return normalizedUnit;
  }

  return `${value} ${plural}`;
}

function isPlainObject(value: unknown): value is SaasRawPlan & {
  data?: unknown;
} {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function buildMatchKeys(...values: unknown[]): string[] {
  const set = new Set<string>();

  for (const value of values) {
    appendMatchValue(set, value);
  }

  return Array.from(set);
}

function appendMatchValue(store: Set<string>, value: unknown): void {
  if (value == null) return;

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed) {
      store.add(trimmed.toLowerCase());
    }

    return;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    store.add(String(value));

    return;
  }

  if (Array.isArray(value)) {
    value.forEach((entry) => appendMatchValue(store, entry));

    return;
  }
}

function extractActivePlanMetadata(payload: unknown): {
  identifiers: string[];
  label: string | null;
} {
  const identifiers = new Set<string>();
  let label: string | null = null;

  if (payload == null) {
    return { identifiers: [], label };
  }

  const identifierKeys = [
    "id",
    "planId",
    "plan_id",
    "planCode",
    "plan_code",
    "code",
    "subscriptionPlanId",
    "subscription_plan_id",
    "slug",
    "planSlug",
    "plan_slug",
  ];

  const labelKeys = [
    "name",
    "planName",
    "plan_name",
    "title",
    "planTitle",
    "displayName",
  ];

  const stack: unknown[] = Array.isArray(payload) ? [...payload] : [payload];

  while (stack.length) {
    const current = stack.pop();

    if (Array.isArray(current)) {
      stack.push(...current);

      continue;
    }

    if (!isPlainObject(current)) continue;

    for (const key of Object.keys(current)) {
      const value = current[key];

      if (identifierKeys.includes(key)) {
        const candidateString = pickString(value);
        if (candidateString) {
          identifiers.add(candidateString.toLowerCase());
        }

        const candidateNumber = pickNumber(value);
        if (candidateNumber != null) {
          identifiers.add(String(candidateNumber));
        }
      }

      if (!label && labelKeys.includes(key)) {
        const labelCandidate = pickString(value);
        if (labelCandidate) {
          label = labelCandidate;
        }
      }

      if (key === "plan" || key === "data" || key === "subscription") {
        stack.push(value);
      } else if (isPlainObject(value) || Array.isArray(value)) {
        stack.push(value);
      }
    }
  }

  if (label) {
    identifiers.add(label.toLowerCase());
  }

  return { identifiers: Array.from(identifiers), label };
}

function findActivePlanId(
  plans: PlanCard[],
  identifiers: string[]
): string | null {
  if (!identifiers.length) return null;

  const candidateSet = new Set(identifiers.map((value) => value.toLowerCase()));

  for (const plan of plans) {
    if (plan.matchKeys.some((key) => candidateSet.has(key))) {
      return plan.id;
    }
  }

  return null;
}
