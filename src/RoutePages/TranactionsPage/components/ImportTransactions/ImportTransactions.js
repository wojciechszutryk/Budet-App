import React from "react";
import XLSX from "xlsx";
import DropFile from "./components/DropFile";
import InputWrapper from "./components/InputWrapper";
import OutputTable from "./components/OutputTable";
import {make_cols} from "./utilities";
import {useState} from "react";

const ImportTransactions = ({budgetCategories, allCategories}) => {
    const [data, setData] = useState([]);
    const [cols, setCols] = useState([]);

    const handleFile = (file) => {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = e => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            setCols(make_cols(ws["!ref"]));
            setData(data)
        };
        if (rABS) reader.readAsBinaryString(file);
        else reader.readAsArrayBuffer(file);
    }

    return (
        <DropFile handleFile={handleFile}>
            <div className="row">
                <div className="col-xs-12">
                    <InputWrapper handleFile={handleFile} />
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <OutputTable budgetCategories={budgetCategories} allCategories={allCategories} data={data} cols={cols}/>
                </div>
            </div>
        </DropFile>
    );
};

export default ImportTransactions;