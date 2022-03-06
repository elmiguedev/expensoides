import { useEffect, useState } from "react";
import { ExpensesService } from "../../services/ExpensesService";
import React from "react";
export const Expenses = () => {

    const [expenses, setExpenses] = useState([]);

    const getExpenses = () => {
        ExpensesService.getAll().then(data => {
            setExpenses(data);
        })
    }

    useEffect(() => {
        getExpenses();
    }, [])

    return (
        <div>
            <div className="row">
                <div className="col">
                    <h1>Expensas</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table className="table table-condensed">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Año</th>
                                <th>Mes</th>
                                <th>Departamento (ID)</th>
                                <th>Descripcion</th>
                                <th>Pagada</th>
                                <th>Fecha</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map(expense => (
                                <tr key={expense.id}>
                                    <td>{expense.id}</td>
                                    <td>{expense.year}</td>
                                    <td>{expense.month}</td>
                                    <td>{expense.apartmentId}</td>
                                    <td>{expense.description}</td>
                                    <td>{expense.paid ? 'si' : ''}</td>
                                    <td>{expense.createdDate}</td>
                                    <td>
                                        <button className="btn btn-primary">imprimir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}