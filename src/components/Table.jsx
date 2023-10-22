import '../styles/Table.css'

function Table(x) {
    return (
        <div className="table">
            <table>
                {Object.entries(x.data).map(([key, value]) => {
                    if(key === 'Breakdown') {
                        return (
                            <thead key={key}>
                            <tr>
                                <th>{key}</th>
                                {value.map((value, index) => {
                                    return (
                                        <th key={index}>{value}</th>
                                    )
                                })}
                            </tr>
                            </thead>
                        )
                    } else {
                        return (
                            <tbody key={key}>
                            <tr>
                                <th>{key}</th>
                                {value.map((value, index) => {
                                    return (
                                        <td key={index}>{value}</td>
                                    )
                                })}
                            </tr>
                            </tbody>
                        )
                    }
                })}
            </table>
        </div>
    );
}

export default Table