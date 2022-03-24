
import React from "react";
import { TextField } from "../../components/ui/TextField";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
export const Login = (props) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { form, getInput } = useForm({
    username: "",
    password: ""
  })

  const handleLogin = () => {
    login(form.username, form.password).then(
      () => {
        navigate("/")
      }
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Login</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>Usuario</label>
            <TextField {...getInput("username")}></TextField>
          </div>

          <div className="form-group">
            <label>Clave</label>
            <TextField type="password" {...getInput("password")}></TextField>
          </div>

          <div className="form-group">
            <Button onClick={handleLogin}>Ingresar</Button>
          </div>

        </div>
      </div>
    </div>
  );

}