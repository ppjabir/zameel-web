import React, { useContext,useState, useEffect } from 'react';
import {SiteContext} from './SiteContext';
import  { Redirect } from 'react-router-dom'
import {Row, Col, Container } from 'react-bootstrap';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Styled from "styled-components";

export const AllListings = (props) => {
    var contextData = useContext(SiteContext);
    const paramId = props.location && props.location.state &&  props.location.state.paramIdProps ? 
    props.location.state.paramIdProps : '';
    console.log('location prps:', props.location.state )
    const paramFromJourney = props.location && props.location.state &&  props.location.state.fromJourney ? 
    props.location.state.fromJourney : '';
    const {siteData} = contextData;
    var allLatestData=[];
    const [fileId, setFileId] = useState(paramId ? paramId : '' );
    if(paramFromJourney === 'video'){
        if(siteData && siteData.video_list && siteData.video_list.length > 0) {
            //console.log('jabir====', siteData)
            allLatestData = siteData.video_list.filter((item)=> item.deleted_at === null)
        }
    }else if(paramFromJourney === 'audio') {
        if(siteData && siteData.audio_list && siteData.audio_list.length > 0) {
            //console.log('jabir====', siteData)
            allLatestData = siteData.audio_list.filter((item)=> item.deleted_at === null)
            if(allLatestData.length > 0) {
                allLatestData = allLatestData.map((item) => {
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
        }
    }else if(paramFromJourney === 'docs') {
        allLatestData = siteData.documents_list.filter((item)=> item.deleted_at === null);
        //replace( /(<([^>]+)>)/ig, '')
        if(allLatestData.length > 0) {
            allLatestData = allLatestData.map((item) => {
                if(!item.hasOwnProperty('thumbnail') || (item.hasOwnProperty('thumbnail') && item.thumbnail === null)) {
                    const id = item.id;
                    const findCategoryList = siteData.item_mappings.filter((item) => {
                        return item.item_id === id && item.mapping_type === "3"
                    });
                    const findCategoryId = findCategoryList[0].category_id;
                    const findThumbnail = siteData.category_list.filter((item)=> item.id === findCategoryId );
                    return {...item, 'thumbnail' : findThumbnail[0].thumbnail}
                }else {
                    return item;
                }
                
            })
        }
    }
    const handlethumbnailClick = (urlId,fromJourney="non-docs",description=null) => {
        if(fromJourney === 'docs') {
            if(description !== null) {
              const stripDescription = description.replace(/<\/?[^>]+(>|$)/g, "");
              if (stripDescription.indexOf("http") === 0) {
                window.location.replace(stripDescription)
              }else {
                window.open(`${contextData.fileURL}${urlId}`)
              }
            }else {
              window.open(`${contextData.fileURL}${urlId}`)
            }
        }else {
            setFileId(urlId)
        }
    }

    const allLatestDataList = (allLatestData) => {
        if(paramFromJourney === 'docs') {
            return (
                <Row xs={2} sm={3} md={4} lg={5} className="equal">
                    {allLatestData.map((allLatestDataItem, key) => ( 
                        <Col key={key}>
                            <div className="all-featured-list"
                            onClick={()=>handlethumbnailClick(allLatestDataItem.file, 'docs', allLatestDataItem.description)}>
                                <img src={ paramFromJourney === 'video' ?
                                    `${contextData.youTubeThumb}${allLatestDataItem.video}/mqdefault.jpg` :
                                    `${contextData.fileURL}${allLatestDataItem.thumbnail}`
                                    } alt={"Video Audio Thumb"}
                                />
                                <p className="text-info">{allLatestDataItem.title_1}</p>
                                <h6><small>{allLatestDataItem.title_1_ml}</small></h6>
                            </div>
                        </Col>
                    ))}
                </Row>
            )
        }else {
            return (
                <Row xs={2} sm={3} md={4} lg={5} className="equal">
                    {allLatestData.map((allLatestDataItem, key) => ( 
                        <Col key={key} >
                            <div className="all-featured-list"
                            onClick={()=>handlethumbnailClick(paramFromJourney === 'video' ? allLatestDataItem.video : allLatestDataItem.file)}>
                                <img src={ paramFromJourney === 'video' ?
                                    `${contextData.youTubeThumb}${allLatestDataItem.video}/mqdefault.jpg` :
                                    `${contextData.fileURL}${allLatestDataItem.thumbnail}`
                                    } alt={"Video Audio Thumb"}
                                />
                                <p className="text-info">{allLatestDataItem.title_1}</p>
                                <h6><small>{allLatestDataItem.tags? allLatestDataItem.tags.split(',')[0] : ''}</small></h6>
                            </div>
                        </Col>
                    ))}
                </Row>
            )
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [fileId])
    if (!props.location || !props.location.state) {
        console.log("&&&&&&&&&&&&&",props.location)
        return <Redirect to='/'  />
    }
    return (
        <Styles>
            <Container>
                { fileId && paramFromJourney ==='video' && (
                    <div className="ifram-container">
                        <iframe width="420"
                            height="345"
                            title="Video Player"
                            allowfullscreen="true"
                            src={`https://www.youtube.com/embed/${fileId}?autoplay=1&rel=0&modestbranding=1`} allow="autoplay" frameborder="0">
                        </iframe>
                    </div>
                )}
                { fileId && paramFromJourney ==='audio' && (
                    <div className="audio-container">
                        <AudioPlayer
                            autoPlay
                            showSkipControls={false}
                            showJumpControls={false}
                            volume={0.8}
                            src={`${contextData.fileURL}${fileId}`}
                            loop={false}
                            loopOff={true}
                            customAdditionalControls={[]}
                            // other props here
                        />
                    </div>
                )}
                <div className="allFeaturedDataConatiner">
                
                    {allLatestData.length >0 && allLatestDataList(allLatestData)}
                </div>
            </Container>
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
        @media screen and (max-width: 700px) {
            margin-top: 10px;
        }
        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
    .allFeaturedDataConatiner {
        padding: 30px 0;
        @media screen and (max-width: 700px) {
            padding: 15px 0;
        }
    }

    .all-featured-list {
        background-clip: border-box;
        margin-bottom: 30px;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
        height: inherit;
        cursor: pointer;
        height: 91%;
        @media screen and (min-width: 576px) and (max-width: 700px) {
            margin-bottom: 15px;
            height: 93%;
        }
        @media screen and (max-width: 576px) {
            margin-bottom: 15px;
            height: 95%;
        }
        img {
            max-width: 100%;
        }
        p {
            padding: 7px 10px;
            margin-bottom: 0;
            word-wrap: break-word;
        }
        h6 {
            margin-bottom: 0;
            padding: 0 10px 7px;
        }
        &:hover {
            .text-info, h6 {
                color: #007bff!important
            }
        }
    }
    .audio-container {
        padding-top: 30px;
    }
    .row.equal {
        display: flex;
        flex-wrap: wrap;
      }
`