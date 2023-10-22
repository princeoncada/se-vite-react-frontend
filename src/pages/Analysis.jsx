import '../styles/Analysis.css'
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import AnalysisView from "../components/AnalysisView.jsx";
import header_config from "../service/HeaderConfig.js";

function Analysis() {
    const { ticker } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [stockData, setStockData] = useState(null);

    useEffect(() => {
        if(!isLoading) {
            setIsLoading(true)
            console.log("Requesting Data...")
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/stock/${ticker}`, header_config)
                .then((response) => {
                    const jsonObject = JSON.parse(response.data["stockData"]);
                    setStockData(jsonObject)
                    setIsLoading(false);
                    console.log("Data Retrieved!")
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log("API:", error);
                    // window.location.href = "/logout"
                })
        }
    }, []);

    return (
        <>
            <Header />
            <main>
                { (!isLoading && stockData !== null) ? <AnalysisView stockData={stockData}/> : <div className="loading">Loading...</div> }
            </main>
            <Footer />
        </>
    );
}

export default Analysis;