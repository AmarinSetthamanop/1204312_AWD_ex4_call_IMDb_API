import {
  AppBar,
  Box,
  MenuItem,
  Select,
  TextField,
  Toolbar,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "../navbar/navbar.css";
import { useRef, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  // ตัวเลือกสำหรับค้นหาด้วย ชื่อ หรือ id ของหนัง
  const [selectSearch, setSelectSearch] = useState("Movie Name");
  // สิ่งที่ต้องการค้นหาของหนัง
  const name_id_movie_search = useRef<HTMLInputElement>();

  // กลับไปหน้า home
  function navigateToHomePage() {
    navigate("/");
  }

  // ปุ่มค้นหา กลับไปที่หน้า Home โดยส่ง ชื่อของหนังที่ต้องการค้นหาไป
  function btn_Search_Movies_By_Name(movieNameSearch : unknown) {
    navigate("/?movieNameSearch=" + movieNameSearch);
  }

  // ปุ่มค้นหา กลับไปที่หน้า Home โดยส่ง imdbID ของหนังที่ต้องการค้นหาไป
  function btn_Search_Movies_By_imdbID(imdbID : unknown) {
    navigate("/?imdbIDSearch=" + imdbID);
  }

  // ปุ่มค้นหา กลับไปที่หน้า Home โดยส่ง Full Name ของหนังเรื่องนั้นไป (จะแสดงเพียวเรื่องเดียว)
  function btn_Search_Movies_By_Full_Name(movieFullNameSearch : unknown) {
    navigate("/?movieFullNameSearch=" + movieFullNameSearch);
  }
  
  return (
    <>
      <div className="NavbarBody">
        <Box sx={{ flexGrow: 3, backgroundColor: "black" }}>
          <AppBar position="static">
            <Toolbar className="toolbar">
              {/* ============================================ ปุ่มกลับไปหน้า home */}
              <button
                type="button"
                className="imdb_button"
                onClick={navigateToHomePage}
              >
                IMDb
              </button>

              {/* ============================================ เลือกรูปแบบการค้นหา */}
              <Select
                size="small"
                className="select"
                value={selectSearch} // ค่าที่ได้จาก select จะอยู่ในตัวแปลนี้
                onChange={(event) => {
                  setSelectSearch(event.target.value);
                  console.log(event.target.value);
                }}
              >
                <MenuItem value={"Movie Name"}>Movie Name</MenuItem> 
                <MenuItem value={"Movie ID"}>Movie ID</MenuItem>
                <MenuItem value={"Movie Full Name"}>Movie Full Name</MenuItem>
              </Select>

              {/* ============================================ ที่ใส่ข้อมูล */}
              <TextField
                className="text_field"
                placeholder={"Search " + selectSearch}
                size="small"
                inputRef={name_id_movie_search} // เมื่อใส่ข้อมูลจะเก็บว่าไว้ในตัวแปลนี้
                onChange={() => console.log(name_id_movie_search.current?.value.trim())}
              />

              {/* ============================================ ปุ่มค้นหา */}
              <button
                type="button"
                className="search_button"
                onClick={() => {
                  // ถ้าใน TextField มีข้อมูล ใช้ trim() เพื่อลบเว้นวรรคที่อาจอยู่ทั้งหน้าและท้ายของข้อความ เพื่อป้องกันการพิมพ์เว้นวรรครัวๆ
                  if (name_id_movie_search.current?.value.trim() != '') {
                    // ถ้าเลือกที่จะค้นหาด้วยชื่อของหนัง (ออกมาหลายเรื่อง)
                    if (selectSearch === 'Movie Name') {
                      btn_Search_Movies_By_Name(name_id_movie_search.current?.value.trim())
                    }
                    // ถ้าเลือกที่จะค้นหาด้วย imdbID ของหนัง
                    else if (selectSearch === 'Movie ID') {
                      btn_Search_Movies_By_imdbID(name_id_movie_search.current?.value.trim())
                    }
                    // ค้นหาด้วยชื่อเรื่องเต็ม (ออกมาเรื่องเดียว)
                    else if (selectSearch === "Movie Full Name") {
                      btn_Search_Movies_By_Full_Name(name_id_movie_search.current?.value.trim())
                    }

                  }
                }}
              >
                <SearchIcon />
              </button>
            </Toolbar>
          </AppBar>
        </Box>
      </div>

      {/* Outlet คือพื้นที่แสดงผลของ path ต่างๆ ที่อยู่ใน children ของ path หลักนั้นๆ */}
      <Outlet />
    </>
  );
}
