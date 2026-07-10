import GreetingSection from "./components/GreetingSection";
import NewSaleCard from "./components/NewSaleCard";

/**
 * Página principal que reúne la información
 * y los accesos más importantes del sistema.
 */
function DashboardPage() {
  return (
    <>
      <GreetingSection />
      <NewSaleCard />
    </>
  );
}

export default DashboardPage;