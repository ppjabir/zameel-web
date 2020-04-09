import React, { useContext,useState, useEffect } from 'react';
import {SiteContext} from './SiteContext';
import {Row, Col } from 'react-bootstrap';
import Styled from "styled-components";

export const FeatureVideos = (props) => {
    console.log('props',props)
    var contextData = useContext(SiteContext);
    const videoIdParam = props.location.state &&  props.location.state.videoIdParamprops ? 
    props.location.state.videoIdParamprops : '';
    const {siteData} = contextData;
    var allFeaturedVideo=[];
    const [videoId, setVideoId] = useState(videoIdParam ? videoIdParam : '' );
    if(siteData && siteData.video_list && siteData.video_list.length > 0) {
        //console.log('jabir====', siteData)
        allFeaturedVideo = siteData.video_list.filter((item)=> item.deleted_at === null && item.featured === 2 )
    }
    const handlethumbnailClick = (videoPlayingId) => {
        setVideoId(videoPlayingId)
    }
    const allFeatureVideoList = (allFeaturedVideo) => {
        return (
            allFeaturedVideo.map(featureVideoItem => (
                <div className="all-featured-list" onClick={()=>handlethumbnailClick(featureVideoItem.video)}>
                    <Row>
                        <Col xs={5} md={3}><img src={`${contextData.youTubeThumb}${featureVideoItem.video}/mqdefault.jpg`} alt={"video list"}/></Col>
                        <Col xs={7} md={9}><p>{featureVideoItem.title_1}</p></Col>
                    </Row>
                </div>
            ))
        )
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [videoId])
    return (
        <Styles>
            { videoId && (
                <div class="ifram-container">
                    <iframe width="420"
                        height="345"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&cc_load_policy&fs=0&modestbranding=1`} allow="autoplay" frameborder="0">
                    </iframe>
                </div>
            )}
            <div className="featureVideoContainer">
            
                {allFeatureVideoList.length >0 && allFeatureVideoList(allFeaturedVideo)}
            </div>
        </Styles>
    )
}

const Styles = Styled.div`
    .ifram-container {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%;
        height: 0;
        margin-top: 20px;
        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
    .all-featured-list {
        background-clip: border-box;
        margin-bottom: 30px;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
        height: inherit;
        cursor: pointer;
        @media screen and (max-width: 576px) {
            margin-bottom: 15px;
        }
        img {
            max-width: 100%;
        }
    }
    .featureVideoContainer {
        padding: 20px 0;
    }
`