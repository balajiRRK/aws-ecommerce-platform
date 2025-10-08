import React from "react";
import { useLocation } from "react-router-dom"

const PaymentEntry = () => {
  let title = "Game-Start Payment Entry Page";

  const location = useLocation(); 

  return (
    <div>
      <h1>{title}</h1>
      <p>Payment entry form will go here.</p>
    </div>
  );
};

export default PaymentEntry;
