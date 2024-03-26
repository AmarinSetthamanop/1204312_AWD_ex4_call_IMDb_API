
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../../components/navbar/Navbar";
import EndScript from "../../components/end script/EndScript";
import './errorpage.css'

// หน้า Error แสดงแค่การโหลด
export default function ErrorPage() {
    return (

        <div>

            <Navbar />

            <div className="error_page_body">
                <CircularProgress color="warning" />
            </div>

            <EndScript />
            
        </div>
    );
}