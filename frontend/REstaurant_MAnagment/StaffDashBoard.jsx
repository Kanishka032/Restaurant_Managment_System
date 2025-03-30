import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const StaffDashboard = () => {
    const location = useLocation();
    const branchId = location.state?.branchId || 1;
    const [showOrders, setShowOrders] = useState(false);

    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [customer, setCustomer] = useState({ custName: "", custPhone: "" });
    const [searchPhone, setSearchPhone] = useState("");
    const [menu, setMenu] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [showMenuFor, setShowMenuFor] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderSummary, setOrderSummary] = useState(null);
    function Orders() {
        return <div><h2>All Orders</h2></div>;
    }
    
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/staff/all");
                setCustomers(response.data);
            } catch (error) {
                console.error("❌ Error fetching customers:", error);
            }
        };
        fetchCustomers();
    }, []);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/staff/menu/${branchId}`);
                setMenu(response.data);
            } catch (error) {
                console.error("❌ Error fetching menu:", error);
            }
        };
        fetchMenu();
    }, [branchId]);

    const handleCheckboxChange = (menuItem) => {
        setSelectedItems((prev) => {
            const updated = { ...prev };
            if (updated[menuItem.menuId]) {
                delete updated[menuItem.menuId];
            } else {
                updated[menuItem.menuId] = { ...menuItem, quantity: 1 };
            }
            return updated;
        });
    };

    const handlePlaceOrder = async (custId) => {
        if (!custId) {
            return alert("❌ Customer ID is missing.");
        }

        if (Object.keys(selectedItems).length === 0) {
            return alert("⚠️ No items selected.");
        }

        const orderItems = Object.values(selectedItems).map((item) => ({
            foodProduct: { foodProdId: item.menuId },
            quantity: item.quantity || 1,
        }));

        try {
            const response = await axios.post(
                `http://localhost:8080/staff/place-order/${custId}`,
                orderItems,
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("✅ Order Response:", response.data);
            alert("✅ Order placed successfully!");
            setOrderSuccess(true);
            setOrderSummary(response.data);
            setSelectedItems({});

        } catch (error) {
            console.error("❌ Error placing order:", error.response?.data || error.message);
            alert(`⚠️ Failed to place order: ${error.response?.data || error.message}`);
        }
    };

    const handleSearch = async () => {
        if (!searchPhone) return alert("⚠️ Enter a phone number to search.");

        try {
            const response = await axios.get(`http://localhost:8080/staff/search?phone=${searchPhone}`);
            setFilteredCustomers(response.data);
        } catch (error) {
            console.error("❌ Error searching customers:", error);
        }
    };
   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };
    useEffect(() => {
        fetchOrders();
        fetchCustomers();
      }, []);
    
    
    
      const fetchCustomers = async () => {
        try {
          const response = await axios.get("http://localhost:8080/staff/all");
          setCustomers(response.data);
        } catch (error) {
          console.error("Error fetching customers:", error);
        }
      };
    
    
    
    const handleAddCustomer = async () => {
        const customerData = { ...customer, branch: { branchId } };

        try {
            await axios.post("http://localhost:8080/staff/add", customerData, {
                headers: { "Content-Type": "application/json" },
            });
            alert("✅ Customer added successfully!");
        } catch (error) {
            console.error("❌ Error adding customer:", error);
            alert("⚠️ Failed to add customer.");
        }
    };
   
    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:8080/staff/orders");
            console.log("Fetched Orders Data:", response.data); 
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };
    
    const [orders, setOrders] = useState([]);
    
  
        
    const handleEditCustomer = async (id) => {
        const updatedName = prompt("Enter new name (leave blank to keep existing):");
        const updatedPhone = prompt("Enter new phone number (leave blank to keep existing):");

        if (!updatedName && !updatedPhone) return alert("❌ No changes made!");

        const updatedCustomer = {};
        if (updatedName) updatedCustomer.custName = updatedName;
        if (updatedPhone) updatedCustomer.custPhone = updatedPhone;

        try {
            await axios.put(`http://localhost:8080/staff/update/${id}`, updatedCustomer);
            alert("✅ Customer updated successfully!");
            window.location.reload();
        } catch (error) {
            console.error("❌ Error updating customer:", error);
        }
    };

  
    const handlePrintOrder = () => {
      if (orderSummary) {
          const printWindow = window.open("", "_blank");
          printWindow.document.open();
          printWindow.document.write(`
              <html>
                  <head>
                      <title>Order Details</title>
                      <style>
                          body {
                              font-family: Arial, sans-serif;
                          }
                          h2 {
                              color: #28a745;
                          }
                          table {
                              width: 100%;
                              border-collapse: collapse;
                          }
                          th,
                          td {
                              border: 1px solid #ddd;
                              padding: 8px;
                              text-align: left;
                          }
                          th {
                              background-color: #f2f2f2;
                          }
                      </style>
                  </head>
                  <body>
                      <h2>Order Details</h2>
                      <p>
                          <b>Order ID:</b> ${orderSummary.foodOrderId}
                      </p>
                      <p>
                          <b>Total Amount:</b> $${orderSummary.totalPrice}
                      </p>
                      <p>
                          <b>Status:</b> ${orderSummary.status}
                      </p>
                      <p>
                          <b>Order Time:</b> ${orderSummary.orderCrtTime}
                      </p>
                      ${
                        orderSummary.items && orderSummary.items.length > 0
                            ? `
                        <h3>Ordered Items:</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${orderSummary.items
                                    .map(
                                        (item) => `
                                    <tr>
                                        <td>${item.foodProduct.dishName}</td>
                                        <td>${item.quantity}</td>
                                        <td>$${item.price}</td>
                                    </tr>
                                `
                                    )
                                    .join("")}
                            </tbody>
                        </table>
                    `
                            : ""
                    }
                  </body>
              </html>
          `);
          printWindow.document.close();
          printWindow.print();
      }
  };
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showMenu, setShowMenu] = useState(false);


