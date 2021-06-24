import React, {useEffect, useRef, useState} from 'react';
import SadMac from "components/SadMac";
import {BottomMessage, ButtonsStyle, Grid, StyledHeader, StyledInfo} from "./RegisterPageStyles";
import {useTranslation} from "react-i18next";
import {FormField, FormGroup, Label, Message} from "../../components/Input/InputStyles";
import {Button} from "../../components";
import {useMutation} from "react-query";
import API from "../../data/fetch";
import Aos from "aos";
import {Link} from "react-router-dom";
import {setOtherCategoryId} from "../../data/actions/budgetActions";
import {connect} from "react-redux";

const RegisterPage = ({setOtherCategoryId}) => {
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
    const [TooShortUserNameError, setTooShortUserNameError] = useState(true);
    const [TooLongUserNameError, setTooLongUserNameError] = useState(true);
    const [TooShortPasswordError, setTooShortPasswordError] = useState(true);
    const [response, setResponse] = useState('');
    const addBudgetCategoryMutation = useMutation(API.budget.addBudgetCategory);
    const addBudgetMutation = useMutation(API.budget.addBudget);
    const addParentCategoryMutation = useMutation(API.common.addParentCategory);
    const addChildrenCategoryMutation = useMutation(API.common.addCategory);
    const addTransactionMutation = useMutation(API.budget.addTransition)

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
        if (event.target.value.length > 12) setTooLongUserNameError(true)
        else setTooLongUserNameError(false);
        if (event.target.value.length < 4) setTooShortUserNameError(true)
        else setTooShortUserNameError(false);
        setUserName(event.target.value);
    }
    const handlePasswordChange = (event) => {
        if (event.target.value) setEmptyPasswordError(false)
        setPassword(event.target.value);
        passwordRef.current = event.target.value;
        if (passwordRef.current === repeatPasswordRef.current) setPasswordDontMatchError(false)
        else setPasswordDontMatchError(true)
        if (passwordRef.current < 4) setTooShortPasswordError(true)
        else setTooShortPasswordError(false);
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
        if (password.length < 7) setTooShortPasswordError(true);
        if (userName.length < 4) setTooShortUserNameError( true);
        if (userName.length > 12) setTooLongUserNameError( true);
        const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!re.test(email)) setInvalidEmailError(true)
        else setInvalidEmailError(false)

        return !EmptyEmailError && !EmptyPasswordError && !EmptyRepeatPasswordError && !PasswordDontMatchError && !EmptyFileError;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let currentFile = selectedFiles[0];
        validate();
        if (!EmptyEmailError && !EmptyPasswordError && !EmptyRepeatPasswordError && !PasswordDontMatchError && !EmptyFileError && !InvalidEmailError && !TooShortUserNameError && !TooShortPasswordError && !TooLongUserNameError){
            let formData = new FormData();
            formData.append("file", currentFile);
            formData.append("userName", userName);
            formData.append("password", password);
            formData.append("email", email);

            const res = await signupUserMutation.mutateAsync(formData);
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
                const budgetRes = await addBudgetMutation.mutateAsync({
                    name: 'Example Budget',
                    totalAmount: 1000,
                    userId: res.id
                })
                const parentRes = await addParentCategoryMutation.mutateAsync({
                    name: 'Prent category',
                    userId: res.id,
                })
                const otherParentRes = await addParentCategoryMutation.mutateAsync({
                    name: 'Other',
                    userId: res.id,
                })
                await addParentCategoryMutation.mutateAsync({
                    name: 'Prent category No.2',
                    userId: res.id,
                })
                const otherChildRes = await addChildrenCategoryMutation.mutateAsync({
                    name: 'Other',
                    userId: res.id,
                    parentCategory: otherParentRes.createdParentCategory.id
                })
                const childRes1 = await addChildrenCategoryMutation.mutateAsync({
                    name: 'Child category No.1',
                    userId: res.id,
                    parentCategory: parentRes.createdParentCategory.id
                })
                const childRes2 = await addChildrenCategoryMutation.mutateAsync({
                    name: 'Child category No.2',
                    userId: res.id,
                    parentCategory: parentRes.createdParentCategory.id
                })
                await addChildrenCategoryMutation.mutateAsync({
                    name: 'Child category No.3',
                    totalAmount: 300,
                    userId: res.id,
                    parentCategory: parentRes.createdParentCategory.id
                })
                await addBudgetCategoryMutation.mutateAsync({
                    budget: 0,
                    budgetId: budgetRes.createdBudget.id,
                    categoryId: otherChildRes.createdCategory.id,
                })
                await addBudgetCategoryMutation.mutateAsync({
                    budget: 330,
                    budgetId: budgetRes.createdBudget.id,
                    categoryId: childRes1.createdCategory.id,
                })
                await addBudgetCategoryMutation.mutateAsync({
                    budget: 520,
                    budgetId: budgetRes.createdBudget.id,
                    categoryId: childRes2.createdCategory.id
                })
                await addTransactionMutation.mutateAsync({data:{
                    budgetId: budgetRes.createdBudget.id,
                    categoryId: childRes1.createdCategory.id,
                    amount: 100,
                    date: new Date().toISOString(),
                    description: 'Example Transaction No.1',
                    userId: res.id,
                }})
                await addTransactionMutation.mutateAsync({data:{
                    budgetId: budgetRes.createdBudget.id,
                    categoryId: childRes1.createdCategory.id,
                    amount: 120,
                    date: new Date().toISOString(),
                    description: 'Example Transaction No.2',
                    userId: res.id,
                }})
                await addTransactionMutation.mutateAsync({data:{
                    budgetId: budgetRes.createdBudget.id,
                    categoryId: childRes2.createdCategory.id,
                    amount: 200,
                    date: new Date().toISOString(),
                    description: 'Example Transaction No.3',
                    userId: res.id,
                }})
                await addTransactionMutation.mutateAsync({data:{
                    budgetId: budgetRes.createdBudget.id,
                    categoryId: childRes2.createdCategory.id,
                    amount: 30,
                    date: new Date().toISOString(),
                    description: 'Example Transaction No.4',
                    userId: res.id,
                }})
                setResponse('success');
            }
            else{
                setResponse(res.message);
            }
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
                                {PasswordDontMatchError ? <BottomMessage>{t("Password don't match")}</BottomMessage> : null}
                                {InvalidEmailError ? <BottomMessage>{t("Invalid Email")}</BottomMessage> : null}
                                {TooShortUserNameError ? <BottomMessage>{t("Too short name")}</BottomMessage> : null}
                                {TooShortPasswordError ? <BottomMessage>{t("Too short password")}</BottomMessage> : null}
                                {TooLongUserNameError ? <BottomMessage>{t("Too long name")}</BottomMessage> : null}
                                <ButtonsStyle>
                                    <Button
                                        disabled={PasswordDontMatchError || EmptyEmailError || EmptyPasswordError || EmptyRepeatPasswordError || TooShortUserNameError || TooShortPasswordError || TooLongUserNameError}
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

const mapDispatchToProps = {
    setOtherCategoryId,
};

export default connect(null, mapDispatchToProps)(RegisterPage);
