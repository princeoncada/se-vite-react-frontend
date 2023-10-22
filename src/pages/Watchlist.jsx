import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import StockResult from "../components/StockResult.jsx";
import header_config from "../service/HeaderConfig.js";


function Watchlist() {
    const [stockData, setStockData] = useState([]);

    function loadUserStocks() {
        console.log(import.meta.env.VITE_THIS)
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/stock`, header_config)
            .then((response) => {
                setStockData(response.data)
            })
            .catch((error) => {
                console.log("API:", error);
                window.location.href = "/logout"
            })
    }

    useEffect(() => {
        loadUserStocks()
    }, []);

    return (
        <>
            <Header/>
            <main>
                <div className="stock-screen">
                    <h2>Watchlist</h2>
                    <StockResult
                        stockData={stockData}
                        watchlist={true}
                        loadStockData={loadUserStocks}
                    />
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Watchlist;