import { useEffect, useState } from "react"
import { DropdownList } from "../../../components/ui/DropdownList"
import { TextField } from "../../../components/ui/TextField";
import { Button } from "../../../components/ui/Button";
import { ApartmentService } from "../../../services/ApartmentService";
import { ExpensesService } from "../../../services/ExpensesService";

export const NewExpenses = () => {
  const [apartments, setApartments] = useState();
  const [expense, setExpense] = useState({
    apartmentId: '',
    description: '',
    detail: []
  });
  const [detail, setDetail] = useState({
    description: '',
    mount: 0
  });

  const [generatedExpense, setGeneratedExpense] = useState(null);

  const getApartments = () => {
    ApartmentService.getAll().then(
      data => {
        setApartments(data.map(a => {
          return {
            value: a.id,
            text: `Departamento n° ${a.number}`
          }
        }));
      }
    );
  }

  const addDetail = () => {
    setExpense({
      ...expense,
      detail: [
        ...expense.detail, detail
      ]
    })
  }

  const removeDetail = (i) => {
    setExpense({
      ...expense,
      detail: expense.detail.filter(det => expense.detail.indexOf(det) !== i)
    })
  }

  const generateExpenses = async () => {
    try {
      const response = await ExpensesService.generateGenericExpense(expense);
      console.log(response);
      setGeneratedExpense(response);
    } catch (error) {
      console.log(response);
    }
  }

  const payGeneratedExpenses = async () => {
    try {
      if (generatedExpense) {
        const res = await ExpensesService.payExpenses(generatedExpense.id);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getApartments();
  }, [])

  return (
    <div>
      <div className="row">
        <div className="col">
          <h1>
            Registar nueva expensa
          </h1>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div>

            {JSON.stringify(expense)}
            {JSON.stringify(detail)}

            <div className="form-group">
              <label>Apartamento</label>
              <DropdownList
                value={expense.apartmentId}
                onChange={e => setExpense({ ...expense, apartmentId: +e.target.value })}
                items={apartments}
              />
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                value={expense.description}
                onChange={e => setExpense({ ...expense, description: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Detalle</label>
              <div className="row">
                <div className="col">
                  <TextField
                    value={detail.description}
                    onChange={e => setDetail({ ...detail, description: e.target.value })}
                  />
                </div>
                <div className="col">
                  <TextField
                    value={detail.mount}
                    type="number"
                    onChange={e => setDetail({ ...detail, mount: +e.target.value })}
                  />
                </div>
                <div className="col">
                  <button
                    className="btn btn-primary"
                    onClick={addDetail}
                  >Agregar</button>
                </div>
              </div>
            </div>

            <div className="form-group">
              {expense.detail && expense.detail.map((det, i) => (
                <div key={i}>
                  <span>{det.mount} ({det.description})</span>
                  <button
                    type="button"
                    onClick={() => { removeDetail(i) }}
                  >x</button>
                </div>
              ))}
            </div>

            <div className="form-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={generateExpenses}
              >Generate expense</button>
            </div>

          </div>
        </div>
      </div>

      {generatedExpense && (
        <div className="row">
          <div className="col">{JSON.stringify(generatedExpense)}</div>
          <div className="col">
            <Button
              onClick={payGeneratedExpenses}
            >Registrar pago</Button>
          </div>
        </div>
      )}

    </div>
  )
}