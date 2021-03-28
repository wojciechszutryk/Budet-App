import React from 'react'
import XLSX from 'xlsx';
import {Button} from "components";
import {saveAs} from 'file-saver';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {setDate} from "utilities/functions";
import {toast} from "react-toastify";
import i18next from "i18next";

function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
const wb = XLSX.utils.book_new();
wb.Props = {
    Title: "Transactions"+(new Date().toJSON().slice(0,10)),
    Subject: "Transactions",
    CreatedDate: new Date().toJSON().slice(0,10)
};
wb.SheetNames.push("Transactions");

const ExportTransactions = ({transactions, name, allCategories}) => {
    const {t} = useTranslation();

    const listFromTransaction = transactions.map(transaction => {
            const category = (allCategories.find(category => category.id === transaction.categoryId) || {}).name || t('Other');
            return (
                [transaction.description,transaction.amount,setDate(transaction.date),category]
            );
        });
    listFromTransaction.unshift([t('description') , t('amount'), t('date'), t('category')]);

    wb.Sheets["Transactions"] = XLSX.utils.aoa_to_sheet(listFromTransaction);
    const wbOut = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
    const handleExport = function(){
        saveAs(new Blob([s2ab(wbOut)],{type:"application/octet-stream"}), `${name}:${(new Date().toJSON().slice(0,10))}.xlsx`);
        toast.info(i18next.t('Succeeded in exporting file to .xlsx'), {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            button: false,
            progress: undefined,
        });
    };
    return(
        <Button buttonType='addBudget' onClick={handleExport}>{t('Export transactions to xlsx')}</Button>
    )
};

const ConnectedExportTransactions = connect(state => ({allCategories: state.common.categories,}))(ExportTransactions);

export default ConnectedExportTransactions;
