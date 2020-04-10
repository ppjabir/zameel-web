import React, { useContext } from 'react';
import {SiteContext} from './SiteContext';
import { Carousel } from './components/Carousel';
import {Row, Col, Button, Container } from 'react-bootstrap';
import Styled from "styled-components";
import { useHistory } from "react-router-dom";
var _ = require('lodash');

export const Home = () => {
    var contextData = useContext(SiteContext);
    const {siteData} = contextData;
    console.log('contextdata####', contextData);
    var headerImageListArray = [],
      homeVideoList=[],
      homeAudioList=[];
    if(siteData && siteData.banner_list && siteData.banner_list.length > 0) {
        headerImageListArray = siteData.banner_list.filter((item)=> item.deleted_at === null)
    }
    if(siteData && siteData.video_list && siteData.video_list.length > 0) {
        homeVideoList = siteData.video_list.filter((item)=> item.featured === 2 )
    }
    if(siteData && siteData.audio_list && siteData.audio_list.length > 0) {
        homeAudioList = siteData.audio_list.filter((item)=> item.featured === 2 );
        if(homeAudioList.length > 0 && siteData.nervazhi.length > 0){
            homeAudioList = _.concat(siteData.nervazhi[0],homeAudioList)
        }
        if(homeAudioList.length > 0) {
            homeAudioList = homeAudioList.map((item) => {
                if(!item.hasOwnProperty('thumbnail') || (item.hasOwnProperty('thumbnail') && item.thumbnail === null)) {
                    const id = item.id;
                    const findCategoryList = siteData.item_mappings.filter((item) => {
                        return item.item_id === id && item.mapping_type === "1"
                    });
                    const findCategoryId = findCategoryList[0].category_id;
                    const findThumbnail = siteData.category_list.filter((item)=> item.id === findCategoryId );
                    return {...item, 'thumbnail' : findThumbnail[0].thumbnail}
                }else {
                    return item;
                }
                
            })
        }
        
        console.log('Audio list#####:', homeAudioList)
    }


    // const history = useHistory();
    // const handleViewMoreVideos = (videoId) => {
    //     history.push('/contact',{videoId:'videoId'})
    // }
    
    const history = useHistory();
    const navigateToVideoList = () => {
        history.push('/featureVideos')
    }
    const navigateToLatestAudio = () => {
        history.push('/audioList')
    }
    return (
        <Styles>
            <Container>
                <div className="header-slider">
                    <Carousel carouselData={headerImageListArray} slideIdentity = {"banner"}/>
                </div>
                
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
                
                <Row>
                    <Col xs={8}>
                        <h2 className="sub-heading">Latest Audio</h2>
                    </Col>
                    <Col xs={4}>
                        <Button className="float-right" variant="primary" size="sm" onClick={()=>navigateToLatestAudio()}>
                            <strong>More</strong>
                        </Button>{' '}
                    </Col>
                </Row>
                <div className="featured-audios">
                    <Carousel carouselData={homeAudioList} slideIdentity = {"home_audio"}/>
                </div>
                
            </Container>

        </Styles>
    )
}


const Styles = Styled.div`
    .header-slider {
        min-height: 300px;
        margin-bottom: 30px;
        position: relative;
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
        .spinner-border {
            position: absolute;
            left: 50%;
            top: 50%;
            margin: -10px 0 0 -10px;
        }
    }
    .sub-heading {
        color: #808080;
        font-size: 20px;
    }
    .featured-videos,
    .featured-audios {
        padding-top: 10px;
        position: relative;
        min-height: 100px;
        margin-bottom: 30px;
        @media screen and (max-width: 992px) {
            margin-bottom: 15px;
        }
    }
    .spinner-border {
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -10px 0 0 -10px;
    }
`