"use client";
import { useState } from "react";

import { siteConfig } from "@/config/site";

async function apiFetchTest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`/api${endpoint}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);

  return res.json();
}

export default function MultiFetch() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string>("");

  async function runMulti() {
    setLoading(true);
    setError("");
    setResponse(null);
    try {
      const [me, user_subs, user_accs] = await Promise.all([
        apiFetchTest(siteConfig.innerItems.auth.me.href),
        apiFetchTest(
          siteConfig.innerItems.subscriptions.user_subscriptions.href
        ),
        apiFetchTest(siteConfig.innerItems.trading_accounts.user_accounts.href),
      ]);

      setResponse({
        me,
        user_subscriptions: user_subs,
        user_accounts: user_accs,
      });
    } catch (e: any) {
      setError(String(e?.message ?? e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-2 flex flex-col items-end">
      <button
        className="border-2 border-[#666] px-4 py-2 rounded-[3px] mt-2 ml-auto bg-[#333] text-white text-sm"
        disabled={loading}
        onClick={runMulti}
      >
        {loading ? "Loading..." : "Get main user data"}
      </button>
      {(error && (
        <pre className="mt-2 p-3 rounded border text-red-600 whitespace-pre-wrap break-words">
          {error}
        </pre>
      )) ||
        null}
      {(response && (
        <>
          <button
            className="hover:underline cursor-pointer"
            style={{
              marginTop: "-33px",
              marginRight: "auto",
              paddingBottom: "11px",
            }}
            onClick={() => setResponse(!response)}
          >
            Hide output
          </button>
          <pre className="mt-2 p-3 rounded border overflow-auto w-full">
            {JSON.stringify(response, null, 2)}
          </pre>
        </>
      )) ||
        null}
    </div>
  );
}
