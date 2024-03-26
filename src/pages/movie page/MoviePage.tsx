import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { ServiceAPI } from "../../service/ServiceAPI";
import { MoviesModel } from "../../service/model/Movies_model";
import CircularProgress from "@mui/material/CircularProgress";
import "./moviepage.css";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Button } from "@mui/material";
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function MoviePage() {
  // สร้าง Object ของ class เพื่อเรียกใช้ sevice
  const serviceApi = new ServiceAPI();

  // สร้าง object เพื่อใช้สำหรับเปลี่ยนหน้า โดยสามารถส่งตัวแปลไปหน้านั้นๆ ได้
  const navigate = useNavigate();

  // ใช้สำหรับดึงตัวแปลที่อยู่ใน path แต่จะเป็น array
  const [searchParams] = useSearchParams();

  // ข้อมูลของหนัง ที่ค้นหาด้วย imdbID
  const [movie, setMovie] = useState<MoviesModel>();

  // ดึง parameter ที่ชื่อว่า imdbID ที่อยู่ใน path มาเป็บไว้ในตัวแปล movieImdbID
  const movieImdbID = searchParams.get("imdbID");

  // ดึง parameter ที่ชื่อว่า movieNameSearch ที่อยู่ใน path มาเป็บไว้ในตัวแปล movieNameSearch (ชื่อหนังที่เคยค้นหา)
  const movieNameSearch = searchParams.get("movieNameSearch");
  
  // หน้า ของหนังเรื่องนั้นๆ ที่เคยเปิดดูมาก่อน (ที่ได้จาก path มาจาก HomePage.tsx)
  const numOfPageNow_part = searchParams.get("numOfPageNow_part");

  // imdb ของหนังที่เคนค้นหา
  const imdbIDSearch = searchParams.get('imdbIDSearch');

  // ดึงตัวแปล movieFullNameSearch ที่ส่งมาจากหน้า Home เพื่อค้นหาหนังเรื่องนั้นๆ (ได้เรื่องเดียว)
  const movieFullNameSearch = searchParams.get("movieFullNameSearch");

//===========================================================================================
  // กลับไปหน้า Home
  function navigateToHome() {
    // ถ้าเคยมีการค้นหาด้วยชื่อเรื่องมาก่อน
    if (movieNameSearch) {
      // ส่ง เชื่อเรื่องที่เคยค้นหา, หน้าของหนังเรื่องนั้นๆที่เคยเปิดดูก่อนหน้านี้
      navigate('/?movieNameSearch=' + movieNameSearch +
      '&numOfPageNow_part=' + numOfPageNow_part);
    }
    // ถ้าเคยมีการค้นหาด้วย imdbID ของหนังมาก่อน
    else if (imdbIDSearch) {
      navigate('/?imdbIDSearch=' + imdbIDSearch);
    }
    // ถ้าเคยค้นหาด้วยชื่อเต็มของเรื่องนั้นๆ
    else if (movieFullNameSearch) {
      navigate('/?movieFullNameSearch=' + movieFullNameSearch);
    }
    // ถ้าไม่เคยค้นหาด้วยอะไรเลย
    else {
      navigate('/');
    }
  }

//===========================================================================================
  // useEffect ทำงานก่อนเสมอเมื่อมีการโหลดหน้านี้
  useEffect(() => {
    // Asynchronous function สำหรับเรียก api
    const fetchData = async () => {
      try {
        // เรียก api
        const moviesData = await serviceApi.get_Movie_by_id(movieImdbID);
        setMovie(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    // เรียกใช้ function fetchData()
    fetchData();
  }, [movie, movieImdbID, serviceApi]); // ใช้ movieImdbID เป็น dependency ของ useEffect

//======================================================================================================
  return (
    <>
      {movie ? (
        // ถ้า movie มีข้อมูลมาแล้ว จะแสดงผล
        <div className="movie_body_out">
          <div className="movie_body_in">

            <Button color="warning" onClick={navigateToHome}>{"< Back"}</Button>

            <div className="movie_name">
              <h1>{movie?.Title}</h1>
              <div className="movie_name_rating">
                <div className="movie_name_rating_star">
                  <StarIcon color="warning" />
                  <p>{movie?.Ratings[0]?.Value}</p>
                </div>
                <button className="movie_name_rating_button">
                  <StarBorderIcon />Rate
                </button>
                <div className="movie_name_rating_treading">
                  <TrendingUpIcon color="success" />
                  <p>{movie?.Metascore}</p>
                </div>
              </div>
            </div>

            <div className="time">
              <p>{movie?.Released}</p>
              <p>{movie?.Runtime}</p>
            </div>

            <div className="moviepage_content">
              <img width={'25%'} height={'100%'} src={movie?.Poster} alt={movie?.Title} />
              <iframe width={'60%'} src="https://www.youtube.com/embed/vG5xyd5wufY?si=SOqkY85MxuByDnZb"></iframe>
              <div className="moviepage_content_button">
                <Button sx={{ backgroundColor: 'rgb(78, 78, 78)' }} color="inherit" className="moviepage_content_button_videos_photos">
                  <VideoLibraryIcon />
                  videos
                </Button>
                <Button sx={{ backgroundColor: 'rgb(78, 78, 78)' }} color="inherit" className="moviepage_content_button_videos_photos">
                  <PhotoLibraryIcon />
                  photos
                </Button>
              </div>
            </div>

            <div className="movie_end_content">

              <div className="movie_end_content_1">
                <div>
                  {/* ทำการ split ข้อความเมื่อเห็น , และ ช่องว่าง */}
                  {movie.Genre.split(', ').map((item) => (
                    <Link className="movie_end_content_1_buttom"
                          to={'https://www.imdb.com/search/title/?genres=' + item}>
                      {item}
                    </Link>
                  ))}
                </div>
                <p className="movie_end_content_1_plot">{movie?.Plot}</p>
              </div>
              
              <div className="movie_end_content_2">
                <div className="movie_end_content_2_buttons">
                    <button className="movie_end_content_2_button_add">
                      <AddIcon />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p style={{ margin: '0px 0px 0px 0px', justifyContent: 'start' }}>Add to Watchlist</p>
                        <p style={{ margin: '0px 0px 0px 0px', justifyContent: 'start', fontSize: '12px' }}>Added by 885K users</p>
                      </div>
                    </button>
                    <button className="movie_end_content_2_button_select">
                      <ChevronRightIcon style={{ transform: 'rotate(90deg)' }}/>
                    </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      ) : (
        // ถ้าข้อมูลยังไม่มา จะแสดงการโหลด
        <div className="movie_loading">
          <CircularProgress color="warning" />
        </div>
      )}

      {/* Outlet คือพื้นที่แสดงผลของ path ต่างๆ ที่อยู่ใน children ของ path หลักนั้นๆ */}
      <Outlet />
    </>
  );
}
