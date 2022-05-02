import { useEffect, useState } from "react"
import { TextField } from "../../components/ui/TextField";
import { Button } from "../../components/ui/Button";
import { UserService } from "../../services/UserService";
import { useForm } from "../../hooks/useForm";

export const Users = (props) => {

  const [users, setUsers] = useState([]);
  const { form, getInput } = useForm({
    username: "",
    password: ""
  })

  const registerUser = () => {
    console.log("EL FORM", form)
    UserService.addUser({
      username: form.username,
      password: form.password,
      passwordRepeat: form.password
    }).then(
      user => {
        console.log(user);
        getUsers();
      }
    );
  }

  const getUsers = () => {
    UserService.getUsers().then(
      (res) => {
        setUsers(res);
      }
    );
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Usuarios</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {JSON.stringify(form)}
          <div className="row">
            <div className="col">
              <TextField {...getInput("username")} ></TextField>
            </div>
            <div className="col">
              <TextField type="password" {...getInput("password")}></TextField>

            </div>
            <div className="col">
              <Button onClick={() => registerUser()}>Agregar usuario</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table w-100">
            <thead>
              <tr>
                <th>id</th>
                <th>usuario</th>
                <th>acciones</th>
              </tr>
            </thead>
            <tbody>
              {users && users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}