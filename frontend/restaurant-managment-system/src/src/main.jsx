
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./Qspider.css"
// import "../src/Contextpi_Task/Digital_expense_tracker"
// import "./index.css"
// ? React is responsible for all in built function
// & ReactDOM is responsible for rendering React Content

// console.log(React);
// console.log(ReactDOM);


// ~ TO Create React Root:
let root =ReactDOM.createRoot(document.getElementById("root"));

// ^To render Content
// root.render("hellooooo");    // ! String
// root.render(<h1>Helloooo</h1>); 
//    // ! Js Element
// root.render(<App></App>);    // ! Components



root.render(<App />)
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// // import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

