import { Layout } from "./components/Layout";
import { Home } from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Transactions } from "./pages/transactions/Transactions";
import { Expenses } from "./pages/expenses/expenses-list/Expenses";
import { NewExpenses } from "./pages/expenses/new-expense/NewExpenses";
import { GenericExpense } from "./pages/reports/GenericExpense";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="expenses/new" element={<NewExpenses />} />
          <Route path="reports/expenses/generic" element={<GenericExpense />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
