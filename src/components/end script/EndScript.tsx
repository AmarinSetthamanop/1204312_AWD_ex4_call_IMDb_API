import "./endscript.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";

export default function EndScript() {
  // MUI ไม่มี TiktokIcon api ให้ใช้ จึงต้องสร้างเอง
  const TikTokIcon = ({ color = "rgb(255,255,255)" }) => {
    return (
      <svg
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="25px"
        height="25px"
      >
        <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
      </svg>
    );
  };

  return (
    <>
      <div className="endscript_body">
        <div className="endscript_icons">
          <Link to={"https://www.tiktok.com/@imdb"} className="endscript_icon">
            <TikTokIcon />
          </Link>

          <Link to={"https://www.instagram.com/imdb/"} className="endscript_icon">
            <InstagramIcon />
          </Link>

          <Link to={"https://twitter.com/imdb"} className="endscript_icon">
            <TwitterIcon />
          </Link>

          <Link to={"https://www.youtube.com/imdb"} className="endscript_icon">
            <YouTubeIcon />
          </Link>

          <Link to={"https://www.facebook.com/imdb"} className="endscript_icon">
            <FacebookIcon />
          </Link>
        </div>

        <div className="endscript_texts_lind_1">
          <Link to={"https://apps.apple.com/us/app/imdb-movies-tv-shows/id342792525?_branch_match_id=1202594599285868458&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL86pTNJLLCjQy8nMy9YP9k6pDDRzNDGxBABVqlN1IAAAAA%3D%3D&utm_campaign=mdot+sitewide+footer+Branch+update&utm_medium=marketing&utm_source=IMDb+Mdot"}
                className="endscript_text_lind_in">
            Get the IMDb App
          </Link>

          <Link to={"https://help.imdb.com/imdb"}
                className="endscript_text_lind_in">
            Help
          </Link>

          <Link to={"https://help.imdb.com/article/imdb/general-information/imdb-site-index/GNCX7BHNSPBTFALQ#so"}
                className="endscript_text_lind_in">
            Site Index
          </Link>

          <Link to={"https://pro.imdb.com/signup/index.html?rf=cons_tf_pro&u=http%3A%2F%2Fpro.imdb.com%2F%3Fref_%3Dcons_tf_pro%26rf%3Dcons_tf_pro"}
                className="endscript_text_lind_in">
            IMDbPro
          </Link>

          <Link to={"https://www.boxofficemojo.com/"}
                className="endscript_text_lind_in">
            Box Office Mojo
          </Link>

          <Link to={"https://developer.imdb.com/"}
                className="endscript_text_lind_in">
            IMDb Developer
          </Link>
        </div>


        <div className="endscript_texts_lind_2">
          <Link to={"https://www.imdb.com/pressroom/?ref_=ft_pr"}
                className="endscript_text_lind_in">
            Press Room
          </Link>

          <Link to={"https://advertising.amazon.com/resources/ad-specs/imdb/"}
                className="endscript_text_lind_in">
            Advertising
          </Link>

          <Link to={"https://www.amazon.jobs/content/en/teams/imdb"}
                className="endscript_text_lind_in">
            Jobs
          </Link>

          <Link to={"https://www.imdb.com/conditions?ref_=ft_cou"}
                className="endscript_text_lind_in">
            Conditions of Use
          </Link>

          <Link to={"https://www.imdb.com/privacy?ref_=ft_pvc"}
                className="endscript_text_lind_in">
            Privacy Policy
          </Link>

          <Link to={"https://www.imdb.com/privacy/adpreferences/?ref_=pvc_redir"}
                className="endscript_text_lind_in">
            Your Ads Privacy Choices
          </Link>
        </div>

        <p style={{marginTop: '2.5%', fontSize: '13px',}}>© 1990-2024 by IMDb.com, Inc.</p>
      </div>
    </>
  );
}
