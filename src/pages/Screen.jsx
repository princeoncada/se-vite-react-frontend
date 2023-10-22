import '../styles/Screen.css'
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {useEffect, useState} from "react";
import Filter from "../components/Filter.jsx";
import axios from "axios";
import StockResult from "../components/StockResult.jsx";
import header_config from "../service/HeaderConfig.js";

const filters_config = {
    trailing_pe: {
        label: "P/E Ratio",
        state: "trailingPe",
    },
    price_sales: {
        label: "Price/Sales",
        state: "priceSales",
    },
    price_book: {
        label: "Price/Book",
        state: "priceBook",
    },
    enterprise_value_ebitda: {
        label: "Enterprise Value/EBITDA",
        state: "enterpriseValueEbitda",
    },
    return_on_equity: {
        label: "Return on Equity",
        state: "returnOnEquity",
    },
    quarterly_revenue_growth: {
        label: "Quarterly Revenue Growth",
        state: "quarterlyRevenueGrowth",
    },
    quarterly_earnings_growth: {
        label: "Quarterly Earnings Growth",
        state: "quarterlyEarningsGrowth",
    },
    total_debt_equity: {
        label: "Total Debt/Equity",
        state: "totalDebtEquity",
    },
    forward_annual_dividend_yield: {
        label: "Forward Annual Dividend Yield",
        state: "forwardAnnualDividendYield",
    },
    trailing_annual_dividend_yield: {
        label: "Trailing Annual Dividend Yield",
        state: "trailingAnnualDividendYield",
    },
    payout_ratio: {
        label: "Payout Ratio",
        state: "payoutRatio",
    },
    interest_coverage_ratio: {
        label: "Interest Coverage Ratio",
        state: "interestCoverageRatio",
    },
    operating_cash_flow_net_income_ratio: {
        label: "Operating Cash Flow/Net Income",
        state: "operatingCashFlowToNetIncome",
    },
    free_cash_flow_conversion: {
        label: "Free Cash Flow Conversion",
        state: "freeCashFlowConversion",
    },
    debt_coverage_ratio: {
        label: "Debt Coverage Ratio",
        state: "debtCoverageRatio",
    }
}
const state = {};
const checkboxStates = {};

function Screen() {
    const [isLoading, setIsLoading] = useState(true);
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        if (isLoading) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/stock/minmax`, header_config)
                .then(response => {
                    let value = response.data

                    Object.keys(filters_config).forEach(key => {
                        state[key] = {
                            label: filters_config[key].label,
                            value: value[key],
                            min: value[key][0],
                            max: value[key][1],
                        }

                        checkboxStates[key] = {
                            key:`${key}`,
                            checked: true,
                        }
                    })

                    console.log(state)
                    setIsLoading(false)
                })
                .catch(error => {
                    console.log(error)
                    setIsLoading(false)
                    window.location.href = "/logout"
                })
        }

    }, []);

    const [filter, setFilter] = useState(state);
    const [checkboxData, setCheckboxData] = useState(checkboxStates);

    function handleCheckboxChange(key) {
        setCheckboxData(prevState => {
            return {
                ...prevState,
                [key]: {
                    ...prevState[key],
                    checked: !prevState[key].checked
                }
            }
        })
    }

    function handleSliderChange(key, value) {
        setFilter(prevState => {
            return {
                ...prevState,
                [key]: {
                    ...prevState[key],
                    value: value
                }
            }
        })
    }

    function handleSubmit() {
        const resultFilter = {}
        Object.entries(checkboxData).forEach(([key, value]) => {
            if (value.checked) {
                resultFilter[filters_config[key].state] = [filter[key].value[0]-1, filter[key].value[1]+1]
            }
        })

        console.log(resultFilter)

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/stock/filter`, resultFilter,  header_config)
            .then(response => {
                setStocks(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
                window.location.href = "/logout"
            })
    }

    return (
        <>
            <Header />
                <main>
                    {
                        isLoading ? <div>Loading...</div> :
                            <div className="stock-screen">
                            <h2>Stock Screening</h2>
                            <div>
                                {
                                    Object.keys(filter).map(key => {
                                        return <Filter
                                            key={key}
                                            element={filter[key].label}
                                            value={filter[key].value}
                                            changeValue={(event, value) => handleSliderChange(key, value)}
                                            checked={!checkboxData[key].checked}
                                            changeChecked={() => handleCheckboxChange(key)}
                                            step={0.01}
                                            min={filter[key].min}
                                            max={filter[key].max}
                                        />
                                    })
                                }
                            </div>
                            <button onClick={handleSubmit}>Search</button>
                        </div>
                    }


                    { stocks.length === 0 ? null :
                        <div className="stock-screen">
                            <h2>Stocks</h2>
                            <StockResult stockData={stocks} />
                        </div>
                    }

                </main>
            <Footer />
        </>
    );
}

export default Screen;