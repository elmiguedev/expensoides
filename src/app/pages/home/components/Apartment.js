import { useEffect, useState } from "react";
import { ExpensesService } from "../../../services/ExpensesService";

export const Apartment = (props) => {

  const {
    apartment,
    onChange
  } = props;

  const [expenses, setExpenses] = useState([]);

  const getUnpaidExpenses = () => {
    ExpensesService.getUnpaidExpensesByApartment(apartment.id).then(data => {
      setExpenses(data);
    });
  }

  const payExpenses = (expenses) => {
    const expense = expenses[0];
    if (expense) {
      ExpensesService.payExpenses(expense.id).then(
        (res) => {
          getUnpaidExpenses();
          if (onChange) {
            onChange();
          }
        }
      );
    }
  }

  const getCardClass = () => {
    return `card card-primary mb-4 ${expenses.length > 0 ? "bg-warning" : "bg-success"}`;
  }



  useEffect(() => {
    getUnpaidExpenses();
  }, [])

  return (
    <div className={getCardClass()}>
      <div className="card-body">
        <h4>{apartment.number}</h4>
        <p>{apartment.owner}</p>
        <p>Adeuda {expenses.length} expensas</p>
        <button onClick={() => { payExpenses(expenses) }} className="btn btn-primary">Pagar expensas</button>
      </div>
    </div>
  )
}