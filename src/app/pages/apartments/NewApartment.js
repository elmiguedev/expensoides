import { TextField } from "../../components/ui/TextField"
import { Button } from "../../components/ui/Button"
import { useForm } from "../../hooks/useForm";
import { ApartmentService } from "../../services/ApartmentService";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext"

export const NewApartment = (props) => {
    const { contextData, changeContextData } = useContext(DataContext);
    const { form, getInput } = useForm({
        floor: 1,
        number: 1,
        owner: "",
    });

    const saveApartment = () => {
        changeContextData("loading", true);
        ApartmentService.add({ ...form }).then(
            () => {
                changeContextData("loading", false);
            }
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Nuevo departamento</h1>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    {JSON.stringify(form)}
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label>Piso:</label>
                        <TextField {...getInput("floor")}></TextField>
                    </div>
                    <div className="form-group">
                        <label>Numero:</label>
                        <TextField {...getInput("number")}></TextField>
                    </div>
                    <div className="form-group">
                        <label>Dueño:</label>
                        <TextField {...getInput("owner")}></TextField>
                    </div>
                    <div className="form-group">
                        <Button onClick={saveApartment}>
                            Agregar departamento
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}