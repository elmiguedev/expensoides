import Pdf from "react-to-pdf";
import React from "react"

// Create Document Component
export const ExpensesPrint = () => {
    return (
        <div className="container text-center">
            <h1>Hola mundo de la impresion</h1>
            <p>
                Esto es un parrafo sobre la impresión del mismo
            </p>
            <table className="table table-condensed">
                <tr>
                    <td>Uno</td>
                    <td>Dos</td>
                    <td>Palabra mas larga</td>
                    <td>Palabra mas larga pero con un poco mas</td>
                </tr>
                <tr>
                    <td>Uno</td>
                    <td>Dos</td>
                    <td>Palabra mas larga</td>
                    <td>Palabra mas larga pero con un poco mas</td>
                </tr>
                <tr>
                    <td>Uno</td>
                    <td>Dos</td>
                    <td>Palabra mas larga</td>
                    <td>Palabra mas larga pero con un poco mas</td>
                </tr>
                <tr>
                    <td>Uno</td>
                    <td>Dos</td>
                    <td>Palabra mas larga</td>
                    <td>Palabra mas larga pero con un poco mas</td>
                </tr>
            </table>
        </div>
      );
}