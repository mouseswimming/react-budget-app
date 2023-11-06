import { FormEvent, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/Hooks";
import { UNCATEGORIZED_BUDGET_ID } from "../store/BudgetSlice";
import { addExpense } from "../store/ExpenseSlice";

type AddBudgetModalProps = {
  show: boolean;
  handleClose: () => void;
  defaultBudgetId: string;
};

export default function AddExpenseModal({
  show,
  handleClose,
  defaultBudgetId,
}: AddBudgetModalProps) {
  const descriptionRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const budgetIdRef = useRef<HTMLSelectElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(
      addExpense({
        id: crypto.randomUUID(),
        description: descriptionRef.current!.value,
        amount: parseFloat(amountRef.current!.value),
        budgetId: budgetIdRef.current!.value,
      })
    );
    handleClose();
  }

  const dispatch = useAppDispatch();
  const { budgets } = useAppSelector((state) => state.budgets);

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="description" className="mb-4">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" required ref={descriptionRef} />
          </Form.Group>
          <Form.Group controlId="amount" className="mb-4">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              ref={amountRef}
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group controlId="amount" className="mb-4">
            <Form.Label>Category</Form.Label>
            <Form.Select
              aria-label="Select your budget category"
              defaultValue={defaultBudgetId}
              ref={budgetIdRef}
            >
              <option
                id={UNCATEGORIZED_BUDGET_ID}
                value={UNCATEGORIZED_BUDGET_ID}
              >
                Uncategorized
              </option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Add Expense
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
