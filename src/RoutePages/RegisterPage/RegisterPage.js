import React, {useEffect, useRef, useState} from 'react';
import SadMac from "components/SadMac";
import {ButtonsStyle, Grid, StyledHeader, StyledInfo} from "./RegisterPageStyles";
import {useTranslation} from "react-i18next";
import {FormField, FormGroup, Label, Message} from "../../components/Input/InputStyles";
import {Button} from "../../components";
import {useMutation} from "react-query";
import API from "../../data/fetch";
import Aos from "aos";
import {Link} from "react-router-dom";
import {UserButtons} from "../HomePage/HomePageStyles";

const RegisterPage = () => {
    const {t} = useTranslation();
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const passwordRef = useRef(password);
    const repeatPasswordRef = useRef(repeatPassword);
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [EmptyEmailError, setEmptyEmailError] = useState(true);
    const [EmptyUserNameError, setEmptyUserNameError] = useState(true);
    const [EmptyPasswordError, setEmptyPasswordError] = useState(true);
    const [EmptyRepeatPasswordError, setEmptyRepeatPasswordError] = useState(true);
    const [EmptyFileError, setEmptyFileError] = useState(true);
    const [PasswordDontMatchError, setPasswordDontMatchError] = useState(false);
    const [InvalidEmailError, setInvalidEmailError] = useState(false);
    const [response, setResponse] = useState('');

    useEffect(() => {
        Aos.init();
    },[]);

    const signupUserMutation = useMutation(API.common.userSignUp);

    const handleEmailChange = (event) => {
        if (event.target.value) setEmptyEmailError(false)
        setEmail(event.target.value);
    }
    const handleUserNameChange = (event) => {
        if (event.target.value) setEmptyUserNameError(false)
        setUserName(event.target.value);
    }
    const handlePasswordChange = (event) => {
        if (event.target.value) setEmptyPasswordError(false)
        setPassword(event.target.value);
        passwordRef.current = event.target.value;
        if (passwordRef.current === repeatPasswordRef.current) setPasswordDontMatchError(false)
        else setPasswordDontMatchError(true)
    }
    const handleRepeatPasswordChange = (event) => {
        if (event.target.value) setEmptyRepeatPasswordError(false)
        setRepeatPassword(event.target.value);
        repeatPasswordRef.current = event.target.value;
        if (passwordRef.current === repeatPasswordRef.current) setPasswordDontMatchError(false)
        else setPasswordDontMatchError(true)
    }
    const handleSelectFile = (event) => {
        setSelectedFiles(event.target.files);
        setEmptyFileError(false);
    }

    const resetForm = () => {
        document.getElementById("budgetForm").reset();
        setEmail('');
        setPassword('');
        setRepeatPassword('');
    }

    const validate = () => {
        if (email==='') setEmptyEmailError(true);
        if (password==='') setEmptyPasswordError(true);
        const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!re.test(email)) setInvalidEmailError(true)
        else setInvalidEmailError(false)

        return !EmptyEmailError && !EmptyPasswordError && !EmptyRepeatPasswordError && !PasswordDontMatchError && !EmptyFileError;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let currentFile = selectedFiles[0];
        validate();
        if (!EmptyEmailError && !EmptyPasswordError && !EmptyRepeatPasswordError && !PasswordDontMatchError && !EmptyFileError && !InvalidEmailError){
            let formData = new FormData();
            formData.append("userImage", currentFile);
            formData.append("userName", userName);
            formData.append("password", password);
            formData.append("email", email);

            const res = await signupUserMutation.mutateAsync(formData);
            await console.log(res)
            if (res.id){
                setEmail('')
                setUserName('')
                setPassword('')
                setRepeatPassword('')
                setSelectedFiles(undefined)
                setEmptyEmailError(true)
                setEmptyUserNameError(true)
                setEmptyRepeatPasswordError(true)
                setEmptyPasswordError(true)
                setInvalidEmailError(true)
                setResponse('success');
            }
            else{
                setResponse(res.message);
            }

            // UploadService.upload(currentFile,email,password)
            //     .then(response => response.json())
            //     .then(data => console.log(data))
            //     .catch((err) => console.error(err));
        }
    }

    let responseMessage = ''
    if (response === 'success') responseMessage = (
        <>
            <StyledInfo>
                {t("You have registered successfully")}
            </StyledInfo>
            <Link  to='/login'>
                <Button
                    buttonType='submit'
                >{t('Login')}</Button>
            </Link>
        </>
    )
    else responseMessage = t(response);

    return (
        <Grid>
            <section data-aos="fade-right">
                <SadMac sad={false}/>
            </section>
            <section>
                {response ? responseMessage :
                    <>
                        <StyledHeader>{t('Register')}</StyledHeader>
                        <form id="budgetForm" onSubmit={handleSubmit}>
                            <FormGroup>
                                <FormField
                                    type="text"
                                    placeholder="Email"
                                    onChange={handleEmailChange}
                                />
                                <Label>{t('email')}</Label>
                                {EmptyEmailError ? <Message>{t('Required')}</Message> : null}
                            </FormGroup>

                            <FormGroup>
                                <FormField
                                    type="text"
                                    placeholder={t("user name")}
                                    onChange={handleUserNameChange}
                                />
                                <Label>{t('user name')}</Label>
                                {EmptyUserNameError ? <Message>{t('Required')}</Message> : null}
                            </FormGroup>

                            <FormGroup>
                                <FormField
                                    type="password"
                                    placeholder={t("password")}
                                    onChange={handlePasswordChange}
                                />
                                <Label>{t('password')}</Label>
                                {EmptyPasswordError ? <Message>{t('Required')}</Message> : null}
                            </FormGroup>

                            <FormGroup>
                                <FormField
                                    type="password"
                                    placeholder={t("repeat password")}
                                    onChange={handleRepeatPasswordChange}
                                />
                                <Label>{t("repeat password")}</Label>
                                {EmptyRepeatPasswordError ? <Message>{t('Required')}</Message> : null}
                            </FormGroup>

                            <FormGroup style={{color: 'gray'}}>
                                <label className="btn btn-default" htmlFor="photo" style={{color: 'gray'}}>
                                    {t('Upload user photo')}
                                </label>
                                <input name="photo" type="file" accept="image/png, image/jpeg"
                                       onChange={handleSelectFile}/>
                                {EmptyFileError ? <Message>{t('Required')}</Message> : null}
                            </FormGroup>

                            <FormGroup>
                                {PasswordDontMatchError ? <Message>{t("Password don't match")}</Message> : null}
                                {InvalidEmailError ? <Message>{t("Invalid Email")}</Message> : null}
                                <ButtonsStyle>
                                    <Button
                                        disabled={PasswordDontMatchError || EmptyEmailError || EmptyPasswordError || EmptyRepeatPasswordError}
                                        buttonType='submit'
                                        type='submit'
                                    >{t('Register')}</Button>
                                    <Button
                                        buttonType="reset"
                                        type="button"
                                        onClick={resetForm}
                                    >
                                        Reset
                                    </Button>
                                </ButtonsStyle>
                            </FormGroup>
                        </form>
                    </>
                }
            </section>
        </Grid>
    );
};

export default RegisterPage;
