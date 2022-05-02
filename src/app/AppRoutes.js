import { Navigate, Route, Routes } from "react-router-dom";
import { Transactions } from "./pages/transactions/Transactions";
import { Expenses } from "./pages/expenses/expenses-list/Expenses";
import { NewExpenses } from "./pages/expenses/new-expense/NewExpenses";
import { GenericExpense } from "./pages/reports/GenericExpense";
import { NewApartment } from "./pages/apartments/NewApartment"
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Layout } from "./components/Layout";
import { AuthService } from "./services/AuthService";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import { Users } from "./pages/users/Users";

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="" element={<Home />} />
          <Route path="apartments/new" element={<NewApartment />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="expenses/new" element={<NewExpenses />} />
          <Route path="reports/expenses/generic" element={<GenericExpense />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}