import { Button, Container, Stack } from "react-bootstrap";
import "./App.css";
import BudgetCard from "./components/BudgetCard";
import { useState } from "react";
import AddBudgetModal from "./components/AddBudgetModal";
import { useAppSelector } from "./store/Hooks";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpenseModal from "./components/ViewExpenseModal";
import { UNCATEGORIZED_BUDGET_ID } from "./store/BudgetSlice";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";

function App() {
  const [newBudgetModalVisibility, setNewBudgetModalVisibility] =
    useState(false);
  const [newExpenseModalVisibility, setNewExpenseModalVisibility] =
    useState(false);
  const [newExpenseModalBudgetId, setNewExpenseModalBudgetId] = useState("");
  const [viewExpenseModalVisibility, setViewExpenseModalVisibility] =
    useState(false);
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState("");

  const { budgets } = useAppSelector((state) => state.budgets);
  const { expenses } = useAppSelector((state) => state.expenses);

  function openAddExpenseModal(budgetId: string) {
    setNewExpenseModalVisibility(true);
    setNewExpenseModalBudgetId(budgetId);
  }

  function openViewExpenseModal(budgetId: string) {
    setViewExpenseModalVisibility(true);
    setViewExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <Container>
        <Stack
          direction="horizontal"
          gap={2}
          className="mt-4 mb-5 align-items-center"
        >
          <h1 className="me-auto mb-0">Budgets</h1>
          <Button
            variant="primary"
            onClick={() => setNewBudgetModalVisibility(true)}
          >
            Add Budget
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => openAddExpenseModal("")}
          >
            Add Expense
          </Button>
        </Stack>
        {/* card container */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
          {budgets.map((budget) => {
            const amount = expenses
              .filter((expense) => expense.budgetId === budget.id)
              .reduce((sum, expense) => sum + expense.amount, 0);

            return (
              <BudgetCard
                name={budget.name}
                amount={amount}
                max={budget.max}
                budgetId={budget.id}
                openAddExpenseModal={openAddExpenseModal}
                openViewExpenseModal={openViewExpenseModal}
                key={budget.id}
              />
            );
          })}

          <UncategorizedBudgetCard
            openAddExpenseModal={openAddExpenseModal}
            openViewExpenseModal={() =>
              openViewExpenseModal(UNCATEGORIZED_BUDGET_ID)
            }
          />
        </div>
        <div className="mt-5">
          <TotalBudgetCard />
        </div>
        {/* modals */}
        <AddBudgetModal
          show={newBudgetModalVisibility}
          handleClose={() => setNewBudgetModalVisibility(false)}
        />
        <AddExpenseModal
          show={newExpenseModalVisibility}
          handleClose={() => setNewExpenseModalVisibility(false)}
          defaultBudgetId={newExpenseModalBudgetId}
        />
        <ViewExpenseModal
          show={viewExpenseModalVisibility}
          handleClose={() => setViewExpenseModalVisibility(false)}
          budgetId={viewExpenseModalBudgetId}
        />
      </Container>
    </>
  );
}

export default App;
