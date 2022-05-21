import React, { useEffect, useState } from "react";
import { CDBTable, CDBTableHeader, CDBTableBody } from "cdbreact";
import Sidebar from "./Sidebar";
import Preloader from "../Preloader/Preloader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [preloaderVisibility, setPreloaderVisibility] = useState("block");
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    fetch("https://pomato-restaurant.herokuapp.com/allorders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setPreloaderVisibility("none");
      })
      .catch((err) => console.log(err));
  }, [orders.length]);

  const selectedStatus = (e, id) => {
    const status = e.target.value;
    const updateStatus = { id, status };

    fetch(`https://pomato-restaurant.herokuapp.com/orders/update/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateStatus),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setIsSuccess(true);
        }
      });
  };

  return (
    <div className="d-flex">
      <div>
        <Sidebar />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <div style={{ height: "100%" }}>
          <div
            style={{
              padding: "20px 5%",
              height: "calc(100% - 64px)",
              overflowY: "scroll",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, minmax(200px, 700px))",
              }}
            >
              <div className="mt-5">
                <h4 className="font-weight-bold mb-3">All Orders</h4>
                {isSuccess && (
                  <p className="ml-3 success-mgs text-success">
                    <FontAwesomeIcon icon={faCheckCircle} /> Status updated
                    successfully
                  </p>
                )}
                <Preloader visibility={preloaderVisibility} />
                <CDBTable responsive>
                  <CDBTableHeader>
                    <tr>
                      <th>No.</th>
                      <th>Order Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Address</th>
                      <th>Status</th>
                    </tr>
                  </CDBTableHeader>
                  <CDBTableBody>
                    {orders.map((order, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{order._id}</td>
                        <td>{order.deliveryDetails.businessname}</td>
                        <td>{order.userEmail}</td>
                        <td>{order.orderedItems[0].item}</td>
                        <td>{order.orderedItems[0].quantity}</td>
                        <td>{order.orderedItems[0].total}</td>
                        <td>
                          {order.deliveryDetails.road},
                          {order.deliveryDetails.address}
                        </td>
                        <td>
                          <select
                            id={order.status}
                            className="text-uppercase fw-bolder"
                            onChange={(e) => selectedStatus(e, `${order._id}`)}
                            name={order.status}
                          >
                            <option value={order.status}>{order.status}</option>
                            <option value="pending" className="text-danger">
                              Pending
                            </option>
                            <option value="on-the-way" className="text-warning">
                              On The way
                            </option>
                            <option value="Delivered" className="text-success">
                              Delivered
                            </option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </CDBTableBody>
                </CDBTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
