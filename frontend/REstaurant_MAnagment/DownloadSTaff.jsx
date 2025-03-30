import jsPDF from "jspdf";
import "jspdf-autotable";

const downloadStaffPDF = (staff) => {
  if (!staff || staff.length === 0) {
    alert("No staff data available!");
    return;
  }

  const doc = new jsPDF({ orientation: "landscape" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Staff Members Report", 110, 15);

  doc.autoTable({
    startY: 25,
    margin: { top: 20, left: 10, right: 10 },
    head: [["Name", "Address", "Email", "Contact", "Gender", "DOB", "Age", "Salary", "Role", "Branch ID"]],
    body: staff.map((user) => [
      user?.userName || "N/A",
      user?.userAddr || "N/A",
      user?.userEmail || "N/A",
      user?.userContact || "N/A",
      user?.userGender || "N/A",
      user?.userDob || "N/A",
      user?.userAge || "N/A",
      user?.userSalary ? `$${user.userSalary}` : "N/A",
      user?.userRole || "N/A",
      user?.branch?.branchId || "N/A",
    ]),
    theme: "grid",
    headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 13, halign: "center" },
    bodyStyles: { fontSize: 10 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    styles: { cellPadding: 5, valign: "middle", halign: "center", overflow: "linebreak" },
    columnStyles: { 
      0: { cellWidth: 30 }, 1: { cellWidth: 40 }, 2: { cellWidth: 50 }, 3: { cellWidth: 30 }, 
      4: { cellWidth: 20 }, 5: { cellWidth: 25 }, 6: { cellWidth: 15 }, 7: { cellWidth: 25 }, 
      8: { cellWidth: 30 }, 9: { cellWidth: 20 } 
    },
    didDrawPage: (data) => {
      doc.setFontSize(10);
      doc.text(`Page ${doc.internal.getNumberOfPages()}`, 270, doc.internal.pageSize.height - 10);
    },
  });

  // Save PDF
  doc.save("staff_report.pdf");
};

export default downloadStaffPDF;
