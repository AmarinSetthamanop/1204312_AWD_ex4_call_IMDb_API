// file service สำหรับ Get mocies จาก api ต่่างๆ

import axios from "axios";
import top_100_movies from "./movie data IDs/top_100_movies.json";
import { MoviesModel } from "./model/Movies_model";

export class ServiceAPI {
  // function สำหรับ get movies 100 เรื่อง จาก  imdb api
  async get_100_Movies() {
    // สร้าง array สำหรับเก็บหนัง 100 เรื่อง หลังจากเรียก api
    const listMovies_100: MoviesModel[] = [];
    // วนรอบข้อมูลของหนัง 100 เรื่อง (0-99)
    for (let i = 0; i < 24; i++) {
      // สร้าง json เพื่อเรียก api
      const options = {
        method: "GET",
        url: "https://www.omdbapi.com/",
        params: {
          apikey: "4602df77",
          plot: "full",
          i: "" + top_100_movies[i].tconst,
        },
      };
      // เรียก api
      try {
        const response = await axios.request(options);
        // เพิ่มข้อมูลที่ได้มาเข้าไปใน list ( .data เฉพาะข้อมูลที่ได้รับจาก API)
        listMovies_100.push(response?.data);
      } catch (error) {
        return error;
      }
    }
    // ส่งกลับ list ของหนัง 100 เรื่อง ให้กับคนที่เรียก function นี้
    return listMovies_100;
  }

  //=================================================================================
  // api get หนังด้วย imdbID ของหนังเรื่องนั้น
  async get_Movie_by_id(imdbID: unknown) {
    // สร้าง json เพื่อเรียก api
    const options = {
      method: "GET",
      url: "https://www.omdbapi.com/",
      params: {
        apikey: "4602df77",
        plot: "full",
        i: "" + imdbID, // ค้นหาด้วยหนัง imdbID
      },
    };
    // เรียก api
    try {
      const response = await axios.request(options);
      return response?.data; // จะได้มาเรื่องเดียว {...}
    } catch (error) {
      return error;
    }
  }

  //=================================================================================
  // api get หนังด้วย ชื่อ ของหนังเรื่องนั้น
  async get_Movie_by_name(movieName: unknown, numPage: unknown) {
    // สร้าง json เพื่อเรียก api
    const options = {
      method: "GET",
      url: "https://www.omdbapi.com/",
      params: {
        apikey: "4602df77",
        plot: "full",
        s: "" + movieName,
        page: "" + numPage,
      },
    };
    // เรียก api
    try {
      const response = await axios.request(options);
      return response.data; // สิ่งที่ส่งกลับมาจากการค้นหาด้วยชื่อ ได้แก่ Search[] และ totalResults : int
    } catch (error) {
      return error;
    }
  }

  //==================================================================================
  // api ค้นหาด้วยชื่อเรื่องเต็มของเรื่องนั้น (โดยส่งกลับมาแค่เรื่องเดียว)
  async get_Movie_by_full_name(movieName : unknown) {
    // สร้าง option เพื่อเรียก api
    const options = {
      method: "GET",
      url: "https://www.omdbapi.com/",
      params: {
        apikey: "4602df77",
        t: "" + movieName, // t คือ ค้นหาด้วยชื่อเรื่องเต็ม
      },
    };
    // เรียก api
    try {
      const response = await axios.request(options);
      return response.data; // จะตอบกลับมาแค่เรื่องเดียว {...}
    } catch (error) {
      return error;
    }
  }
}
