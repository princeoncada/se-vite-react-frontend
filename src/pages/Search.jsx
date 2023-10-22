import {useEffect, useState} from 'react';
import '../styles/Search.css';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";
import StockResult from "../components/StockResult.jsx";
import header_config from "../service/HeaderConfig.js";

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/stock/top`,  header_config)
            .then((response) => {
                console.log(response.data)
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
                                onClick={() => {
                                    window.location.href = `/stock/view/${query}`
                                }}
                            >Search</button>
                        </div>
                        <h3>Recommended Stocks</h3>
                        <StockResult stockData={results} />
                    </div>
                </main>
            <Footer />
        </>
    );
}

export default Search
