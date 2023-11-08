import {useEffect, useState} from 'react';
import '../styles/Search.css';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";
import StockResult from "../components/StockResult.jsx";
import header_config from "../service/HeaderConfig.js";
import {Chip, LinearProgress} from "@mui/material";

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [validating, setValidating] = useState(false);
    const [stockInvalid, setStockInvalid] = useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/stock/top`,  header_config)
            .then((response) => {
                setResults(response.data)
            })
            .catch((error) => {
                console.log("API:", error);
                window.location.href = "/logout"
            })
    }, [])

    function handleChange(e){
        const value = e.target.value;
        const sanitizedValue = value.replace(/[^A-Z]/g, "");
        setQuery(sanitizedValue);
    }

    function validateStock() {
        setValidating(true);
    }

    useEffect(() => {
        if (validating === true) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/stock/validate/${query}`,  header_config)
                .then((response) => {
                    if(response.data === true){
                        window.location.href = `/stock/view/${query}`
                    } else {
                        setStockInvalid(true);
                    }
                    setValidating(false);
                })
                .catch((error) => {
                    console.log("API:", error);
                })
        }
    }, [validating])



    return (
        <>
            <Header />
                <main>
                    <div className="stock-search">
                        <h2>Stock Search</h2>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Enter a stock ticker symbol..."
                                value={query}
                                onChange={(e) => handleChange(e)}
                            />
                            <button
                                onClick={validateStock}
                            >Search</button>
                        </div>
                        {validating && <LinearProgress color="inherit" />}
                        {(stockInvalid && !validating ) && <Chip color="error" label="Invalid Stock Symbol" />}
                    </div>
                    <StockResult
                        header="Top Stocks"
                        stockData={results}
                    />
                </main>
            <Footer />
        </>
    );
}

export default Search
