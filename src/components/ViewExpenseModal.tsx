import { Button, Modal, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, removeBudget } from "../store/BudgetSlice";
import { useAppSelector } from "../store/Hooks";
import { currencyFormatter } from "../utils";
import { useAppDispatch } from "../store/Hooks";
import { removeCategoriedExpense, removeExpense } from "../store/ExpenseSlice";

type ViewBudgetModalProps = {
  show: boolean;
  handleClose: () => void;
  budgetId: string;
};

export default function ViewExpenseModal({
  show,
  handleClose,
  budgetId,
}: ViewBudgetModalProps) {
  const { budgets } = useAppSelector((state) => state.budgets);
  const { expenses } = useAppSelector((state) => state.expenses);
  const dispatch = useAppDispatch();

  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((budget) => budget.id === budgetId);

  const categoryExpense = expenses.filter(
    (expense) => expense.budgetId === budgetId
  );

  const handleDeleteBudget = () => {
    dispatch(removeBudget(budget!.id));
    dispatch(removeCategoriedExpense(budget!.id));
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={2}>
            {budget?.name}
            {budget?.id !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleDeleteBudget}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap={3}>
          {categoryExpense.map((expense) => (
            <Stack
              direction="horizontal"
              key={expense.id}
              gap={2}
              className="border-bottom pb-3"
            >
              <div className="me-auto fs-5">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={() => dispatch(removeExpense(expense.id))}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
