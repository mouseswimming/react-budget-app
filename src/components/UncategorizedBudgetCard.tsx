import BudgetCard from "./BudgetCard";
import { useAppSelector } from "../store/Hooks";
import { UNCATEGORIZED_BUDGET_ID } from "../store/BudgetSlice";

type UncategorizedBudgetCardProps = {
  openAddExpenseModal: (budgetId: string) => void;
  openViewExpenseModal: (budgetId: string) => void;
};

export default function UncategorizedBudgetCard({
  ...props
}: UncategorizedBudgetCardProps) {
  const { expenses } = useAppSelector((state) => state.expenses);

  const amount = expenses.reduce((sum, expense) => {
    if (expense.budgetId === UNCATEGORIZED_BUDGET_ID) {
      return sum + expense.amount;
    } else {
      return sum;
    }
  }, 0);

  return (
    <BudgetCard
      budgetId={UNCATEGORIZED_BUDGET_ID}
      name="Uncategorized"
      amount={amount}
      gray
      {...props}
    />
  );
}
