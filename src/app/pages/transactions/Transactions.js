import { useEffect, useState } from "react"
import { TransactionService } from "../../services/TransactionService";

export const Transactions = () => {

    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [newTransaction, setNewTransaction] = useState({
        mount: 0,
        description: ""
    });

    const getTransactions = () => {
        TransactionService.getAll().then(data => {
            setTransactions(data);
        });
    }

    const getBalance = () => {
        TransactionService.getBalance().then(data => {
            setBalance(data);
        });
    }

    const handleMountInputChange = (e) => {
        setNewTransaction({ ...newTransaction, mount: +e.target.value });
    }

    const handleDescriptionInputChange = (e) => {
        setNewTransaction({ ...newTransaction, description: e.target.value });
    }

    const addPayment = () => {
        TransactionService.addPayment(newTransaction).then(() => {
            getBalance();
            getTransactions();
            clearNewTransaction();
        });
    }

    const addEarning = () => {
        TransactionService.addEarning(newTransaction).then(() => {
            getBalance();
            getTransactions();
            clearNewTransaction();
        });
    }

    const clearNewTransaction = () => {
        setNewTransaction({
            mount: 0,
            description: ""
        })
    }

    useEffect(() => {
        getTransactions();
        getBalance();
    }, []);

    return (
        <div>
            <div className="row">
                <div className="col">
                    <h1>Transacciones</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h4>Agregar transaccion</h4>
                    <input type="number" placeholder="monto" value={newTransaction.mount} onChange={handleMountInputChange}></input>
                    <input type="text" placeholder="descripcion" value={newTransaction.description} onChange={handleDescriptionInputChange}></input>
                    <button className="btn btn-primary" onClick={addEarning}>Agregar ingreso</button>
                    <button className="btn btn-danger" onClick={addPayment}>Agregar gasto</button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <strong>Balance total: </strong>
                    <span className={`badge ${balance >= 0 ? "bg-success" : "bg-danger"}`}>{balance}</span>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table className="table table-condensed table-striped">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>mount</th>
                                <th>description</th>
                                <th>date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.id} className={transaction.mount >= 0 ? 'table-success' : 'table-danger'}>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.mount}</td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}