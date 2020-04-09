import React, { useContext } from 'react';
import {SiteContext} from './SiteContext';
import { Carousel } from './components/Carousel';
import {Row, Col, Button } from 'react-bootstrap';
import Styled from "styled-components";
import { useHistory } from "react-router-dom";

export const Home = () => {
    var contextData = useContext(SiteContext);
    const {siteData} = contextData;
    console.log('contextdata####', contextData);
    var headerImageListArray = [],
      homeVideoList=[];
    if(siteData && siteData.banner_list && siteData.banner_list.length > 0) {
        headerImageListArray = siteData.banner_list.filter((item)=> item.deleted_at === null)
    }
    if(siteData && siteData.video_list && siteData.video_list.length > 0) {
        homeVideoList = siteData.video_list.filter((item)=> item.featured === 2 )
    }

    // const history = useHistory();
    // const handleViewMoreVideos = (videoId) => {
    //     history.push('/contact',{videoId:'videoId'})
    // }
    
    console.log('######', headerImageListArray);
    const history = useHistory();
    const navigateToVideoList = () => {
        history.push('/featureVideos')
    }
    return (
        <Styles>
            <div className="header-slider">
                <Carousel carouselData={headerImageListArray} slideIdentity = {"banner"}/>
            </div>
            <div>
                <Row>
                    <Col xs={8}>
                        <h2 className="sub-heading">Videos of the day</h2>
                    </Col>
                    <Col xs={4}>
                    <Button className="float-right" variant="primary" size="sm" onClick={()=>navigateToVideoList()}>
                        <strong>More</strong>
                    </Button>{' '}
                    </Col>
                </Row>
                <div className="featured-videos">
                    <Carousel carouselData={homeVideoList} slideIdentity = {"home_video"}/>
                </div>
            </div>
        </Styles>
    )
}


const Styles = Styled.div`
    .header-slider {
        min-height: 300px;
        margin-bottom: 30px;
        @media screen and (max-width: 576px) {
            min-height: 100px;
            margin-bottom: 15px;
        }
        @media screen and (min-width: 576px) and (max-width: 700px){
            min-height: 150px;
            margin-bottom: 15px;
        }
        @media screen and (min-width: 700px) and (max-width: 992px){
            min-height: 170px;
        }
    }
    .sub-heading {
        color: #808080;
        font-size: 20px;
    }
    .featured-videos {
        padding-top: 10px;
    }
`