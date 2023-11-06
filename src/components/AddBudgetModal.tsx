import { FormEvent, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../store/Hooks";
import { addBudget } from "../store/BudgetSlice";

type AddBudgetModalProps = {
  show: boolean;
  handleClose: () => void;
};

export default function AddBudgetModal({
  show,
  handleClose,
}: AddBudgetModalProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(
      addBudget({
        id: crypto.randomUUID(),
        max: parseFloat(maxRef.current!.value),
        name: nameRef.current!.value,
      })
    );
    handleClose();
  }

  const dispatch = useAppDispatch();

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="name" className="mb-4">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" required ref={nameRef} />
          </Form.Group>
          <Form.Group controlId="max" className="mb-4">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              type="number"
              ref={maxRef}
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Add Budget
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
