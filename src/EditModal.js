import React, { useEffect, useState } from "react";
import {
  Dialog,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

// Custom Modal Header per previous Figma specs
function ModalHeader() {
  return (
    <div
      style={{
        width: 560,
        height: 56,
        display: "flex",
        alignItems: "center",
        background: "#fff",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingTop: 16,
        paddingRight: 16,
        paddingBottom: 16,
        paddingLeft: 32,
        borderBottom: "1px solid #F3F3F5",
        gap: 4,
        boxSizing: "border-box"
      }}
    >
      <span
        style={{
          fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
          fontWeight: 500,
          fontSize: "22px",
          color: "#222"
        }}
      >
        Edit Customer
      </span>
    </div>
  );
}

// Modal Footer per latest Figma specs
function ModalFooter({ handleClose, onSave, disabled }) {
  return (
    <div
      style={{
        width: 560,
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        background: "#fff",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTop: "1px solid #F3F3F5",
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 24,
        paddingRight: 24,
        gap: 12,
        boxSizing: "border-box"
      }}
    >
      <button
        onClick={handleClose}
        style={{
          borderRadius: 8,
          border: "1px solid #CBCBCB",
          padding: "10px 22px",
          background: "#fff",
          color: "#333",
          fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
          fontSize: 15,
          fontWeight: 500,
          cursor: "pointer",
          outline: "none"
        }}
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        disabled={disabled}
        style={{
          borderRadius: 8,
          border: "none",
          padding: "10px 30px",
          background: "#6C3AFF",
          color: "#fff",
          fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
          fontSize: 15,
          fontWeight: 600,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.65 : 1,
          outline: "none"
        }}
      >
        Save
      </button>
    </div>
  );
}

export default function EditModal({
  open,
  handleClose,
  rowData,
  countries,
  handleSave,
}) {
  const [name, setName] = useState(rowData?.name || "");
  const [country, setCountry] = useState(rowData?.country || "");

  useEffect(() => {
    setName(rowData?.name || "");
    setCountry(rowData?.country || "");
  }, [rowData, open]);

  const onSave = () => {
    if (!name || !country) return;
    handleSave({ name, country });
  };

  // Custom dropdown from previous answers
  const CountryDropdownMenuProps = {
    PaperProps: {
      className: "country-edit-dropdown",
      style: {
        minWidth: 496,
        width: 496,
        maxWidth: 496,
        height: 156,
        maxHeight: 156,
        borderRadius: 4,
        border: "1px solid #E7E6EB",
        background: "#fff",
        padding: 4,
        overflowY: "auto",
        boxSizing: "border-box"
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: "17px",
          minWidth: 560,
          maxWidth: 560,
          background: "#fff"
        },
        style: {
          width: 560,
          minHeight: 442,
          borderRadius: 17,
          background: "#fff"
        }
      }}
    >
      <ModalHeader />
      <div
        style={{
          width: 560,
          minHeight: 386,
          background: "#fff",
          paddingTop: 20,
          paddingRight: 32,
          paddingBottom: 20,
          paddingLeft: 32,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxSizing: "border-box"
        }}
      >
        <TextField
          fullWidth
          margin="dense"
          label={
            <span>
                Name <span style={{ color: "#F44336" }}>*</span>
            </span>
          }
          value={name}
          onChange={e => setName(e.target.value)}
          required={false}
          InputLabelProps={{ 
            style: { fontWeight: 500 },
            shrink: true
        }}
          inputProps={{ style: { fontSize: 16, fontWeight: 500 } }}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Country</InputLabel>
          <Select
            value={country}
            label="Country"
            onChange={e => setCountry(e.target.value)}
            MenuProps={CountryDropdownMenuProps}
            sx={{
              fontSize: 16,
              borderRadius: "7px",
              fontFamily: "'Inter','Segoe UI',Arial,sans-serif"
            }}
          >
            {countries.map((c) => (
              <MenuItem key={c.name} value={c.name} sx={{ fontSize: 16 }}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <ModalFooter
        handleClose={handleClose}
        onSave={onSave}
        disabled={!name || !country}
      />
    </Dialog>
  );
}
