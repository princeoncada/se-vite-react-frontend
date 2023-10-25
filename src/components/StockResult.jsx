import {Button, styled} from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import header_config from "../service/HeaderConfig.js";
import "../styles/StockResult.css";

const DesktopCustomButton = styled(Button)({
    marginLeft: "1rem",
    maxWidth: "45px",
    minWidth: "45px",
});

const MobileCustomButton = styled(Button)({
    marginLeft: "1rem",
    maxWidth: "45px",
    minWidth: "45px"
});

function StockResult(x) {
    const watchlist = x.watchlist === undefined ? false : x.watchlist;
    function handleRemoveStock(ticker) {
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/stock/${ticker}`, header_config)
            .then(() => {
                x.loadStockData()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <div className="container">
                <h2>{x.header}</h2>
                <div className="search-results">
                    {x.stockData.map((result) => (
                        <div key={result.id} className="result-container">
                            <div onClick={() => {
                                window.location.href = `/stock/view/${result["ticker"]}`
                            }} className="result-item">
                                <div className="result-left">
                                    <span>{`${result["ticker"]}`}</span>
                                    <div className="line">
                                        <span>{`${result.name}`}</span>
                                    </div>
                                </div>
                                <div className="result-middle">
                                    <div className="score">
                                        <div className={`score-value score-${result.value}`}>{result.value}</div>
                                        <div className="score-label">Value</div>
                                    </div>
                                    <div className="score">
                                        <div className={`score-div score-${result.dividend}`}>{result.dividend}</div>
                                        <div className="score-label">Dividend</div>
                                    </div>
                                    <div className="score">
                                        <div className={`score-growth score-${result.growth}`}>{result.growth}</div>
                                        <div className="score-label">Growth</div>
                                    </div>
                                </div>
                                <div className="result-right">
                                    <p>${result.price}</p>
                                </div>
                            </div>
                            {
                                watchlist && <div className="btn-container desktop">
                                    <DesktopCustomButton
                                        variant="contained"
                                        color="error"
                                        onClick={() => { handleRemoveStock(result["ticker"]) }}
                                        sx={{ height: "74%", margin: "12px 0 0 12px" }}
                                    >
                                        <VisibilityOffIcon />
                                    </DesktopCustomButton>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default StockResult;