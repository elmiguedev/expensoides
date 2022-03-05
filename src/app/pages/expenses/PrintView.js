import React from "react";
import ReactDOM from "react-dom";
import Pdf from "react-to-pdf";

const ref = React.createRef();

export const Printer = ({trigger, print}) => {
    return (
        <div className="App">
          <Pdf targetRef={ref} filename="code-example.pdf">
            {({ toPdf }) => trigger}
          </Pdf>
          <div ref={ref}>
            {print}
          </div>
        </div>
      );
}