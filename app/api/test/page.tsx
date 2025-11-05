"use client";

import { useEffect, useState, useMemo } from "react";

import { useUserStore } from "@/lib/store/userStore";

import MultiFetch from "./get-main-user-data";

type Method = "GET" | "POST" | "DELETE" | "PUT";
type Ep = {
  description?: string;
  key: string;
  method: Method;
  path: string; // может содержать {param}
  needsBody?: boolean;
  exampleBody?: unknown;
  note?: string;
  favorite?: true;
};
type Section = {
  name: string;
  endpoints: Ep[];
};

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  //const res = await fetch(toApiPath(endpoint), {
  const res = await fetch(`/api${endpoint}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      const from = window.location.pathname + window.location.search;

      sessionStorage.setItem("reauth_from", from);
      window.location.href = "/login";
    }
    throw new Error("Unauthorized");
  }
  if (!res.ok) {
    let details = "";

    try {
      details = JSON.stringify(await res.json());
    } catch {}
    throw new Error(`API error: ${res.status}${details ? ` ${details}` : ""}`);
  }

  return res.json() as Promise<T>;
}
/* function toApiPath(endpoint: string) {
  const BASE = process.env.NEXT_PUBLIC_API_URL ?? ""; // https://api.fti-trade.com

  if (endpoint.startsWith("http")) return endpoint;

  return `${BASE}${endpoint}`;
} */
// ==============================================

function generateCredentials(prefix = "test") {
  const tm = new Date().getTime();
  const nick = tm.toString().slice(8, 12);
  const userName = `${prefix}${nick}`;
  const email = `${userName}@example.com`;
  const password = `${prefix}-${nick}`;
  const username = userName;

  return { email, password, username };
}

const creds = generateCredentials("test");

const favoritePaths = {
  authRegister: "/auth/register",
  authLogin: "/auth/login",
  authMe: "/auth/me",
  authProfile: "/auth/profile",
  authLogout: "/auth/logout",
  authForgotPassword: "/auth/forgot-password",
  authRequestPasswordReset: "auth/request-password-reset",
  authChangePassword: "auth/change-password",
  emailSupport: "email/support",
  tradeSystems: "/trade-systems",
  addForexAccount: "/trading-accounts/add-forex-account",
  balanceStatus: "/balance/status",
  balanceEquityChart: "/balance/equity/chart",
  userTradingAccounts: "/trading-accounts/user-accounts",
  userSubscriptions: "/subscriptions/user-subscriptions",
  saasSubscriptionsActive: "/saas-subscriptions/active",
  saasSubscriptionsPlans: "/saas-subscriptions/plans",
};

const SECTIONS: Section[] = [
  // --- Authentication ---
  {
    name: "Authentication",
    endpoints: [
      {
        key: "auth/register",
        description: "Register new user",
        method: "POST",
        path: favoritePaths.authRegister,
        needsBody: true,
        exampleBody: creds,
        favorite: true,
      },
      {
        key: "auth/login",
        description: "Login user",
        method: "POST",
        path: favoritePaths.authLogin,
        needsBody: true,
        exampleBody: {
          email: "test19@gmail.com",
          password: "test19@gmail.com",
        },
        favorite: true,
      },
      {
        key: "auth/me",
        description: "Get current user profile",
        method: "GET",
        path: favoritePaths.authMe,
        favorite: true,
      },
      {
        key: "auth/profile",
        description: "Get user profile (legacy)",
        method: "GET",
        path: favoritePaths.authProfile,
        favorite: true,
      },
      {
        key: "auth/logout",
        description: "Logout user",
        method: "POST",
        path: favoritePaths.authLogout,
        favorite: true,
      },
      {
        key: "auth/forgot-password",
        description: "Request password reset",
        method: "POST",
        path: favoritePaths.authForgotPassword,
        needsBody: true,
        exampleBody: {
          email: "test@example.com",
        },
        favorite: true,
      },
      {
        key: "auth/request-password-reset",
        description: "Request password reset (send reset page link)",
        method: "POST",
        path: favoritePaths.authRequestPasswordReset,
        needsBody: true,
        exampleBody: {
          email: "test@example.com",
        },
        favorite: true,
      },
      {
        key: "auth/reset-password",
        description: "Reset password with token",
        method: "POST",
        path: "/auth/reset-password",
        needsBody: true,
        exampleBody: {
          token: "RESET_TOKEN",
          newPassword: "NewPass123!",
        },
      },
      {
        key: "auth/send-email-confirmation",
        description: "Send email confirmation",
        method: "POST",
        path: "/auth/send-email-confirmation",
        needsBody: true,
        exampleBody: { email: "test@example.com" },
      },
      {
        key: "auth/confirm-email",
        description: "Confirm email with token",
        method: "POST",
        path: "/auth/confirm-email",
        needsBody: true,
        exampleBody: { token: "CONFIRM_TOKEN" },
      },
      {
        key: "auth/check-email-status",
        description: "Check email verification status",
        method: "POST",
        path: "/auth/check-email-status",
        needsBody: true,
        exampleBody: { email: "test@example.com" },
      },
      {
        key: "auth/confirm-email/status",
        description: "Poll email confirmation status",
        method: "GET",
        path: "/auth/confirm-email/status",
      },
      {
        key: "auth/change-password",
        description: "Change password (authorized)",
        method: "POST",
        path: favoritePaths.authChangePassword,
        needsBody: true,
        exampleBody: {
          currentPassword: "Passw0rd!",
          newPassword: "NewPass123!",
        },
        favorite: true,
      },
    ],
  },

  // --- Email ---
  {
    name: "Email",
    endpoints: [
      {
        key: "email/templates:create",
        description: "Create new email template",
        method: "POST",
        path: "/email/templates",
        needsBody: true,
        exampleBody: {
          code: "welcome",
          subject: "Welcome",
          body: "<h1>Hello</h1>",
        },
      },
      {
        key: "email/templates:list",
        description: "Get all email templates",
        method: "GET",
        path: "/email/templates",
      },
      {
        key: "email/templates:get",
        description: "Get email template by ID",
        method: "GET",
        path: "/email/templates/{id}",
        note: "Укажи id",
      },
      {
        key: "email/templates:update",
        description: "Update email template",
        method: "PUT",
        path: "/email/templates/{id}",
        needsBody: true,
        exampleBody: { subject: "Updated", body: "<p>Updated</p>" },
      },
      {
        key: "email/templates:delete",
        description: "Delete email template (deactivate)",
        method: "DELETE",
        path: "/email/templates/{id}",
        note: "Deactivate",
      },
      {
        key: "email/templates:by-code",
        description: "Get email template by code",
        method: "GET",
        path: "/email/templates/code/{code}",
        note: "Укажи code",
      },
      {
        key: "email/logs:list",
        description: "Get email logs with filtering",
        method: "GET",
        path: "/email/logs",
      },
      {
        key: "email/logs:get",
        description: "Get email log by ID",
        method: "GET",
        path: "/email/logs/{id}",
        note: "Укажи id",
      },
      {
        key: "email/logs:update-result",
        description: "Update email log result",
        method: "PUT",
        path: "/email/logs/{id}/result",
        needsBody: true,
        exampleBody: { status: "delivered", details: "OK" },
      },
      {
        key: "email/support",
        description: "Send message to support (public)",
        method: "POST",
        path: favoritePaths.emailSupport,
        favorite: true,
        needsBody: true,
        exampleBody: {
          email: "user@example.com",
          subject: "Help",
          message: "Need assistance",
        },
      },
      {
        key: "email/mass",
        description: "Send mass email to all users",
        method: "POST",
        path: "/email/mass-distribution",
        needsBody: true,
        exampleBody: { subject: "News", body: "<p>...</p>" },
      },
      {
        key: "email/send",
        description: "Send email using template",
        method: "POST",
        path: "/email/send",
        needsBody: true,
        exampleBody: {
          to: "user@example.com",
          templateCode: "welcome",
          params: { name: "John" },
        },
      },
      {
        key: "email/send-bulk",
        description: "Send bulk email using template",
        method: "POST",
        path: "/email/send/bulk",
        needsBody: true,
        exampleBody: {
          to: ["a@b.com", "c@d.com"],
          templateCode: "notice",
          params: { foo: "bar" },
        },
      },
      {
        key: "email/stats",
        description: "Get email sending statistics",
        method: "GET",
        path: "/email/stats",
      },
      {
        key: "email/smtp-verify",
        description: "Verify SMTP connection",
        method: "GET",
        path: "/email/smtp/verify",
      },
    ],
  },

  // --- Pages ---
  /*   {
    name: "Pages",
    endpoints: [
      {
        key: "pages/home",
        description: "",
        method: "GET",
        path: "/",
      },
      {
        key: "pages/login",
        description: "",
        method: "GET",
        path: "/login",
      },
      {
        key: "pages/about",
        description: "",
        method: "GET",
        path: "/about",
      },
      {
        key: "pages/confirm-email",
        description: "",
        method: "GET",
        path: "/confirm-email",
      },
      {
        key: "pages/reset-password",
        description: "",
        method: "GET",
        path: "/reset-password",
      },
      {
        key: "pages/all_symbols",
        description: "",
        method: "GET",
        path: "/all_symbols",
      },
      {
        key: "pages/portfolio_balancer",
        description: "",
        method: "GET",
        path: "/portfolio_balancer",
      },
      {
        key: "pages/terminal",
        description: "",
        method: "GET",
        path: "/terminal",
      },
      {
        key: "pages/trading_history",
        description: "",
        method: "GET",
        path: "/trading_history",
      },
      {
        key: "pages/portfolio",
        description: "",
        method: "GET",
        path: "/portfolio",
      },
      {
        key: "pages/subscribe_list",
        description: "",
        method: "GET",
        path: "/subscribe_list",
      },
      {
        key: "pages/my_accounts",
        description: "",
        method: "GET",
        path: "/my_accounts",
      },
      {
        key: "pages/my_subscriptions",
        description: "",
        method: "GET",
        path: "/my_subscriptions",
      },
      {
        key: "pages/add_portfolio",
        description: "",
        method: "GET",
        path: "/add_portfolio",
      },
      {
        key: "pages/add_forex_account",
        description: "",
        method: "GET",
        path: "/add_forex_account",
      },
      {
        key: "pages/new_provider",
        description: "",
        method: "GET",
        path: "/new_provider",
      },
      {
        key: "pages/strategy",
        description: "",
        method: "GET",
        path: "/strategy",
      },
    ],
  }, */

  // --- Trade Systems ---
  {
    name: "Trade Systems",
    endpoints: [
      {
        key: "ts/all",
        description: "Get all strategies",
        method: "GET",
        path: favoritePaths.tradeSystems,
        favorite: true,
      },
      {
        key: "ts/ue:test",
        description: "Test UniversalEquity endpoint diagnostics",
        method: "GET",
        path: "/trade-systems/universal-equity/test",
      },
      {
        key: "ts/by-id",
        description: "Get trade system by ID",
        method: "GET",
        path: "/trade-systems/{strategyId}",
        note: "Укажи strategyId",
      },
      {
        key: "ts/daily-curve",
        description: "Get daily PnL curve for strategy",
        method: "GET",
        path: "/trade-systems/{strategyId}/daily-pnl-curve",
      },
      {
        key: "ts/daily-summary",
        description: "Get daily PnL curve summary for strategy",
        method: "GET",
        path: "/trade-systems/{strategyId}/daily-pnl-summary",
      },
      {
        key: "ts/monthly",
        description: "Get monthly PnL breakdown for strategy",
        method: "GET",
        path: "/trade-systems/{strategyId}/monthly-pnl",
      },
      {
        key: "ts/pnl-all",
        description: "Get all PnL statistics for strategy",
        method: "GET",
        path: "/trade-systems/{strategyId}/pnl-all",
      },
      {
        key: "ts/ue:by-id",
        description: "Get UniversalEquity statistics for strategy",
        method: "GET",
        path: "/trade-systems/{strategyId}/universal-equity",
      },
      {
        key: "ts/ue:all",
        description: "Get UniversalEquity statistics for all active strategies",
        method: "GET",
        path: "/trade-systems/universal-equity/all",
      },
      {
        key: "ts/create-provider",
        description: "Create new provider strategy",
        method: "POST",
        path: "/trade-systems/create-provider",
        needsBody: true,
        exampleBody: { name: "My Strategy", description: "..." },
      },
      {
        key: "ts/positions",
        description: "Get strategy open positions",
        method: "GET",
        path: "/trade-systems/{strategyId}/positions",
      },
    ],
  },

  // --- Statistics ---
  {
    name: "Statistics",
    endpoints: [
      {
        key: "stats/root",
        description: "Get statistics by types",
        method: "GET",
        path: "/statistics",
      },
      {
        key: "stats/daily-curve",
        description: "Get daily PnL curve",
        method: "GET",
        path: "/statistics/daily-pnl-curve",
      },
      {
        key: "stats/daily-curve-summary",
        description: "Get daily PnL curve summary",
        method: "GET",
        path: "/statistics/daily-pnl-curve-summary",
      },
      {
        key: "stats/daily-curve-monthly",
        description: "Get monthly PnL curve",
        method: "GET",
        path: "/statistics/daily-pnl-curve-monthly",
      },
      {
        key: "stats/daily-all",
        description: "Get all daily PnL",
        method: "GET",
        path: "/statistics/daily-pnl-all",
      },
      {
        key: "stats/universal-equity",
        description: "Get universal equity for entity",
        method: "GET",
        path: "/statistics/universal-equity",
      },
      {
        key: "stats/strategies",
        description: "Get all user strategies",
        method: "GET",
        path: "/statistics/strategies",
      },
    ],
  },

  // --- Equity Calculation ---
  {
    name: "Equity Calculation",
    endpoints: [
      {
        key: "eq/ts",
        description: "Calculate equity for trade system",
        method: "GET",
        path: "/equity/trade-system/{systemId}",
      },
      {
        key: "eq/account",
        description: "Calculate equity for trading account",
        method: "GET",
        path: "/equity/trading-account/{accountId}",
      },
      {
        key: "eq/custom",
        description: "Calculate equity with custom parameters",
        method: "GET",
        path: "/equity/custom",
      },
      {
        key: "eq/diagnostics",
        description: "Get equity calculation status and diagnostics",
        method: "GET",
        path: "/equity/diagnostics/{entityType}/{entityId}",
      },
      {
        key: "eq/symbols",
        description: "Get available symbols and their status",
        method: "GET",
        path: "/equity/symbols/status",
      },
    ],
  },

  // --- Brokers ---
  {
    name: "Brokers",
    endpoints: [
      {
        key: "brokers/all",
        description: "Get all brokers",
        method: "GET",
        path: "/brokers",
      },
      {
        key: "brokers/by-id",
        description: "Get broker by ID",
        method: "GET",
        path: "/brokers/{id}",
      },
      {
        key: "brokers/server-name",
        description: "Get server ID by server name",
        method: "GET",
        path: "/brokers/server/{serverName}",
      },
      {
        key: "brokers/current-node",
        description: "Get server ID from current node",
        method: "GET",
        path: "/brokers/current-node/server-id",
      },
      {
        key: "brokers/name-by-server-id",
        description: "Get broker name by server ID",
        method: "GET",
        path: "/brokers/broker-name/{serverId}",
      },
    ],
  },

  // --- Balance ---
  {
    name: "Balance",
    endpoints: [
      {
        key: "balance/status",
        description: "Get balance status",
        method: "GET",
        path: favoritePaths.balanceStatus,
        favorite: true,
      },
      {
        key: "balance/current",
        description: "Get balance status",
        method: "GET",
        path: "/balance/current",
      },
      {
        key: "balance/accounts",
        description: "Get user accounts",
        method: "GET",
        path: "/balance/accounts",
      },
      {
        key: "balance/add-account",
        description: "Add new account",
        method: "POST",
        path: "/balance/account",
        needsBody: true,
        exampleBody: { accountName: "My acc", brokerId: 1 },
      },
      {
        key: "balance/remove-account",
        description: "Remove account",
        method: "DELETE",
        path: "/balance/account/{accountId}",
      },
      {
        key: "balance/equity:chart",
        description: "Get equity chart data for user accounts",
        method: "GET",
        path: favoritePaths.balanceEquityChart,
        favorite: true,
      },
      {
        key: "balance/equity:account-current",
        description:
          "Get current equity balance for specific account from trading_account_equity table",
        method: "GET",
        path: "/balance/equity/account/{accountId}/current",
      },
      {
        key: "balance/equity:accounts",
        description: "Get all user accounts with their current equity balances",
        method: "GET",
        path: "/balance/equity/accounts",
      },
      {
        key: "balance/debug:equity-data",
        description:
          "Debug: Test database connection and check trading_account_equity table data for current user",
        method: "GET",
        path: "/balance/debug/equity-data",
      },
    ],
  },

  // --- Trading Accounts ---
  {
    name: "Trading Accounts",
    endpoints: [
      {
        key: "ta/user-accounts",
        description: "Get user trading accounts",
        method: "GET",
        path: favoritePaths.userTradingAccounts,
        favorite: true,
      },
      {
        key: "ta/connected-status",
        description: "Get connected accounts status",
        method: "GET",
        path: "/trading-accounts/connected-status",
      },
      {
        key: "ta/add-forex",
        description: "Add and connect forex account",
        method: "POST",
        path: favoritePaths.addForexAccount,
        needsBody: true,
        exampleBody: {
          accountNumber: "63286180",
          password: "monday15",
          serverName: "RoboForex-DemoPro",
          platform: "MT4",
          broker: "RoboForex",
          apiKey: "optional-api-key",
        },
        favorite: true,
      },
      {
        key: "ta/delete",
        description: "Delete trading account",
        method: "DELETE",
        path: "/trading-accounts/delete-account/{accountId}",
      },
      {
        key: "ta/positions",
        description: "Get trading account positions",
        method: "GET",
        path: "/trading-accounts/{accountId}/positions",
      },
      {
        key: "ta/balance-history",
        description: "Get trading account trade history (closed positions)",
        method: "GET",
        path: "/trading-accounts/{accountId}/balance-history",
      },
      {
        key: "ta/history",
        description: "Get trading account trade history (closed positions)",
        method: "GET",
        path: "/trading-accounts/{accountId}/history",
      },
      {
        key: "ta/close-positions",
        description: "Close all open positions for trading account",
        method: "POST",
        path: "/trading-accounts/{accountId}/close-all-positions",
        exampleBody: {
          accountId: "63286180",
        },
      },
    ],
  },

  // --- Subscriptions ---
  {
    name: "Subscriptions",
    endpoints: [
      {
        key: "subs/subscribe",
        description: "Subscribe to trading strategy",
        method: "POST",
        path: "/subscriptions/subscribe",
        needsBody: true,
        exampleBody: { strategyId: 1 },
      },
      {
        key: "subs/unsubscribe",
        description: "Unsubscribe from trading strategy",
        method: "DELETE",
        path: "/subscriptions/unsubscribe",
        needsBody: true,
        exampleBody: { strategyId: 1 },
      },
      {
        key: "subs/user",
        description: "Get user subscriptions",
        method: "GET",
        path: favoritePaths.userSubscriptions,
        favorite: true,
      },
      {
        key: "subs/update-portfolio",
        description: "Update portfolio parameters",
        method: "POST",
        path: "/subscriptions/update-portfolio",
        needsBody: true,
        exampleBody: { strategyId: 1, risk: "medium" },
      },
    ],
  },

  // --- SaaS Subscriptions ---
  {
    name: "SaaS Subscriptions",
    endpoints: [
      {
        key: "saas/end-date",
        description: "Get user subscription end date",
        method: "GET",
        path: "/saas-subscriptions/end-date",
      },
      {
        key: "saas/subscriptions",
        description: "Get user subscription history",
        method: "GET",
        path: "/saas-subscriptions/subscriptions",
        favorite: true,
      },
      {
        key: "saas/active",
        description: "Get active user subscription",
        method: "GET",
        path: favoritePaths.saasSubscriptionsActive,
        favorite: true,
      },
      {
        key: "saas/has-active",
        description: "Check if user has active subscription",
        method: "GET",
        path: "/saas-subscriptions/has-active",
        favorite: true,
      },
      {
        key: "saas/create",
        description: "Create new user subscription",
        method: "POST",
        path: "/saas-subscriptions",
        needsBody: true,
        exampleBody: { planId: "basic-monthly" },
      },
      {
        key: "saas/plans",
        description: "Get all available subscription plans",
        method: "GET",
        path: favoritePaths.saasSubscriptionsPlans,
        favorite: true,
      },
    ],
  },

  // --- Accounts ---
  {
    name: "Accounts",
    endpoints: [
      {
        key: "acc/add",
        description: "Add new account",
        method: "POST",
        path: "/accounts",
        needsBody: true,
        exampleBody: { name: "Demo", type: "forex" },
      },
      {
        key: "acc/all",
        description: "Get all accounts",
        method: "GET",
        path: "/accounts",
      },
    ],
  },

  // -- Notifications ---
  {
    name: "Notifications",
    endpoints: [
      {
        key: "notifications",
        description: "Получить уведомления пользователя",
        method: "GET",
        path: "/notifications",
      },
      {
        key: "notifications/delete-all",
        description: "Удалить все уведомления пользователя",
        method: "DELETE",
        path: "/notifications",
      },
      {
        key: "notifications/from-template",
        description: "Отправить уведомление по шаблону",
        method: "POST",
        path: "/notifications/from-template",
        needsBody: true,
        exampleBody: {
          templateCode: "welcome",
          toUserId: 123,
          params: { name: "User" },
        },
      },
      {
        key: "notifications/unread-count",
        description: "Получить количество непрочитанных уведомлений",
        method: "GET",
        path: "/notifications/unread/count",
      },
      {
        key: "notifications/get-by-id",
        description: "Получить уведомление по ID",
        method: "GET",
        path: "/notifications/{id}",
        note: "Укажите id",
      },
      {
        key: "notifications/update",
        description: "Обновить уведомление",
        method: "PUT",
        path: "/notifications/{id}",
        needsBody: true,
        exampleBody: {
          title: "Updated title",
          body: "Updated body",
          metadata: {},
        },
        note: "Укажите id",
      },
      {
        key: "notifications/delete-by-id",
        description: "Удалить уведомление",
        method: "DELETE",
        path: "/notifications/{id}",
        note: "Укажите id",
      },
      {
        key: "notifications/mark-read",
        description: "Отметить уведомление как прочитанное",
        method: "PUT",
        path: "/notifications/{id}/read",
        note: "Укажите id",
      },
      {
        key: "notifications/mark-all-read",
        description: "Отметить все уведомления как прочитанные",
        method: "PUT",
        path: "/notifications/read/all",
      },
    ],
  },
];

const logins = [
  { login: "test19@gmail.com", password: "test19@gmail.com" },
  { login: "test18@gmail.com", password: "test18@gmail.com" },
  { login: "test.user.1756994272@example.com", password: "Password123!" },
  { login: "srggtester@gmail.com", password: "Password123!" },
  { login: "srgg.next@gmail.com", password: "hist1234#$Yo" },
  { login: "test4042@example.com", password: "test-4042" },
];

const RoboForexAccounts = {
  serverName: "RoboForex-DemoPro",
  passord: "monday15",
  accountNumbers: [
    "63286180",
    "63286182",
    "63286183",
    "63286184",
    "63286185",
    "63286186",
    "63286187",
    "63286189",
    "63286190",
  ],
};

function useParamsInPath(path: string) {
  return useMemo(() => {
    const regex = /{([^}]+)}/g;
    const names: string[] = [];
    let m: RegExpExecArray | null;

    while ((m = regex.exec(path))) names.push(m[1]);

    return names;
  }, [path]);
}

export default function ApiTestPage() {
  const { isAuthenticated, email } = useUserStore((state) => state);
  const loginStoreUser = useUserStore((s) => s.login);
  const initializeUser = useUserStore((s) => s.initializeUser);

  console.log({ isAuthenticated, email });
  const first = SECTIONS.find((s) => s.endpoints.length > 0)?.endpoints[1];
  const [selected, setSelected] = useState<Ep | undefined>(first);
  const [selectFavorites, setSelectFavorites] = useState<boolean>(true);
  const allMethods = ["GET", "POST", "DELETE", "PUT"];
  const [selectedMethods, setSelectMethods] = useState(["GET"]);
  const [isLoginOpen, setLoginOpen] = useState<boolean>(false);
  const [isAddAccountOpen, setAddAccountOpen] = useState<boolean>(false);
  const [hover, setHover] = useState(false);
  const [activeCredentials, setActiveUserCredentials] = useState({
    login: logins[0].login,
    password: logins[0].password,
  });

  const paramsInPath = useParamsInPath(selected?.path ?? "");
  const [pathParams, setPathParams] = useState<Record<string, string>>({});
  const [bodyText, setBodyText] = useState(
    selected?.exampleBody ? JSON.stringify(selected.exampleBody, null, 2) : ""
  );
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  function toggleSection(name: string) {
    setOpenSections((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  useEffect(() => {
    if (selectFavorites) {
      setOpenSections((prev) => ({
        ...prev,
        ...Object.fromEntries(SECTIONS.map((s) => [s.name, true])),
      }));
    } else setOpenSections({ Authentication: true });
  }, []);

  // Удобные поля для auth форм, если тело пустое
  //const [email, setEmail] = useState();
  //const [password, setPassword] = useState("test19@gmail.com");

  useEffect(() => {
    setPathParams({});
    setResponse("");
    setError("");
    setBodyText(
      selected?.exampleBody ? JSON.stringify(selected.exampleBody, null, 2) : ""
    );
  }, [selected?.key]);

  function buildPath(): string {
    if (!selected) return "";
    let p = selected.path;

    for (const name of paramsInPath) {
      p = p.replace(`{${name}}`, encodeURIComponent(pathParams[name] ?? ""));
    }

    return p;
  }

  async function send() {
    if (!selected) return;
    setLoading(true);
    setError("");
    setResponse("");
    try {
      const options: RequestInit = { method: selected.method };

      if (selected.needsBody) {
        const bodyJson = bodyText?.trim()
          ? JSON.parse(bodyText)
          : selected.key.startsWith("auth/")
            ? {
                email: activeCredentials.login,
                password: activeCredentials.password,
              }
            : {};

        options.body = JSON.stringify(bodyJson);
      }
      const data = await apiFetch<any>(buildPath(), options);

      // После успешного логина сразу обновляем стор пользователя
      if (selected.key === "auth/login") {
        if (data?.user) {
          try {
            loginStoreUser(data.user);
          } catch {
            // fall back: дернуть /api/auth/me
            await initializeUser();
          }
        } else {
          await initializeUser();
        }
      }

      // После выхода из системы сразу сбрасываем данные пользователя
      if (selected.key === "auth/logout") {
        await initializeUser();
      }

      setResponse(JSON.stringify(data, null, 2));
    } catch (e: any) {
      setError(String(e?.message ?? e));
    } finally {
      setLoading(false);
    }
  }

  const filterDataByMethods = () => {
    if (!selectedMethods) return SECTIONS;

    return (
      SECTIONS
        // 1) внутри каждой секции оставляем только избранные методы
        .map((section) => ({
          ...section,
          endpoints: section.endpoints.filter((ep) =>
            selectedMethods.includes(ep.method)
          ),
        }))
        // 2) выбрасываем секции, где после фильтра не осталось endpoints
        .filter((section) => section.endpoints.length > 0)
    );
  };

  const filterFavorites = () => {
    const filteredByMethods = filterDataByMethods();

    if (!selectFavorites) return filteredByMethods;

    return (
      filteredByMethods
        // 1) внутри каждой секции оставляем только избранные endpoints
        .map((section) => ({
          ...section,
          endpoints: section.endpoints.filter((ep) => ep.favorite),
        }))
        // 2) выбрасываем секции, где после фильтра не осталось endpoints
        .filter((section) => section.endpoints.length > 0)
    );
  };

  const pathOnClick = (selectedPath: string) => {
    if (selectedPath === favoritePaths.authLogin) setLoginOpen(!isLoginOpen);
    if (selectedPath === favoritePaths.addForexAccount)
      setAddAccountOpen(!isAddAccountOpen);
  };

  return (
    <div className="flex gap-5">
      {/* Sidebar: Swagger-like sections */}
      <aside className="space-y-5" style={{ minWidth: "380px", width: "20vw" }}>
        {filterFavorites().map((section) => {
          const isOpen = openSections[section.name] ?? false;

          return (
            <div key={section.name}>
              <button
                className="flex items-center justify-between w-full py-1 text-xs font-bold uppercase tracking-wider opacity-70"
                onClick={() => toggleSection(section.name)}
              >
                {section.name}
                <span className="ml-2">{isOpen ? "▾" : "▸"}</span>
              </button>
              {(isOpen && (
                <div className="pb-1">
                  {(section.endpoints.length === 0 && (
                    <div className="text-xs opacity-60 italic">
                      No endpoints
                    </div>
                  )) ||
                    null}
                  {section.endpoints.map((e) => {
                    const active = selected?.key === e.key;

                    return (
                      <button
                        key={e.key}
                        className={`w-full text-left !mb-0 px-3 cursor-pointer border transition hover:bg-gray-400
                          ${active ? "bg-gray-600" : "border-transparent hover:underline"}`}
                        onClick={() => setSelected(e)}
                      >
                        <span
                          className="font-mono text-[11px] mr-2 inline-block w-10"
                          style={{
                            color: `${e.method === "GET" ? "blueviolet" : "green"}`,
                          }}
                        >
                          [{e.method}]
                        </span>
                        <span className="text-sm">{e.path}</span>
                        {(e.note && (
                          <span className="block text-[11px] opacity-60 mt-1">
                            {e.note}
                          </span>
                        )) ||
                          null}
                        <li
                          className="mb-1 text-xs opacity-70"
                          style={{ marginLeft: "16px", listStyle: "square" }}
                        >
                          {e.description}
                        </li>
                      </button>
                    );
                  })}
                </div>
              )) ||
                null}
            </div>
          );
        })}
      </aside>

      {/* Main panel */}
      <main
        className="space-y-6 relative"
        style={{
          left: "37vw",
          position: "fixed",
          top: 0,
          bottom: "10px",
          width: "60vw",
        }}
      >
        <div
          className="fixed top-[101px] overflow-auto"
          style={{
            backgroundColor: "var(--background-default)",
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            width: "100%",
            zIndex: 2,
          }}
        >
          <h1 className="text-xl font-bold flex justify-between">
            <span>API Tester</span>
            <div>
              {allMethods.map((m) => (
                <label
                  key={m}
                  className="inline-block font-normal text-sm"
                  style={{ marginRight: "12px" }}
                >
                  <input
                    checked={selectedMethods.includes(m)}
                    className="mr-2"
                    type="checkbox"
                    onChange={() => {
                      if (selectedMethods.includes(m)) {
                        setSelectMethods((s) => s.filter((x) => x !== m));
                      } else {
                        setSelectMethods((s) => [...s, m]);
                      }
                    }}
                  />
                  {m}
                </label>
              ))}
              <div className="text-sm font-normal mt-5 mr-4 ml-5 inline-block">
                <input
                  checked={selectFavorites}
                  className="mr-2"
                  type="checkbox"
                  onChange={() => setSelectFavorites(!selectFavorites)}
                />
                Favorites only
              </div>
            </div>
          </h1>

          {!selected ? (
            <div className="text-sm opacity-70">Выберите эндпоинт слева.</div>
          ) : (
            <>
              <div className="relative rounded border p-4 space-y-3 mb-1.5">
                {((selected.path === favoritePaths.authLogin ||
                  selected.path === favoritePaths.addForexAccount) && (
                  <div
                    className="absolute flex flex-col items-start gap-1.5 bg-[#eee] p-4 m-0"
                    style={{
                      backgroundColor: "#555",
                      borderRadius: "3px",
                      display: `${isLoginOpen || isAddAccountOpen ? "flex" : "none"}`,
                      right: "16px",
                    }}
                  >
                    {selected.path === favoritePaths.authLogin &&
                      logins.map((lg) => (
                        <button
                          key={lg.login}
                          onClick={() => (
                            setActiveUserCredentials({
                              login: lg.login,
                              password: lg.password,
                            }),
                            setBodyText(
                              JSON.stringify(
                                {
                                  email: lg.login,
                                  password: lg.password,
                                },
                                null,
                                2
                              )
                            )
                          )}
                        >
                          {lg.login}
                        </button>
                      ))}
                    {(selected.path === favoritePaths.addForexAccount && (
                      <div className="flex flex-col">
                        {RoboForexAccounts.accountNumbers.map((n) => (
                          <button
                            key={n}
                            className="hover:underline"
                            onClick={() =>
                              setBodyText(
                                JSON.stringify(
                                  {
                                    accountNumber: n,
                                    password: "monday15",
                                    serverName: "RoboForex-DemoPro",
                                    platform: "MT4",
                                    broker: "RoboForex",
                                    apiKey: "optional-api-key",
                                  },
                                  null,
                                  2
                                )
                              )
                            }
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    )) ||
                      null}
                  </div>
                )) ||
                  null}
                <div className="text-sm">
                  <span className="font-mono text-[11px] mr-2">
                    [selected.method]
                  </span>

                  {selected.path === favoritePaths.authLogin ||
                  selected.path === favoritePaths.addForexAccount ||
                  selected.path.startsWith("/notifications") ? (
                    <button
                      className="font-semibold"
                      style={{
                        color: "lightskyblue",
                        textDecoration: hover ? "underline" : "none",
                      }}
                      onClick={() => pathOnClick(selected.path)}
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                    >
                      {selected.path}
                    </button>
                  ) : (
                    <span className="font-semibold">{selected.path}</span>
                  )}
                </div>

                {/* Path params */}
                {(paramsInPath.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm opacity-80">Path params</div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {paramsInPath.map((name) => (
                        <input
                          key={name}
                          className="border rounded px-3 py-2"
                          placeholder={name}
                          value={pathParams[name] ?? ""}
                          onChange={(e) =>
                            setPathParams((s) => ({
                              ...s,
                              [name]: e.target.value,
                            }))
                          }
                        />
                      ))}
                    </div>
                  </div>
                )) ||
                  null}
                {(selected.key.startsWith("auth/") && selected.needsBody && (
                  <div className="grid sm:grid-cols-2 gap-2">
                    <input
                      className="border rounded px-3 py-2"
                      placeholder="email"
                      value={activeCredentials.login}
                      onChange={(e) =>
                        setActiveUserCredentials({
                          ...activeCredentials,
                          login: e.target.value,
                        })
                      }
                    />
                    <input
                      className="border rounded px-3 py-2"
                      placeholder="password"
                      style={{ backgroundColor: "darkslategray" }}
                      type="text"
                      value={activeCredentials.password}
                      onChange={(e) =>
                        setActiveUserCredentials({
                          ...activeCredentials,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                )) ||
                  null}

                {/* Body */}
                {selected.needsBody && (
                  <div className="space-y-2">
                    <label className="text-sm opacity-80" htmlFor="requestBody">
                      JSON body
                    </label>
                    <textarea
                      className="border rounded px-3 py-2 font-mono w-full"
                      id="requestBody"
                      placeholder={
                        selected.exampleBody
                          ? JSON.stringify(selected.exampleBody, null, 2)
                          : "{ }"
                      }
                      style={{ height: "150px" }}
                      value={bodyText}
                      onChange={(e) => setBodyText(e.target.value)}
                    />
                  </div>
                )}

                {/* Send */}
                <div className="flex items-center gap-3">
                  <button
                    className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
                    disabled={loading}
                    onClick={send}
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                  <div className="text-sm opacity-70">
                    <span className="font-semibold">{selected.method}</span>{" "}
                    {buildPath()}
                  </div>
                </div>
              </div>

              {/* Error / Response */}
              {(error && (
                <pre className="p-3 rounded border text-red-600 whitespace-pre-wrap break-words">
                  {error}
                </pre>
              )) ||
                null}
              {(response && (
                <>
                  <pre className="p-3 rounded border overflow-auto">
                    {response}
                  </pre>
                </>
              )) ||
                null}
              {(selected.key === "auth/login" && isAuthenticated && (
                <MultiFetch />
              )) ||
                null}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
