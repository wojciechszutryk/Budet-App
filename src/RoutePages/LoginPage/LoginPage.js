import React, {useEffect, useState} from 'react';
import SadMac from "components/SadMac";
import {ButtonsStyle, Grid} from "./LoginPageStyles";
import {useTranslation} from "react-i18next";
import {FormField, FormGroup, Label, Message} from "../../components/Input/InputStyles";
import {Button} from "../../components";
import {useMutation} from "react-query";
import API from "../../data/fetch";
import Aos from "aos";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {
    activeBudgetSet,
    appTokenSet,
    loggedUserIdSet,
    loggedUserImageSet,
    loggedUserNameSet
} from "../../data/actions/commonActions";
import {UserInformation, StyledHeader} from "../HomePage/HomePageStyles";
import {fetchAllBudgetsFromAPI, fetchChildrenCategoriesFromAPI} from "../../data/fetch/commonFetch";
import {setOtherCategoryId} from "../../data/actions/budgetActions";

const LoginPage = ({appTokenSet, loggedUserNameSet, loggedUserIdSet, loggedUserImageSet, activeBudgetSet, setOtherCategoryId}) => {
    const {t} = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [EmptyEmailError, setEmptyEmailError] = useState(true);
    const [EmptyPasswordError, setEmptyPasswordError] = useState(true);
    const [InvalidEmailError, setInvalidEmailError] = useState(false);
    const [response, setResponse] = useState('');
    const history = useHistory();

    useEffect(() => {
        Aos.init();
    },[]);

    const loginUserMutation = useMutation(API.common.userLogin);

    const handleEmailChange = (event) => {
        if (event.target.value) setEmptyEmailError(false)
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        if (event.target.value) setEmptyPasswordError(false)
        setPassword(event.target.value);
    }

    const resetForm = () => {
        document.getElementById("budgetForm").reset();
        setEmail('');
        setPassword('');
    }

    const validate = () => {
        if (email==='') setEmptyEmailError(true);
        if (password==='') setEmptyPasswordError(true);
        const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!re.test(email)) setInvalidEmailError(true)
        else setInvalidEmailError(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        validate();
        if (!EmptyPasswordError && !EmptyEmailError && !InvalidEmailError){
            const data = {
                email,
                password
            }
            const res = await loginUserMutation.mutateAsync(data);
            if (res.id){
                setEmail('')
                setPassword('')
                setEmptyEmailError(true)
                setEmptyPasswordError(true)
                setInvalidEmailError(true)
                setResponse('success');
                appTokenSet(res.token);
                loggedUserNameSet(res.userName);
                loggedUserIdSet(res.id);
                loggedUserImageSet(process.env.REACT_APP_API_URL + '/' + res.userImage.replaceAll("\\","/"));
                const budget = await fetchAllBudgetsFromAPI();
                const categories = await fetchChildrenCategoriesFromAPI();
                const otherCategoryId = categories.find(category => category.name === 'Other').id;
                setOtherCategoryId(otherCategoryId)
                activeBudgetSet(budget[0].id)
                history.push('/');
            }
            else{
                setResponse(res.message);
            }
        }
    }

    let responseMessage = ''
    if (response === 'success') history.push("/budget");
    else responseMessage = t(response);

    return (
        <Grid>
            <section data-aos="fade-right">
                {
                    responseMessage
                        ?
                    <>
                        <UserInformation>
                            {t(responseMessage)}
                        </UserInformation>
                        <SadMac sad={responseMessage}/>
                    </>
                        :
                    <SadMac sad={responseMessage}/>
                }
            </section>
            <section>
                <StyledHeader>{t('Login')}</StyledHeader>
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
                            type="password"
                            placeholder={t("password")}
                            onChange={handlePasswordChange}
                        />
                        <Label>{t('password')}</Label>
                        {EmptyPasswordError ? <Message>{t('Required')}</Message> : null}
                    </FormGroup>

                    <FormGroup>
                        {InvalidEmailError ? <Message>{t("Invalid Email")}</Message> : null}
                        <ButtonsStyle>
                            <Button
                                disabled={EmptyEmailError || EmptyPasswordError}
                                buttonType='submit'
                                // type="submit"
                            >{t('Login')}</Button>

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
            </section>
        </Grid>
    );
};

const ConnectedLoginPage = connect(null,
    {
        appTokenSet,
        loggedUserNameSet,
        loggedUserIdSet,
        loggedUserImageSet,
        activeBudgetSet,
        setOtherCategoryId,
    }
)(LoginPage);

export default ConnectedLoginPage;
