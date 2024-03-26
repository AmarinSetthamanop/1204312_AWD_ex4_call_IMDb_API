import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import "./homepage.css";
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MoviesModel } from "../../service/model/Movies_model";
import { ServiceAPI } from "../../service/ServiceAPI";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CircularProgress from "@mui/material/CircularProgress";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function HomePage() {

  // สร้าง Object ของ class เพื่อเรียกใช้ sevice
  const serviceApi = new ServiceAPI();

  // Array ของหนัง 100 เรื่อง
  const [movies, setMovies] = useState<MoviesModel[]>([]);

  // ใช้สำหรับดึงตัวแปลที่อยู่ใน path แต่จะเป็น array
  const [searchParams] = useSearchParams();
  // ดึง parameter ที่ชื่อว่า movieName ที่อยู่ใน path มาเป็บไว้ในตัวแปล movieName (ชื่อหนังที่ค้นหา)
  const movieNameSearch = searchParams.get("movieNameSearch");
  // ดึงตัวแปล movieFullNameSearch ที่ส่งมาจากหน้า Navbar เพื่อค้นหาหนังเรื่องนั้นๆ (ได้เรื่องเดียว)
  const movieFullNameSearch = searchParams.get("movieFullNameSearch");
  // ดึง parameter ที่ชื่อว่า imdbID ที่อยู่ใน path มาเป็บไว้ในตัวแปล imdbID (imdbID ของหนังที่ค้นหา)
  const imdbIDSearch = searchParams.get("imdbIDSearch");
  // หน้า ของหนังเรื่องนั้นๆ ที่เคยเปิดดูมาก่อน (ที่ได้จาก path มาจาก MoviePage.tsx)
  const numOfPageNow_part = searchParams.get("numOfPageNow_part");

  // สร้าง object เพื่อใช้สำหรับเปลี่ยนหน้า โดยสามารถส่งตัวแปลไปหน้านั้นๆ ได้
  const navigate = useNavigate();

  function navigateToMovie(imdbID : unknown) {
    // ถ้าค้นหาด้วยชื่อเรื่อง (โดยแสดงหลายเรื่อง)
    if (movieNameSearch) {
      // ส่ง imdbID ของหนังเรื่องนั้นๆ, เชื่อเรื่องที่กำลังค้นหา, หน้าของหนังเรื่องนั้นๆที่เคยเปิดดูก่อนหน้านี้, imdb ของหนังที่เคยค้นหา
      navigate('/movie/?imdbID=' + imdbID +
      '&movieNameSearch=' + movieNameSearch +
      '&numOfPageNow_part=' + numOfPageNow_state);
    }
    // ถ้าค้นหาด้วย imdbID
    else if (imdbIDSearch) {
      navigate('/movie/?imdbID=' + imdbID +
      '&imdbIDSearch=' + imdbIDSearch);
    }
    // ถ้าค้นหาด้วยชื่อเรื่องเต็มของหนัง
    else if (movieFullNameSearch) {
      navigate('/movie/?imdbID=' + imdbID +
      '&movieFullNameSearch=' + movieFullNameSearch);
    }
    // ถ้าไม่เคยค้นหาด้วยอะไรเลย
    else {
      navigate('/movie/?imdbID=' + imdbID);
    }
  }

//==========================================================================================
  // เปลี่ยนหน้าต่อๆ ไป เมื่อกดปุ่ม
  // จำนวน หน้า ที่เป็นไปได้ทั้งหมดของการค้นหาด้วยชื่อเรื่องหนัง
  const [numOfPageAll, setNumOfPageAll] = useState(0);
  // หน้า ของหนังเรื่องนั้นๆ ที่กำหลังเปิดดูอยู่ ค่าเริ่มต้นคือหน้าที่ 1
  const [numOfPageNow_state, setNumOfPageNow_state] = useState(1);

//==========================================================================================
  // ค้นหาด้วยชื่อหนัง โดยกำหนดด้วยว่าจะแสดงหน้าไหน (หน้าละ 10 เรื่อง)
  async function searchMoviesByName(numPage : number) {
    setNumOfPageNow_state(numPage); // เลขหน้าของกลุ่มหนังที่กดดู
    setMovies([]); // set ข้อมูลใหม่ทุกครั้งเมื่อค้นหาด้วยชื่อ เพื่อให้ reload หน้า
    if (movieNameSearch) {
      try {
        // เรียก api
        const moviesData = await serviceApi.get_Movie_by_name(movieNameSearch, numPage);

        // สิ่งที่ส่งกลับมาจากการค้นหาด้วยชื่อ ได้แก่ Search[] และ totalResults : int
        setMovies(moviesData.Search);
        // หาร 10 เพราะแสดงหน้าละ 10 เรื่อง
        // Math.ceil จะทำการปัดเศษขึ้น เช่น 79.5 เป็น 80
        setNumOfPageAll( Math.ceil(moviesData.totalResults / 10) );
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
  }
//==========================================================================================
  // ค้นหาหลังด้วย imdbID ของหนังเรื่องนั้น
  async function searchMoviesByImdbID() {
    setMovies([]); // set ข้อมูลใหม่ทุกครั้งเมื่อค้นหาด้วยชื่อ เพื่อให้ reload หน้า
    if (imdbIDSearch) {
      try {
        // เรียก api
        const movieData = await serviceApi.get_Movie_by_id(imdbIDSearch);
        setMovies( [movieData] ); // การค้นหาด้วย imdbID จริงๆแล้วจะได้ข้อมูลแค่ตัวเดียว แต่ถ้าต้องการจะใช้ตัวแปลเดิมเก็บข้อมูล จึงต้องทำเป็น Array[]
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
  }
//============================================================================================
// ค้นหาชื่อเรื่องเพียง 1 เรื่อง ด้วยชื่อเต็ม
async function searchMoviesByFullName() {
  setMovies([]); // set ข้อมูลใหม่ทุกครั้งเมื่อค้นหาด้วยชื่อ เพื่อให้ reload หน้า
  if (movieFullNameSearch) {
    try {
      // เรียก api
      const movieData = await serviceApi.get_Movie_by_full_name(movieFullNameSearch);
      setMovies( [movieData] ) // การค้นหาหนังด้วยชื่อเรื่องเต็ม จะได้กลับมาแค่เรื่องเดียว ดังนั้นเมื่อมากำหนดให้กับ state ที่เป็น list ต้องใส่ []
    } catch (error) {
      console.error("Error fetching movies:", error); 
    }
  }
}

//===============================================================================================
  // useEffect ทำงานก่อนเสมอเมื่อมีการโหลดหน้านี้
  useEffect(() => {
    setMovies([]); // set ข้อมูลใหม่ทุกครั้งเมื่อค้นหาด้วยชื่อ เพื่อให้ reload หน้า
    setNumOfPageAll(0);
    // ถ้ามีการส่งตัวแปล movieName ทาง path URL มาที่หน้า Home นี้
    if (movieNameSearch !== null && numOfPageNow_part !== null) {
      searchMoviesByName( Number(numOfPageNow_part) );
    }
    else if (movieNameSearch !== null) {
      searchMoviesByName(1); // โดยส่งหน้าเริ่มต้นที่ 1 ไปก่อน
    }
    // ถ้ามีการส่งตัวแปล imdbID ทาง path URL มาที่หน้า Home นี้
    else if (imdbIDSearch !== null) {
      searchMoviesByImdbID();
    }
    // ค้นหาด้วย Movie Full Name (ชื่อเรื่องเต็ม จะได้เรื่องเดียว)
    else if (movieFullNameSearch !== null) {
      searchMoviesByFullName();
    }
    // ถ้าไม่เคยมีการค้นหาด้วยอะไรมาก่อนเลย ก็จะแสดงหนัง 50 เรื่องเริ่มต้น
    else {
      // Asynchronous function สำหรับเรียก api
      const fetchData = async () => {
        try {
          // เรียก api
          const moviesData = await serviceApi.get_100_Movies();
          setMovies(moviesData);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };
      // เรียกใช้ function fetchData()
      fetchData();
    }
  }, [imdbIDSearch, movieNameSearch, numOfPageNow_part, movieFullNameSearch]); // การกำหนด dependencies ให้กับ useEffect ต้องดูด้วยว่าตัวแปลนั้นๆเป็น Array หรือไม่ ถ้าเป็น Array useEffect จะทำงานหลายครั้ง และค่าข้อมูลอาจจะเพี๊ยน

  /* การกำหนด dependencies ให้กับ useEffect ถ้าเราจะใช้หน้าเดิมซ๋ำๆ อาจต้องกำหนด ตัวแปที่มีการเปลี่ยนแปลงบ่อยๆ เช่น
   เมื่อเปิดเว็บมาเริ่มแรกมันจะแสดงหน้านี้ พร้อมกับ Navbar แต่ NavBar จะอยู่ที่ไฟล์อื่น ทีนี้เมื่อมีการส่งข้อมูลจาก NavBar มาที่หน้านี้
   ซึ๊งหน้านี้ก็แสดงหน้าต่างอยู่แล้วข้อมูลที่ส่งมาจาก NavBar นั้นจะไม่มีการ update ถ้าต้องการให้ข้อมูลที่ส่งมาจาก NavBar มีการ update
   จะต้องการหนด dependencies ของตัวแปลข้อมูลที่ส่งมาจาก NavBar */

//===============================================================================================
  // สร้าง component เพื่อ return Card
  function movie_card(movie?: MoviesModel, index?: number) {
    return (
      <Card className="movie_card" key={index}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            alt={index + " " + movie?.Title}
            image={movie?.Poster}
            onClick={ () => navigateToMovie(movie?.imdbID) }
          />
          {/* Add and Bookmark Icons */}
          <div style={{ position: "absolute", top: -6, left: -10 }}>
            <BookmarkIcon
              sx={{ color: "rgba(55, 55, 55)", fontSize: 45, borderRadius: 0 }}
            />
            <AddIcon
              sx={{
                color: "white",
                fontSize: 25,
                position: "absolute",
                top: 7,
                left: 10,
              }}
            />
          </div>
        </CardActionArea>

        <div className="card_content">
          <div className="movie_rating">
            <StarIcon color="warning" />
            <p>{movie?.imdbRating + ""}</p>
            <button className="btn_card_content">
              <StarBorderIcon />
            </button>
          </div>
          <Typography>
            <button className="link_text_name_of_movie" onClick={() => navigateToMovie(movie?.imdbID)}>
              <span className="link_text_name_of_movie_in">{movie?.Title}</span>
            </button>
          </Typography>
        </div>

        <CardActions className="card_actions">
          <button className="button_watchlist">
            <AddIcon />
            <p>Watchlist</p>
          </button>
          <div className="btn_trailer">
            <button className="btn_trailer_in">
              <PlayArrowRoundedIcon />
              <p>Trailer</p>
            </button>
            <IconButton>
              <ErrorOutlineIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    );
  }

  // แสดง UI ของ card หนัง 100 เรื่อง
  return (
    <>
      <div className="HomePageBody">
        <h1 className="h1">What to Watch - IMDb</h1>

        <div className="movie_cards">
          {movies.length > 0 ? (
            // map เรียกใช้ component card ตามจำนวนของข้อมูล
            movies?.map((movie, index) => movie_card(movie, index))
          ) : (
            // ถ้าข้อมูลยังไม่มา ให้แสดง การโหลด
            <div className="home_loading">
              <CircularProgress color="warning" />
            </div>
          )}
        </div>

        {/* ปุ่มหน้าถัดๆไป */}
        <div className="search_movies_by_name_num_of_pages">
          {Array.from({ length: numOfPageAll }, (_, index) => ( // สร้าง Array ตามจำนวนของ numOfPage เช่น 0 - 79 
            <button key={index} onClick={() => searchMoviesByName(index + 1)}> {/* index คือ ตำแหน่ง ที่อยู่ใน Array ช่องนั้นๆ เช่น ช่องที่ 79 + 1 */}
              {index + 1}
            </button>
          ))}
        </div>

      </div>

      {/* Outlet คือพื้นที่แสดงผลของ path ต่างๆ ที่อยู่ใน children ของ path หลักนั้นๆ */}
      <Outlet />
    </>
  );
}
