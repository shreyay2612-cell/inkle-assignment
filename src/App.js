import React, { useEffect, useState } from "react";
import DataTable from "./Table";
import EditModal from "./EditModal";
import { getTaxes, getCountries, updateCustomer } from "./api";
import "./styles.css";

function App() {
  const [tableData, setTableData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Country filter dropdown state
  const [countryFilter, setCountryFilter] = useState({ open: false, selected: [] });

  // Fetch API data on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const taxes = await getTaxes();
      const countriesList = await getCountries();
      setTableData(taxes);
      setCountries(countriesList);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Table columns based on Figma spec
  const columns = [
    {
      accessorKey: "name",
      header: "Entity",
      cell: ({ getValue }) => (
        <a href="#" style={{ fontWeight: 500, color: "#6C3AFF", textDecoration: "none", fontSize: 16 }}>
          {getValue()}
        </a>
      ),
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ getValue }) => {
        const value = (getValue() || "").toLowerCase();
        if (value === "male") {
          return (
            <span className="gender-pill gender-male">
              Male
            </span>
          );
        }
        return (
          <span className="gender-pill gender-female">
            Female
          </span>
        );
      },
    },
    {
      accessorKey: "requestDate",
      header: "Request date",
      cell: ({ getValue }) =>
        getValue()
          ? new Date(getValue()).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "",
    },
    {
      accessorKey: "country",
      header: "Country",
      cell: ({ getValue }) => getValue(),
    },
  ];

  // Filtering logic: table only shows selected countries
  const filteredData = countryFilter.selected.length
    ? tableData.filter(row => countryFilter.selected.includes(row.country))
    : tableData;

  // Edit flow
  const handleEditRow = row => {
    setSelectedRow(row);
    setEditOpen(true);
  };

  const handleSave = async updatedFields => {
    const payload = { ...selectedRow, ...updatedFields };
    await updateCustomer(selectedRow.id, payload);
    setTableData(await getTaxes());
    setEditOpen(false);
  };

  return (
    <div className="main-bg">
      <h2 style={{
        marginBottom: 24,
        color: "#fff",
        fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
        fontWeight: 700,
        fontSize: "28px"
      }}>
        Interview Assignment Table
      </h2>
      {loading ? (
        <div style={{ color: "#fff", fontSize: "18px" }}>Loading...</div>
      ) : (
        <DataTable
          data={filteredData}
          columns={columns}
          onEditRow={handleEditRow}
          countryFilter={countryFilter}
          setCountryFilter={setCountryFilter}
          allCountries={countries}
        />
      )}
      <EditModal
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        rowData={selectedRow}
        countries={countries}
        handleSave={handleSave}
      />
    </div>
  );
}

export default App;
