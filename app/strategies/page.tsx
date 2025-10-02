export const metadata = { title: "Strategies" };
import { routeAliases } from "@/config/site";
import HomeSections from "@/components/dataSections";
export default function Strategies() {
  return <HomeSections section={routeAliases.strategies} />;
}
