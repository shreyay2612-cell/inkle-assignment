import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Checkbox from "@mui/material/Checkbox";

export default function DataTable({
  data,
  columns,
  onEditRow,
  countryFilter,
  setCountryFilter,
  allCountries
}) {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.accessorKey} style={{ position: col.accessorKey === "country" ? "relative" : "static" }}>
              {col.header}
              {col.accessorKey === "country" && (
                <span
                  className="edit-btn-wrap"
                  style={{ display: "inline-flex", marginLeft: 6, verticalAlign: "middle" }}
                >
                  <span
                    className="edit-icon-btn"
                    style={{
                      borderColor: "#E7E6EB",
                      borderRadius: "4px",
                      padding: 2,
                      width: 28,
                      height: 28,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#fff"
                    }}
                    tabIndex={0}
                    title="Filter by country"
                    onClick={() =>
                      setCountryFilter((prev) => ({
                        ...prev,
                        open: !prev.open
                      }))
                    }
                  >
                    <FilterAltOutlinedIcon
                      style={{
                        color: "#6C3AFF",
                        fontSize: 20
                      }}
                    />
                  </span>
                  {/* Dropdown */}
                  {countryFilter.open && (
                    <div
                      className="country-filter-menu"
                      style={{
                        position: "absolute",
                        top: 38,
                        left: 0,
                        zIndex: 99,
                        width: 220,
                        borderRadius: 8,
                        border: "1px solid #E7E6EB",
                        background: "#fff",
                        boxShadow: "0 8px 22px rgba(108,58,255,0.11)",
                        padding: "8px 0"
                      }}
                    >
                      {allCountries.map((c) => (
                        <label
                          key={c.name}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "7px 16px",
                            cursor: "pointer",
                            fontSize: 16
                          }}
                        >
                          <Checkbox
                            className="country-checkbox"
                            checked={countryFilter.selected.includes(c.name)}
                            onChange={(e) => {
                              const updated = e.target.checked
                                ? [...countryFilter.selected, c.name]
                                : countryFilter.selected.filter((x) => x !== c.name);
                              setCountryFilter((prev) => ({
                                ...prev,
                                selected: updated
                              }));
                            }}
                            size="small"
                            sx={{
                              color: "#6C3AFF",
                              "&.Mui-checked": {
                                color: "#6C3AFF"
                              },
                              marginRight: "10px"
                            }}
                          />
                          {c.name}
                        </label>
                      ))}
                    </div>
                  )}
                </span>
              )}
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="table-row">
            <td>
              <a href="#">{row.name}</a>
            </td>
            <td>
              <span
                className={`gender-pill ${
                  row.gender.toLowerCase() === "male"
                    ? "gender-male"
                    : "gender-female"
                }`}
              >
                {row.gender.charAt(0).toUpperCase() + row.gender.slice(1)}
              </span>
            </td>
            <td>
              {row.requestDate
                ? new Date(row.requestDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                  })
                : ""}
            </td>
            <td>{row.country}</td>
            <td>
              <div className="edit-btn-wrap">
                <span
                  className="edit-icon-btn"
                  onClick={() => onEditRow(row)}
                  tabIndex={0}
                  title="Edit"
                >
                  <EditIcon style={{ fontSize: "18px" }} />
                </span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
