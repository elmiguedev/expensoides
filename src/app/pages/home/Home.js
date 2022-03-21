import { ApartmentService } from "../../services/ApartmentService";
import { Apartment } from "./components/Apartment";
import { useState, useEffect, useContext } from "react";
import { ExpensesService } from "../../services/ExpensesService";
import { DataContext } from "../../context/DataContext";
import { LoadingScreen } from "../../components/ui/LoadingScreen";

export const Home = () => {

  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    getApartments();
  }, []);

  const getApartments = () => {
    ApartmentService.getAll().then((data => {
      console.log("LOS APT", data);
      setApartments(data);
    }));
  }

  const generateExpensesButtonHandler = () => {
    ExpensesService.generateAllExpenses().then(expenses => {
      console.log(expenses);
    });
  }

  const { data, changeData } = useContext(DataContext);


  return (
    <div>
      <div className="row mb-3">
        <div className="col">
          <h1>Dptos</h1>
          {JSON.stringify(data)}
          <button onClick={() => {
            changeData("loading", true); setTimeout(() => {
              changeData("loading", false)
            }, 3000);
          }}>holi</button>
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