import GreetingSection from "./components/GreetingSection";
import NewSaleCard from "./components/NewSaleCard";
import SummarySection from "./components/SummarySection";
import QuickActions from "./components/QuickActions";
import RecentSales from "./components/RecentSales";

/**
 * Página principal del sistema.
 *
 * Reúne la acción principal, indicadores generales
 * y accesos directos a los módulos más utilizados.
 */
function DashboardPage() {
  return (
    <>
      <GreetingSection />
      <NewSaleCard />
      <SummarySection />
      <QuickActions />
      <RecentSales />
    </>
  );
}

export default DashboardPage;