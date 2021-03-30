import React from "react";
import {SheetJSFT} from "../utilities";
import {StyledInfo, StyledInputTransactionFile} from "../ImportTransactionsStyles";
import {useTranslation} from "react-i18next";

const InputWrapper = (props) => {
    const {t} = useTranslation();
    const handleChange = (e) =>{
        const files = e.target.files;
        if (files && files[0]) props.handleFile(files[0]);
    }
    return (
        <form className="form-inline">
            <div className="form-group">
                <StyledInfo>
                    INFO
                    <div>
                        <p>{t('Select file with available file extension.\nPreferred format .xlsx\nFile should contain columns in order')}:</p>
                        <p>{t('Description | Amount | Date | Category')}</p>
                    </div>
                </StyledInfo>
                <label htmlFor="file">{t('Import from file')}</label>
                <StyledInputTransactionFile
                    type="file"
                    className="form-control"
                    id="file"
                    accept={SheetJSFT}
                    onChange={handleChange}
                />
            </div>
        </form>
    );
}

export default InputWrapper;
