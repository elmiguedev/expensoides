import { ApartmentService } from "../../services/ApartmentService";
import { Apartment } from "./components/Apartment";
import { useState, useEffect } from "react";
import { ExpensesService } from "../../services/ExpensesService";

export const Home = () => {

  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    getApartments();
  }, []);

  const getApartments = () => {
    ApartmentService.getAll().then((apartments => {
      setApartments(apartments);
    }));
  }

  const generateExpensesButtonHandler = () => {
    ExpensesService.generateAllExpenses().then();
  }

  return (
    <div>
      <div className="row mb-3">
        <div className="col">
          <h1>Dptos</h1>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <button onClick={generateExpensesButtonHandler} className="btn btn-primary">Generar expensas</button>
        </div>
      </div>
      <div className="row">
        {apartments.map(apartment => (
          <div key={apartment.id} className="col-3">
            <Apartment apartment={apartment}></Apartment>
          </div>
        ))}
      </div>
    </div>
  );
}