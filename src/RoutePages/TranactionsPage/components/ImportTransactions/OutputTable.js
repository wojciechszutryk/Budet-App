import React from "react";

const OutputTable = (props) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                <tr>
                    {props.cols.map(c => (
                        <th key={c.key}>{c.name}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {props.data.map((r, i) => (
                    <tr key={i}>
                        {props.cols.map(c => (
                            <td key={c.key}>{r[c.key]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OutputTable;