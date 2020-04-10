import React, { useContext,useState, useEffect } from 'react';
import {SiteContext} from './SiteContext';
import {Row, Col, Container } from 'react-bootstrap';
import Styled from "styled-components";

export const AudioList = () => {
    var contextData = useContext(SiteContext);
    const {siteData} = contextData;
    var allLatestAudio=[];
    if(siteData && siteData.audio_list && siteData.audio_list.length > 0) {
        //console.log('jabir====', siteData)
        allLatestAudio = siteData.audio_list.filter((item)=> item.deleted_at === null)
    }
    if(allLatestAudio.length > 0) {
        allLatestAudio = allLatestAudio.map((item) => {
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
    const allLatestAudioList = (allLatestAudio) => {
        return (
            allLatestAudio.map(latestAudioItem => (
                <div className="all-featured-list">
                    <Row>
                        <Col xs={5} md={3}><img src={`${contextData.fileURL}${latestAudioItem.thumbnail}`} alt={"video list"}/></Col>
                        <Col xs={7} md={9}>
                            <p className="text-info">{latestAudioItem.title_1}</p>
                            <h6><small>{latestAudioItem.tags.split(',')[0]}</small></h6>
                        </Col>
                    </Row>
                </div>
            ))
        )
    }
    return (
        <Styles>
            <Container>
                <div className="latestAudioContainer">
                    
                    {allLatestAudio.length >0 && allLatestAudioList(allLatestAudio)}
                </div>
            </Container>
        </Styles>
    )
}

const Styles = Styled.div`
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
    .latestAudioContainer {
        padding: 20px 0;
    }
    .all-featured-list {
        p {
            padding: 7px 10px 0 0;
            margin-bottom: 10px;
        }
        h6 {
            margin-bottom: 0;
        }
        &:hover {
            .text-info, h6 {
                color: #007bff!important
            }
        }
    }
`