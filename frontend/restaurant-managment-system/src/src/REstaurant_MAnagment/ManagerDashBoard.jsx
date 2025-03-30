import React, { useEffect, useState,useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
// import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


import "./manager.module.css"
const API_BASE = "http://localhost:8080/manager";
function ImageWithFallback({ imageUrl, alt }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); 

  const imageSrc = useMemo(() => {
    return imageUrl ? `http://localhost:8080/images/${imageUrl.split('/').pop()}` : null;  }, [imageUrl]);

  useEffect(() => {
    if (!imageSrc) { 
      setLoading(false);
      setError(true);
      return;
    }
    setLoading(true);
    setError(false);
    setImage(null);

    const img = new window.Image();
    img.onload = () => {
      setImage(imageSrc);
      setLoading(false);
    };
    img.onerror = () => {
      setLoading(false);
      setError(true);
    };
    img.src = imageSrc;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSrc]);

  if (loading) {
    return (
      <div
        style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#eee',
          borderRadius: '5px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return <div style={{ width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No Fetching</div>;
  }

  return <img src={image} alt={alt} width="80" height="80" style={{ borderRadius: '5px' }} />;
}

  

const ManagerDashboard = () => {
  const location = useLocation();
  
  const branchId = location.state?.branchId || "N/A";
  const [totalPrice, setTotalPrice] = useState(0);

  const [menu, setMenu] = useState([]);
  const [staff, setStaff] = useState([]);
  const [newMenu, setNewMenu] = useState({});
  const [newStaff, setNewStaff] = useState({});
  const [editItem, setEditItem] = useState(null);
  const [editType, setEditType] = useState("");
  const [formData, setFormData] = useState({});
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showAllStaff, setShowAllStaff] = useState(false);

  const imageSrc = useMemo(() => 
  menu.imageUrl ? `http://localhost:8080/images/${menu.imageUrl.split('/').pop()}` : 'placeholder.jpg', 
  [menu.imageUrl]
);
console.log("Checking autoTable:", typeof jsPDF.API.autoTable);
console.log("Checking autoTable (instance):", typeof new jsPDF().autoTable);
console.log("jsPDF Version:", jsPDF.version);


  useEffect(() => {
    if (branchId !== "N/A") {
      fetchMenu();
      fetchStaff();
    }
  }, [branchId]);
  const [foodProducts, setFoodProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/manager/food-products/branch/${branchId}`)
      .then((response) => setFoodProducts(response.data))
      .catch((error) => console.error("Error fetching food products:", error));
  }, [branchId]);

  const toggleAvailability = (foodProdId, currentStatus) => {
    const newStatus = currentStatus === "Available" ? "Not Available" : "Available";

    axios
      .put(`http://localhost:8080/manager/food-product/update-availability/${foodProdId}?availability=${newStatus}`)
      .then(() => {
        setFoodProducts((prevProducts) =>
          prevProducts.map((prod) =>
            prod.foodProdId === foodProdId ? { ...prod, foodProdAvailibility: newStatus } : prod
          )
        );
      })
      .catch((error) => console.error("Error updating availability:", error));
  };

  
  useEffect(() => {
    if (branchId !== "N/A") {
      fetchMenu();
      fetchStaff();
  
     
      fetch(`http://localhost:8080/manager/orders/total-price/${branchId}`)
        .then((response) => response.json())
        .then((data) => setTotalPrice(data))
        .catch((error) => console.error("Error fetching total price:", error));
    }
  }, [branchId]);
  
  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${API_BASE}/menu/view?branchId=${branchId}`);
      setMenu(res.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };
 
  
  const toggleStaffSection = () => {
    setShowAddStaff(!showAddStaff);
  };
  
  const downloadMenuPDF = () => {
    const doc = new jsPDF();
  
    doc.text("Menu Items", 20, 10);
  
    autoTable(doc, {
      head: [["Dish Name", "Price", "Category", "Image URL"]],
      body: menu.map((item) => [item.dishName, item.dishPrice, item.dishCategory, item.ImageUrl]),
    });
  
    doc.save("menu.pdf");
  };
  
  useEffect(() => {
    axios.get("http://localhost:8080/manager/staff/view")
      .then(res => {
        console.log("Staff API Response:", res.data); 
        setStaff(res.data);
      })
      .catch(err => console.error("Error fetching staff:", err));
  }, []);
  
 
  
  
  const fetchStaff = async () => {
    try {
      const res = await axios.get(`${API_BASE}/staff/view?branchId=${branchId}`);
      setStaff(res.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };
  



  const handleAddStaff = async () => {
    try {
      const staffData = { ...newStaff, branchId };
      await axios.post(`${API_BASE}/staff/add?branchId=${branchId}`, staffData);
      fetchStaff(); 
      setNewStaff({}); 
    } catch (error) {
      console.error("Error adding staff:", error);
    }
  };
  

  const handleEdit = async () => {
    try {
      const endpoint = editType === "menu"
        ? `${API_BASE}/menu/edit/${editItem.menuId}/${branchId}` 
        : `${API_BASE}/staff/edit/${editItem.userId}`;
      await axios.put(endpoint, formData);
      editType === "menu" ? fetchMenu() : fetchStaff();
      setEditItem(null);
    } catch (error) {
      console.error("Error editing:", error);
    }
  };
  

  const handleDeleteMenu = async (menuId) => {
    try {
      await axios.delete(`${API_BASE}/menu/delete/${menuId}`);
      fetchMenu();
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  };

  const handleDeleteStaff = async (userId) => {
    try {
      await axios.delete(`${API_BASE}/staff/remove/${userId}`);
      fetchStaff();
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };const inputStyle = {
    width: 'calc(100% - 1.25rem)',
    padding: '0.75rem',
    marginBottom: '0.75rem',
    border: '1px solid #ced4da',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    boxSizing: 'border-box',
  };
  const handleDashboardClick = () => {
    setShowDashboard(true);
    setShowAddMenu(false);
    setShowAllMenu(false);
    setShowAddStaff(false);
    setShowAllStaff(false);
  };
  
  const handleAddMenuClick = () => {
    setShowAddMenu(true);
    setShowDashboard(false);
    setShowAllMenu(false);
    setShowAddStaff(false);
    setShowAllStaff(false);
  };
  
  const handleAllMenuClick = () => {
    setShowAllMenu(true);
    setShowDashboard(false);
    setShowAddMenu(false);
    setShowAddStaff(false);
    setShowAllStaff(false);
  };
  
  const handleAddStaffClick = () => {
    setShowAllMenu(false);
    setShowDashboard(false);
    setShowAddMenu(false);
    setShowAllStaff(false);
    setShowAddStaff(true);
  };
  
  const handleAllStaffClick = () => {
    setShowAllMenu(false);
    setShowDashboard(false);
    setShowAddMenu(false);
    setShowAddStaff(false);
    setShowAllStaff(true);
  };
  
  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const openEditModal = (item, type) => {
    setEditItem(item);
    setEditType(type);
    setFormData(item);
  };
  const tableHeaderStyle = {
    padding: "10px",
    borderBottom: "2px solid #ddd",
    fontWeight: "bold",
  };
  
  const tableRowStyle = {
    borderBottom: "1px solid #ddd",
  };
  
  const tableCellStyle = {
    padding: "10px",
    textAlign: "left",
  };
  
  const handleAddMenu = async () => {
    console.log("Sending Data:", newMenu);
  
    try {
      const response = await axios.post(`${API_BASE}/menu/add?branchId=${branchId}`, newMenu, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      console.log("API Response:", response.data);
      fetchMenu(); 
      setNewMenu({});
    } catch (error) {
      console.error("Error adding menu:", error);
    }
  };const downloadStaffPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
  
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Staff Members Report", 110, 15);
  
    autoTable(doc, {
      startY: 25,
      head: [["Name", "Address", "Email", "Contact"]],
      body: staff.map((user) => [user.userName, user.userAddr, user.userEmail, user.userContact]),
    });
  
    doc.save("staff_report.pdf");
  };
  
return (
    <div style={{ display: 'flex' }}>
      <nav style={{
        width: '220px',
        background: '#333',
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        boxSizing: 'border-box',
        fontFamily: 'Roboto, sans-serif',
      }}>

        <div style={{
          padding: '15px 20px',
          textAlign: 'left',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#eee',
          marginBottom: '30px',
        }}>
          Manager Dashboard
        </div>

        <div style={{ flexGrow: 1, marginTop: "130px" }}>
          <button
            onClick={handleDashboardClick}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '18px 20px',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '16px',
              color: '#eee',
              transition: 'background-color 0.3s ease',
              width: '100%',
              fontWeight: '500',
              '&:hover': {
                background: '#444',
              }
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#444')}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            Dashboard
          </button>
          <button
            onClick={handleAddMenuClick}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '18px 20px',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '16px',
              color: '#eee',
              transition: 'background-color 0.3s ease',
              width: '100%',
              fontWeight: '500',
              '&:hover': {
                background: '#444',
              }
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#444')}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            Add Menu
          </button>
          <button
            onClick={handleAllMenuClick}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '18px 20px',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '16px',
              color: '#eee',
              transition: 'background-color 0.3s ease',
              width: '100%',
              fontWeight: '500',
              '&:hover': {
                background: '#444',
              }
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#444')}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            All Menu
          </button>
          <button
            onClick={handleAddStaffClick}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '18px 20px',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '16px',
              color: '#eee',
              transition: 'background-color 0.3s ease',
              width: '100%',
              fontWeight: '500',
              '&:hover': {
                background: '#444',
              }
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#444')}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            Add Staff
          </button>
          <button
            onClick={handleAllStaffClick}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '18px 20px',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '16px',
              color: '#eee',
              transition: 'background-color 0.3s ease',
              width: '100%',
              fontWeight: '500',
              '&:hover': {
                background: '#444',
              }
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#444')}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            All Staff
          </button>
        </div>
      </nav>

      <div style={{ flex: 1 }}>
        {showDashboard && (
          <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ color: '#333', marginBottom: '10px' }}>Manager Dashboard</h1>
            <p style={{ color: '#555', fontSize: '16px' }}>Branch ID: {branchId}</p>
            <p><strong>Total Order Price:</strong> ${totalPrice.toFixed(2)}</p>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
              <thead>
                <tr style={{ background: "#f4f4f4", textAlign: "left" }}>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd', fontWeight: 'bold' }}>Name</th>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd', fontWeight: 'bold' }}>Type</th>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd', fontWeight: 'bold' }}>Description</th>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd', fontWeight: 'bold' }}>Price</th>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd', fontWeight: 'bold' }}>Availability</th>
                </tr>
              </thead>
              <tbody>
                {foodProducts.map((product) => (
                  <tr key={product.foodProdId} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '10px', textAlign: 'left' }}>{product.foodProdName}</td>
                    <td style={{ padding: '10px', textAlign: 'left' }}>{product.foodProdType}</td>
                    <td style={{ padding: '10px', textAlign: 'left' }}>{product.foodProdAbout}</td>
                    <td style={{ padding: '10px', textAlign: 'left' }}>₹{product.foodProdPrice}</td>
                    <td style={{ padding: '10px', textAlign: 'left' }}>
                      <button
                        onClick={() => toggleAvailability(product.foodProdId, product.foodProdAvailibility)}
                        style={{
                          padding: "8px 12px",
                          borderRadius: "5px",
                          border: "none",
                          color: "white",
                          backgroundColor: product.foodProdAvailibility === "Available" ? "green" : "red",
                          cursor: "pointer",
                        }}
                      >
                        {product.foodProdAvailibility}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showAddMenu && (
  <div
    style={{
      padding: '0px',
     
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      maxWidth: '520px',
      margin: '20px auto',
      fontFamily: 'Montserrat, sans-serif', 
      border: '1px solid #e1e1e1', 
    }}
  >
    <h2
      style={{
        color: '#333',
        marginBottom: '30px',
        textAlign: 'center',
        fontSize: '28px',
        fontWeight: '600',
        borderBottom: '2px solid #e8e8e8', 
        paddingBottom: '20px',
      }}
    >
      Add Menu Item
    </h2>

    <div style={{ marginBottom: '25px' }}>
      <input
        name="dishName"
        value={newMenu.dishName || ''}
        placeholder="Dish Name"
        onChange={(e) => handleInputChange(e, setNewMenu)}
        style={{
          width: '100%',
          padding: '16px',
          border: '1px solid #e0e0e0',
          borderRadius: '10px',
          fontSize: '16px',
          outline: 'none',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#63b3ed'; 
          e.target.style.boxShadow = '0 0 8px rgba(99, 179, 237, 0.4)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#e0e0e0';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>

    <div style={{ marginBottom: '25px' }}>
      <input
        name="dishPrice"
        type="number"
        value={newMenu.dishPrice || ''}
        placeholder="Dish Price"
        onChange={(e) => handleInputChange(e, setNewMenu)}
        style={{
          width: '100%',
          padding: '16px',
          border: '1px solid #e0e0e0',
          borderRadius: '10px',
          fontSize: '16px',
          outline: 'none',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#63b3ed';
          e.target.style.boxShadow = '0 0 8px rgba(99, 179, 237, 0.4)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#e0e0e0';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>

    <div style={{ marginBottom: '25px' }}>
      <input
        name="dishCategory"
        value={newMenu.dishCategory || ''}
        placeholder="Category"
        onChange={(e) => handleInputChange(e, setNewMenu)}
        style={{
          width: '100%',
          padding: '16px',
          border: '1px solid #e0e0e0',
          borderRadius: '10px',
          fontSize: '16px',
          outline: 'none',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#63b3ed';
          e.target.style.boxShadow = '0 0 8px rgba(99, 179, 237, 0.4)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#e0e0e0';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>

    <div style={{ marginBottom: '30px' }}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setSelectedImage(e.target.files[0])}
        style={{
          width: '100%',
          padding: '14px',
          border: '1px solid #e0e0e0',
          borderRadius: '10px',
          fontSize: '16px',
          outline: 'none',
          backgroundColor: '#f7fafc', 
          cursor: 'pointer',
        }}
      />
    </div>

    <button
      onClick={handleAddMenu}
      style={{
        backgroundColor: '#63b3ed', 
        color: 'white',
        padding: '16px 20px',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        width: '100%',
        fontSize: '18px',
        fontWeight: '600',
        transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
        boxShadow: '0 4px 10px rgba(99, 179, 237, 0.5)',
        '&:hover': {
          backgroundColor: '#4299e1', 
          transform: 'translateY(-3px)',
          boxShadow: '0 6px 14px rgba(99, 179, 237, 0.6)',
        },
        '&:active': {
          transform: 'translateY(0)',
          boxShadow: '0 2px 8px rgba(99, 179, 237, 0.5)',
        },
      }}
    >
      Add Menu Item
    </button>
  </div>
)}
{showAddStaff && (
  <section
    style={{
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '0.5rem',
      boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)',
      maxWidth: '800px', 
      margin: '2rem auto',
      fontFamily: 'sans-serif',
    }}
  >
    <h2
      style={{
        color: '#343a40',
        marginBottom: '1.5rem',
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: '600',
      }}
    >
      Add Staff Members
    </h2>

    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <tbody>
        <tr>
          <td>
            <input
              name="userName"
              value={newStaff.userName || ""}
              placeholder="Name"
              onChange={(e) => handleInputChange(e, setNewStaff)}
              style={inputStyle}
            />
          </td>
          <td>
            <input
              name="userAddr"
              value={newStaff.userAddr || ""}
              placeholder="Address"
              onChange={(e) => handleInputChange(e, setNewStaff)}
              style={inputStyle}
            />
          </td>
          <td>
            <input
              name="userEmail"
              value={newStaff.userEmail || ""}
              placeholder="Email"
              onChange={(e) => handleInputChange(e, setNewStaff)}
              style={inputStyle}
            />
          </td>
        </tr>
        <tr>
          <td>
            <input
              name="userContact"
              value={newStaff.userContact || ""}
              placeholder="Contact"
              onChange={(e) => handleInputChange(e, setNewStaff)}
              style={inputStyle}
            />
          </td>
          <td>
            <input
              name="userGender"
              value={newStaff.userGender || ""}
              placeholder="Gender"
              onChange={(e) => handleInputChange(e, setNewStaff)}
              style={inputStyle}
            />
          </td>
          <td>
            <input
              name="userDob"
              type="date"
              value={newStaff.userDob || ""}
              placeholder="Date of Birth"
              onChange={(e) => handleInputChange(e, setNewStaff)}
              style={inputStyle}
            />
          </td>
        </tr>
        <tr>
          <td>
            <input
              name="userAge"
              type="number"
              value={newStaff.userAge || ""}
              placeholder="Age"
              onChange={(e) => handleInputChange(e, setNewStaff)}
              style={inputStyle}
            />
          </td>
          <td>
            <input
              name="userSalary"
              type="number"
              value={newStaff.userSalary || ""}
              placeholder="Salary"
              onChange={(e) => handleInputChange(e, setNewStaff)}
              style={inputStyle}
            />
          </td>
          <td>
            <input
              name="userPwd"
              value={newStaff.userPwd || ""}
              placeholder="Password"
              onChange={(e) => handleInputChange(e, setNewStaff)}
              style={inputStyle}
            />
          </td>
        </tr>
        <tr>
          <td colSpan="3">
            <input
              name="userRole"
              value={newStaff.userRole || "STAFF"}
              placeholder="Role"
              onChange={(e) => handleInputChange(e, setNewStaff)}
              style={{ ...inputStyle, width: 'calc(100% - 1.25rem)' }} // full width for role.
            />
          </td>
        </tr>
      </tbody>
    </table>

    <button
      onClick={handleAddStaff}
      style={{
        backgroundColor: '#28a745',
        color: 'white',
        padding: '0.75rem 1.25rem',
        border: 'none',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        width: '100%',
        fontSize: '1.125rem',
        fontWeight: '500',
        transition: 'background-color 0.3s ease',
        boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.2)',
        marginTop: "1rem"
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
      onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
    >
      Add Staff
    </button>
  </section>
)}

{showAllStaff && (
  <div style={{ marginTop: '20px', width: '80%', marginLeft: 'auto', marginRight: 'auto', fontFamily: 'sans-serif' }}>
    <button
      onClick={downloadStaffPDF}
      style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginBottom: '15px',
        fontSize: '16px',
        fontWeight: '500',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
      }}
    >
      Download Staff PDF
    </button>
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <thead>
        <tr style={{ backgroundColor: '#f8f9fa' }}>
          <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #dee2e6', fontWeight: '600', fontSize: '16px' }}>Name</th>
          <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #dee2e6', fontWeight: '600', fontSize: '16px' }}>Email</th>
          <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #dee2e6', fontWeight: '600', fontSize: '16px' }}>Contact</th>
          <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #dee2e6', fontWeight: '600', fontSize: '16px' }}>Role</th>
          <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #dee2e6', fontWeight: '600', fontSize: '16px' }}>Branch</th>
          <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #dee2e6', fontWeight: '600', fontSize: '16px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {staff.map((user, index) => (
          <tr key={user.userId} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9', color: index % 3 === 2 ? '#007bff' : 'inherit' }}>
            <td style={{ padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid #eee', fontSize: '15px' }}>{user.userName}</td>
            <td style={{ padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid #eee', fontSize: '15px' }}>{user.userEmail}</td>
            <td style={{ padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid #eee', fontSize: '15px' }}>{user.userContact}</td>
            <td style={{ padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid #eee', fontSize: '15px' }}>{user.userRole}</td>
            <td style={{ padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid #eee', fontSize: '15px' }}>{user.branchId}</td>
            <td style={{ padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid #eee' }}>
              <button
                onClick={() => openEditModal(user, 'staff')}
                style={{ backgroundColor: '#17a2b8', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '5px', marginRight: '5px', cursor: 'pointer', fontSize: '14px' }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteStaff(user.userId)}
                style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

{editItem && (
  <div
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      zIndex: '1000',
      fontFamily: 'sans-serif',
      width: '400px'
    }}
  >
    <h2 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>Edit {editType === 'menu' ? 'Menu' : 'Staff'}</h2>
    {Object.keys(formData).map((key) => (
      <input
        key={key}
        name={key}
        value={formData[key] || ''}
        onChange={(e) => handleInputChange(e, setFormData)}
        placeholder={key}
        style={{ width: 'calc(100% - 22px)', padding: '12px', marginBottom: '15px', border: '1px solid #ced4da', borderRadius: '8px', fontSize: '15px' }}
      />
    ))}
    <button onClick={handleEdit} style={{ backgroundColor: '#28a745', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '15px', fontSize: '16px', fontWeight: '500' }}>
      Save Changes
    </button>
    <button onClick={() => setEditItem(null)} style={{ backgroundColor: '#6c757d', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px', marginLeft: '10px', fontSize: '16px', fontWeight: '500' }}>
      Cancel
    </button>
  </div>
)}

{showAllMenu && (
  <div style={{
    marginTop: '30px',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'Arial, sans-serif'
  }}>
    <button onClick={downloadMenuPDF} style={{
      backgroundColor: '#28a745',
      color: 'white',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      marginBottom: '15px',
      transition: 'background-color 0.3s ease'
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
    onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
    >Download Menu PDF</button>
    <table border="1" style={{
      marginTop: '10px',
      width: '100%',
      borderCollapse: 'collapse',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Dish Name</th>
          <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Price</th>
          <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Category</th>
          <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Image</th>
          <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {menu.map((item) => (
          <tr key={item.menuId} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px', textAlign: 'left' }}>{item.dishName}</td>
            <td style={{ padding: '12px', textAlign: 'left' }}>{item.dishPrice}</td>
            <td style={{ padding: '12px', textAlign: 'left' }}>{item.dishCategory}</td>
            <td style={{ padding: '12px', textAlign: 'center' }}>
      <ImageWithFallback imageUrl={item.imageUrl} alt={item.dishName} />
    </td>
     <td style={{ padding: '12px', textAlign: 'center' }}>
              <button onClick={() => openEditModal(item, 'menu')} style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '8px 12px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '5px',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
              >Edit</button>
              <button onClick={() => handleDeleteMenu(item.menuId)} style={{
                backgroundColor: '#dc3545',
                color: 'white',
                padding: '8px 12px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#c82333')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#dc3545')}
              >Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

      </div>
      
    </div>
  
);
};

export default ManagerDashboard;
