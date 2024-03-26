// To parse this data:
//
//   import { Convert } from "./file";
//
//   const moviesModel = Convert.toMoviesModel(json);

export interface MoviesModel {
    Title:        string;
    Year:         string;
    Rated:        string;
    Released:     string;
    Runtime:      string;
    Genre:        string;
    Director:     string;
    Writer:       string;
    Actors:       string;
    Plot:         string;
    Language:     string;
    Country:      string;
    Awards:       string;
    Poster:       string;
    Ratings:      Rating[];
    Metascore:    string;
    imdbRating:   string;
    imdbVotes:    string;
    imdbID:       string;
    Type:         string;
    totalSeasons: string;
    Response:     string;
}

export interface Rating {
    Source: string;
    Value:  string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toMoviesModel(json: string): MoviesModel[] {
        return JSON.parse(json);
    }

    public static moviesModelToJson(value: MoviesModel[]): string {
        return JSON.stringify(value);
    }
}
