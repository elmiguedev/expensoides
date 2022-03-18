import { useState } from "react";
import { ReportService } from "../../services/ReportService";

export const GenericExpense = (props) => {

  const [reportData, setReportData] = useState({});


  const generateReport = async () => {
    await ReportService.generateGenericExpenseReport(reportData);
  }

  return (
    <div>
      <p>
        {JSON.stringify(reportData)}
      </p>
      <div className="row">
        <div className="col">
          <h1>Expensas generica</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>Nº expensas</label>
            <input
              type="text"
              className="form-control"
              value={reportData.expenseId}
              onChange={(e) => setReportData({ ...reportData, expenseId: e.target.value })}
            ></input>
          </div>
          <div className="form-group">
            <label>Edificio</label>
            <input
              type="text"
              className="form-control"
              value={reportData.building}
              onChange={(e) => setReportData({ ...reportData, building: e.target.value })}
            ></input>
          </div>
          <div className="form-group">
            <label>CUIT</label>
            <input
              type="text"
              className="form-control"
              value={reportData.cuit}
              onChange={(e) => setReportData({ ...reportData, cuit: e.target.value })}
            ></input>
          </div>
          <div className="form-group">
            <label>Mes</label>
            <input
              type="number"
              className="form-control"
              value={reportData.month}
              onChange={(e) => setReportData({ ...reportData, month: e.target.value })}
            ></input>
          </div>
          <div className="form-group">
            <label>Año</label>
            <input
              type="number"
              className="form-control"
              value={reportData.year}
              onChange={(e) => setReportData({ ...reportData, year: e.target.value })}></input>
          </div>
          <div className="form-group">
            <label>Dueño</label>
            <input
              type="text"
              className="form-control"
              value={reportData.owner}
              onChange={(e) => setReportData({ ...reportData, owner: e.target.value })}
            ></input>
          </div>
          <div className="form-group">
            <label>Departamento</label>
            <input
              type="text"
              className="form-control"
              value={reportData.apartment}
              onChange={(e) => setReportData({ ...reportData, apartment: e.target.value })}
            ></input>
          </div>
          <div className="form-group">
            <label>Direccion</label>
            <input
              type="text"
              className="form-control"
              value={reportData.address}
              onChange={(e) => setReportData({ ...reportData, address: e.target.value })}
            ></input>
          </div>
          <div className="form-group">
            <label>Total</label>
            <input
              type="number"
              className="form-control"
              value={reportData.total}
              onChange={(e) => setReportData({ ...reportData, total: e.target.value })}
            ></input>
          </div>
          <div className="form-group">
            <label>Fecha de pago</label>
            <input
              type="text"
              className="form-control"
              value={reportData.paymentDate}
              onChange={(e) => setReportData({ ...reportData, paymentDate: e.target.value })}
            ></input>
          </div>
          <div className="form-group">
            <label>Método de pago</label>
            <select
              className="form-select"
              value={reportData.paymentType}
              onChange={(e) => setReportData({ ...reportData, paymentType: e.target.value })}
            >
              <option value="bank">Trasnferencia bancaria</option>
              <option value="cash">Efectivo</option>
              <option value="check">Cheque</option>
            </select>
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={generateReport}>Imprimir</button>
          </div>
        </div>
      </div>
    </div>
  );
}