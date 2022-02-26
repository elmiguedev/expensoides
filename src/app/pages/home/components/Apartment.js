import { useEffect, useState } from "react";
import { ExpensesService } from "../../../services/ExpensesService";

export const Apartment = (props) => {

  const {
    apartment
  } = props;

  const [expenses, setExpenses] = useState([]);

  const getUnpaidExpenses = () => {
    ExpensesService.getUnpaidExpensesByApartment(apartment.id).then(data => {
      setExpenses(data);
    });
  }

  useEffect(() => {
    getUnpaidExpenses();
  }, [])

  return (
    <div className="card card-primary mb-4">
      <div className="card-body">
        <h4>{apartment.number}</h4>
        <p>{apartment.owner}</p>
        <p>Adeuda {expenses.length} expensas</p>
        <button className="btn btn-primary">Pagar expensas</button>
      </div>
    </div>
  )
}