const [showAllCustomers, setShowAllCustomers] = useState(false);

    const handleShowMenu = (custId) => {
        setShowMenuFor(showMenuFor === custId ? null : custId);
    };

    const handleQuantityChange = (foodProdId, quantity) => {
        const parsedQuantity = parseInt(quantity, 10);
        setSelectedItems((prev) => ({
            ...prev,
            [foodProdId]: {
                ...prev[foodProdId],
                quantity: isNaN(parsedQuantity) || parsedQuantity < 1 ? 1 : parsedQuantity,
            },
        }));
    };
    
    const updateOrderStatus = async (foodOrderId, newStatus) => {
        if (!foodOrderId) {
          console.error("Order ID is undefined!");
          alert("Error: Order ID is missing.");
          return;
        }
      
        try {
          const response = await fetch(`http://localhost:8080/staff/update-order-status/${foodOrderId}?status=${newStatus}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error("Failed to update order status");
          }
      
          const updatedOrder = await response.json();
      
          // Update the state to reflect the change
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.foodOrderId === foodOrderId ? { ...order, status: newStatus } : order
            )
          );
      
          alert("Order status updated successfully!");
        } catch (error) {
          console.error("Error updating order status:", error);
          alert("Failed to update order status.");
        }
      };
      
    return (<>
      <nav style={{ backgroundColor: "#007bff", padding: "15px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>Staff Dashboard</h1>
          <div>
          
            <button onClick={() => {setShowMenu(true)
              setShowAddCustomer(false)
              setShowAllCustomers(false)}
            }
            style={{ backgroundColor: "transparent", border: "none", color: "white", fontSize: "16px", cursor: "pointer", margin: "0 15px" }}
            >Show Menu</button>


                        
                        <button onClick={() =>{
                 setShowAddCustomer(true)
                 setShowMenu(false)
               setShowAllCustomers(false)
            }} style={{ backgroundColor: "transparent", border: "none", color: "white", fontSize: "16px", cursor: "pointer", margin: "0 15px" }}>Add Customer</button>
            <button onClick={() => {
                setShowAllCustomers(true)
                setShowAddCustomer(false)
                setShowMenu(false)
                

            }} style={{ backgroundColor: "transparent", border: "none", color: "white", fontSize: "16px", cursor: "pointer", margin: "0 15px" }}>All Customers</button>
<button onClick={() => {
    setShowOrders(true);
    setShowAllCustomers(false);
    setShowAddCustomer(false);
    setShowMenu(false);
    fetchOrders(); // Fetch orders when clicked
}} style={{ backgroundColor: "transparent", border: "none", color: "white", fontSize: "16px", cursor: "pointer", margin: "0 15px" }}>
    Orders
</button>


            </div>
        </div>
      </nav>


      {!showOrders && !showMenu && !showAddCustomer && !showAllCustomers && (
  <div style={{ textAlign: 'center', padding: '50px' }}>
    <h1 style={{ marginBottom: '20px', color: '#333' }}>Welcome Staff</h1>
    <p style={{ fontSize: '18px', color: '#666' }}>
      You are now logged in to the staff dashboard. 
      <br />
      Please use the navigation menu to manage orders, customers, and menus.
    </p>
    <div style={{ marginTop: '30px' }}>
      <p style={{ fontWeight: 'bold' }}>Key Actions:</p>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>- View and manage all orders.</li>
        <li>- Add, edit, and view customer details.</li>
        <li>- Manage menu items and place orders.</li>
      </ul>
    </div>
    <p style={{ marginTop: '30px' }}>
      If you encounter any issues, please contact your system administrator.
    </p>
  </div>
)}
{orderSuccess && orderSummary && (
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ color: '#28a745', marginBottom: '10px' }}>Order Summary</h2>
            <p style={{ marginBottom: '5px' }}><strong>Order ID:</strong> {orderSummary.foodOrderId}</p>
            <p style={{ marginBottom: '5px' }}><strong>Total Amount:</strong> ${orderSummary.totalPrice}</p>
            <p style={{ marginBottom: '5px' }}><strong>Status:</strong> {orderSummary.status}</p>
            <p style={{ marginBottom: '10px' }}><strong>Order Time:</strong> {orderSummary.orderCrtTime}</p>

            {orderSummary.items && orderSummary.items.length > 0 && (
                <div style={{ marginBottom: '10px' }}>
                    <h3 style={{ marginBottom: '8px' }}>Ordered Items:</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {orderSummary.items.map(item => (
                            <li key={item.foodProduct.foodProdId} style={{ marginBottom: '5px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                                {item.foodProduct.dishName} - Quantity: {item.quantity} - Price: ${item.price}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <button onClick={handlePrintOrder} style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Print Order</button>
        </div>
    )}

      {showOrders && !showMenu && !showAddCustomer && !showAllCustomers && (
  <div style={{ padding: "20px" }}>
    <h2 style={{ marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>All Orders</h2>
    <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <thead>
        <tr style={{ backgroundColor: "#f0f0f0" }}>
          <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Order ID</th>
          <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Order Date</th>
          <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Delivery Date</th>
          <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Status</th>
          <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Amount</th>
          <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 ? (
          orders.map((order) => (
            <tr key={order.foodOrderId} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>{order.foodOrderId}</td>
              <td style={{ padding: "10px" }}>{order.orderCrtTime}</td>
              <td style={{ padding: "10px" }}>{order.orderDlvTime || "N/A"}</td>
              <td style={{ padding: "10px" }}>{order.status}</td>
              <td style={{ padding: "10px" }}>${order.totalPrice}</td>
              <td style={{ padding: "10px" }}>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.foodOrderId, e.target.value)}
                  style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>No orders available.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)}

{showMenu && (
  <div style={{
    marginTop: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle shadow
  }}>
    <h3 style={{
      marginBottom: '15px',
      padding: '10px',
      borderBottom: '1px solid #eee',
      backgroundColor: '#f9f9f9', // Light background for the header
    }}>
      Menu for Branch {branchId}
    </h3>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #eee' }}>Image</th>
          <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #eee' }}>Dish Name</th>
          <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #eee' }}>Price</th>
        </tr>
      </thead>
      <tbody>
        {menu.map((menuItem) => (
          <tr
            key={menuItem.menuId}
            style={{ borderBottom: '1px solid #eee' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f0f0f0'; }} // Hover effect
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }} // Remove hover effect
          >
            <td style={{ padding: '10px' }}>
              <img
                src={menuItem.imageUrl}
                alt={menuItem.dishName}
                style={{ width: '50px', height: '50px' }}
              />
            </td>
            <td style={{ padding: '10px' }}>{menuItem.dishName}</td>
            <td style={{ padding: '10px' }}>${menuItem.dishPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}



      {showAddCustomer && (
        <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", margin: "20px auto", backgroundColor: "#f9f9f9", maxWidth: "400px" }}>
          <h2 style={{ marginBottom: "10px" }}>Add Customer</h2>
          <input type="text" name="custName" placeholder="Customer Name" value={customer.custName} onChange={handleInputChange} style={{ padding: "8px", marginRight: "10px", border: "1px solid #ccc", borderRadius: "4px", width: "100%", marginBottom: "10px" }} />
          <input type="text" name="custPhone" placeholder="Phone Number" value={customer.custPhone} onChange={handleInputChange} style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%", marginBottom: "10px" }} />
          <button onClick={handleAddCustomer} style={{ backgroundColor: "#28a745", color: "white", padding: "10px 15px", border: "none", borderRadius: "4px", cursor: "pointer", width: "100%" }}>Add Customer</button>
        </div>
      )}

{showAllCustomers && (
  <div style={{ 
    border: '1px solid #ddd', 
    padding: '15px', 
    borderRadius: '8px', 
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  }}>
    <h2 style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>All Customers</h2>
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ marginBottom: '10px' }}>Search by Phone</h2>
        <input type="text" placeholder="Enter phone number" value={searchPhone} onChange={(e) => setSearchPhone(e.target.value)} style={{ padding: '8px', marginRight: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
        <button onClick={handleSearch} style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}>Search</button>
        <button onClick={() => { setSearchPhone(""); setFilteredCustomers([]); }} style={{ backgroundColor: '#6c757d', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Clear Search</button>
    </div>


    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {(searchPhone && filteredCustomers.length > 0 ? filteredCustomers : customers).map((cust) => (
        <li key={cust.custId} style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>{cust.custName} - {cust.custPhone}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button 
              onClick={() => handleEditCustomer(cust.custId)} 
              style={{ backgroundColor: '#ffc107', color: 'black', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#ffca2c'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ffc107'}
            >
              Edit
            </button>
            <button 
              onClick={() => handleShowMenu(cust.custId)} 
              style={{ backgroundColor: '#17a2b8', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1aabc7'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#17a2b8'}
            >
              {showMenuFor === cust.custId ? "Hide Menu" : "Place Order"}
            </button>
          </div>
          {showMenuFor === cust.custId && (
            <div style={{ marginTop: '10px', border: '1px solid #ddd', padding: '10px', borderRadius: '4px', backgroundColor: '#fff', width: '100%' }}>
              <h3 style={{ marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Menu for Branch {branchId}</h3>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {menu.map((menuItem) => (
                  <li key={menuItem.menuId} style={{ display: "flex", alignItems: "center", marginBottom: "10px", borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    <img src={menuItem.imageUrl} alt={menuItem.dishName} style={{ width: "50px", height: "50px", marginRight: "10px" }} />
                    <span style={{ marginRight: '10px' }}>{menuItem.dishName}</span>
                    <span style={{ marginRight: '10px' }}>${menuItem.dishPrice}</span>
                    <input 
                      type="number" 
                      value={selectedItems[menuItem.menuId]?.quantity || 1} 
                      onChange={(e) => handleQuantityChange(menuItem.menuId, e.target.value)} 
                      style={{ width: "50px", marginLeft: "10px", padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    />
                    <input type="checkbox" onChange={() => handleCheckboxChange(menuItem)} style={{ marginLeft: "10px" }} />
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handlePlaceOrder(cust.custId)} 
                style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2cb04b'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
              >
                Place Order
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
)}

    </>
     
    );
};

export default StaffDashboard;