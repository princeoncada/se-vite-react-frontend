import '../styles/List.css'

function List(x) {
    return (
        <div className="list-container">
            {Object.entries(x.data).map(([key, value]) => {
                return (
                    key !== 'Address' ?
                        <div className="list-item" key={key}><span className="strong">{key}</span>: {value}</div> :
                        value != null ? <div className="list-item" key={key}><span className="strong">{key}</span>: {`${value["Street"]} ${value["City"]}, ${value["State"]} ${value["Zip"]} ${value["Country"]} `}
                        </div> : <></>
                )
            })}
        </div>
    )
}

export default List