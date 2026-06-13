import DashboardLayout from "../layouts/DashboardLayout";

import HistoryComponent from "../components/History";

export default function History() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        History
      </h1>

      <HistoryComponent />
    </DashboardLayout>
  );
}
