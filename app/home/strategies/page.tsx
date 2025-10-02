"use client";
import { routeAliases } from "@/config/site";
import HomeSections from "@/components/dataSections";
export default function HomeStrategies() {
  return <HomeSections section={routeAliases.home} />;
}
