import React from "react";
import { useLocation } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  const { order } = location.state || {};

  const confirmationNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="confirmation-container">
      <h2>Order Confirmed!</h2>
      <p>Thank you for your purchase.</p>
      <p><strong>Confirmation Number:</strong> {confirmationNumber}</p>

      <h3>Shipping To:</h3>
      <p>
        {order?.shipping_address?.address_1}<br />
        {order?.shipping_address?.address_2 && (
          <>
            {order.shipping_address.address_2}
            <br />
          </>
        )}
        {order?.shipping_address?.city}, {order?.shipping_address?.state}{" "}
        {order?.shipping_address?.zip}
      </p>

      <h3>Payment Info:</h3>
      <p>Card ending in ****{order?.credit_card_data?.card_number?.slice(-4)}</p>

      <h3>Total Paid: ${order?.totalCost || 0}</h3>
    </div>
  );
};

export default Confirmation;
