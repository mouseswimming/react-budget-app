import { useAppSelector } from "../store/Hooks";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard() {
  const { expenses } = useAppSelector((state) => state.expenses);
  const { budgets } = useAppSelector((state) => state.budgets);

  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);

  if (max === 0) return null;

  return <BudgetCard amount={amount} name="Total" gray max={max} hideButtons />;
}
