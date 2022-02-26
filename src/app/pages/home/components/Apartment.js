export const Apartment = (props) => {

  const {
    apartment
  } = props;

  return (
    <div className="card card-primary mb-4">
      <div className="card-body">
        <h4>{apartment.number}</h4>
        <p>{apartment.owner}</p>
        <button className="btn btn-light">Generar expensas</button>
        <button className="btn btn-primary">Pagar expensas</button>
      </div>
    </div>
  )
}