import { Button, Card, ProgressBar } from "react-bootstrap";
import { currencyFormatter } from "../utils";

type BudgetCardProps = {
  name: string;
  amount: number;
  max?: number;
  budgetId?: string;
  gray?: boolean;
  hideButtons?: boolean;
  openAddExpenseModal?: (budgetId: string) => void;
  openViewExpenseModal?: (budgetId: string) => void;
};

export default function BudgetCard({
  name,
  amount,
  max,
  budgetId,
  gray,
  hideButtons,
  openAddExpenseModal,
  openViewExpenseModal,
}: BudgetCardProps) {
  const className = [];

  if (max && amount > max) {
    className.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    className.push("bg-light");
  }

  return (
    <Card className={className.join(" ")}>
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3 gap-3">
          <div>{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                {" "}
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <div className="mt-4 d-flex justify-content-end gap-2">
            <Button
              variant="outline-primary"
              onClick={() => openAddExpenseModal!(budgetId!)}
            >
              Add Expense
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => openViewExpenseModal!(budgetId!)}
            >
              View Expenses
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

function getProgressVariant(amount: number, max: number) {
  const ratio = amount / max;
  if (ratio < 0.5) return "success";
  if (ratio < 0.75) return "warning";
  return "danger";
}
