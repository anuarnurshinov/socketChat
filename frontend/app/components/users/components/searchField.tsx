import * as React from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import CircularProgress from "@mui/material/CircularProgress"
import { Box } from "@mui/material"
import { useEffect, useState } from "react"

type searchFieldProps = {
  setIsSearch: (status: boolean) => void
}
interface Film {
  title: string
  year: number
}

const SearchField: React.FC<searchFieldProps> = ({ setIsSearch }) => {
  const [inputValue, setInputValue] = useState("")

  return (
    <Box
      sx={{
        boxShadow: "0px 2px 8px 0px rgba(34, 60, 80, 0.2)",
        p: "0 1.5rem",
        height: "10%",
      }}>
      <TextField
        fullWidth
        id="filled-search"
        label="Search field"
        type="search"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        className={"verticalCenter"}
        sx={styles.textInput}
        onFocus={() => {
          setIsSearch(true)
        }}
        InputProps={{
          endAdornment: (
            <React.Fragment>
              {inputValue ? (
                <CircularProgress sx={{ color: "white" }} size={20} />
              ) : null}
            </React.Fragment>
          ),
        }}
        onBlur={() => {
          if (inputValue === "") {
            setIsSearch(false)
          }
        }}
      />
    </Box>
  )
}

const styles = {
  textInput: {
    borderRadius: "4px",
    bgcolor: "#3596ff",
    "& input": {
      color: "white",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiInputLabel-root": {
      color: "#fffffff2",
    },
    "& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
      color: "#ffffffb3",
    },
    "& input::-webkit-search-cancel-button": {
      visibility: "hidden",
    },
  },
}

export default SearchField
