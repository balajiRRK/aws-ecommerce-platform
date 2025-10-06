import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatePayload } from "../StatePayload";

const Purchase = () => {
  const [order, setOrder] = useState(StatePayload);
  const navigate = useNavigate(); //This is our hook for React
  let title = "purchase page";

  //This action handler is used to route to our next page
  const handleSubmit = (e) => {
    navigate("/purchase/paymentEntry", { order: order, setOrder: setOrder });
  };

  console.log("order: ", order);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Product 1</label>
        <input
          type="number"
          required
          onChange={(e) => {
            order.buyQuantity[0] = e.target.value;
          }}
        />
        <br />
        <label>Product 2</label>
        <input
          type="number"
          required
          onChange={(e) => {
            order.buyQuantity[1] = e.target.value;
          }}
        />
        <br />
        <button className="button">Pay</button>
      </form>
    </div>
  );
};

export default Purchase;
