import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to={"/"}>Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/transactions"}>Transacciones</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/expenses"}>Expensas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/reports/expenses/generic"}>Report</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/apartments/new"}>Nuevo departamento</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleLogout}>Cerrar sesión</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}