import React, {useEffect} from 'react';
import SadMac from "components/SadMac";
import {Grid, StyledFeatureItem, StyledFeatureList, StyledHeader, SubHeader} from "./HomePageStyles";
import Aos from "aos"
import "aos/dist/aos.css"
import {useTranslation} from "react-i18next";

const HomePage = ({reload}) => {
    console.log(reload)
    useEffect(() => {
        Aos.init();
    },[reload]);

    const {t} = useTranslation();
    const delay = 200;
    const features = [
        t('adding and removing custom budget with categories'),
        t('switching languages at any time'),
        t('switching between budget at any time'),
        t('data visualization on interactive graphs'),
        t('adding and removing transactions'),
        t('sorting transaction with four available criteria'),
        t('searching in all transactions'),
        t('grouping transactions in categories'),
        t('exporting transactions to file'),
        t('importing transactions from file'),
        t('switching themes between light and dark'),
        t('website will look well at any device'),
        t('showing notification'),
    ];


    const featuresList = features.map((feature,index) => {
        console.log((delay + index * 10).toString())
        return(
        <StyledFeatureItem
            key={index}
            data-aos="fade-left"
            data-aos-delay={(delay + index * 100).toString()}
            data-aos-duration={'300'}
            data-aos-once={true}
            className={"aos-init"}
        >
            {feature}
        </StyledFeatureItem>
    )
    });

    return (
        <Grid>
            <section data-aos="fade-right">
                <SadMac sad={false}/>
            </section>
            <section>
                <StyledHeader data-aos="flip-down" data-aos-once={true}>{t("Budget App")}</StyledHeader>
                <SubHeader data-aos="flip-down" data-aos-once={true}>{t("Features")}:</SubHeader>
                <StyledFeatureList>
                    {featuresList}
                </StyledFeatureList>
            </section>
        </Grid>
    );
};

export default HomePage;
