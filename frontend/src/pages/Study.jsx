import DashboardLayout from "../layouts/DashboardLayout";

import QuestionInput from "../components/Questioninput";

export default function Study() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Study
      </h1>

      <QuestionInput />
    </DashboardLayout>
  );
}
