import { ApartmentService } from "../../services/ApartmentService";
import { Apartment } from "./components/Apartment";
import { useState, useEffect, useContext } from "react";
import { ExpensesService } from "../../services/ExpensesService";
import { DataContext } from "../../context/DataContext";
import { LoadingScreen } from "../../components/ui/LoadingScreen";
import { AuthService } from "../../services/AuthService";

export const Home = () => {

  const { contextData, changeContextData } = useContext(DataContext);
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    getApartments();
  }, []);

  const getApartments = () => {
    changeContextData("loading", true);
    ApartmentService.getAll().then((data => {
      setApartments(data);
      changeContextData("loading", false);
    }));
  }

  const generateExpensesButtonHandler = () => {
    ExpensesService.generateAllExpenses().then(expenses => {
      console.log(expenses);
    });
  }

  return (
    <div>
      <div className="row mb-3">
        <div className="col">
          <h1>Dptos</h1>
          <button onClick={() => { AuthService.login("test", "test").then((res) => console.log(res)) }}>login</button>
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
            <Apartment onChange={() => { getApartments() }} apartment={apartment}></Apartment>
          </div>
        ))}
      </div>
    </div >
  );
}