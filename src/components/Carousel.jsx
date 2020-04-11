import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {SiteContext} from '../SiteContext';
import React, {useContext} from "react";
import Slider from "react-slick";
import Styled from "styled-components";
import Shiitake from 'shiitake';
import { useHistory } from "react-router-dom";

export const Carousel = (props) =>{
    var contextData = useContext(SiteContext);
    const { carouselData, slideIdentity } = props;
    var settings = {};
    if(slideIdentity === 'banner') {
      settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: true
      }
    }else if(slideIdentity === 'home_video' || slideIdentity === 'home_audio' || slideIdentity === 'home_docs') {
      settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: true,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: false,
              dots: false,
              arrows: true
            }
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              initialSlide: 1,
              arrows: false
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: false
            }
          }
        ]
      };
    }

    const history = useHistory();
    const playCurrentVideo = (fileId, clickType) => {
        if(clickType === 'video_click') {
          history.push('/featureVideos',{videoIdParamprops:fileId})
        }else if(clickType === 'audio_click'){
          history.push('/audioList',{audioIdParamprops:fileId})
        }
    }
    
    const displayCarousel =(slideIdentity) => {
      if(slideIdentity === 'banner') {
        return (
          carouselData.map((carouselItem, index) => (
            <img key={index} src={`${contextData.fileURL}${carouselItem.file}`} alt="{banner}" />
          ))
        )
      }else if(slideIdentity === 'home_video') {
        return (
          carouselData.map((carouselItem,index) => (
            <div key={index} className="video-list-item" onClick={()=>playCurrentVideo(carouselItem.file, 'video_click')}>
              <div className="video-item">
                <img src={`${contextData.youTubeThumb}${carouselItem.video}/mqdefault.jpg`} alt={"video list"}/>
                <Shiitake lines={2} throttleRate={200} className="video-title text-info" tagName="p">
                  {carouselItem.title_1}
                </Shiitake>
                <h6><small>{carouselItem.tags.split(',')[0]}</small></h6>
              </div>
            </div>
          ))
        )
      }else if(slideIdentity === 'home_audio') {
        return (
          carouselData.map((carouselItem, index) => (
            <div key={index} className="audio-list-item" onClick={()=>playCurrentVideo(carouselItem.file, 'audio_click')}>
              <div className="audio-item">
                <img src={`${contextData.fileURL}${carouselItem.thumbnail}`} alt={"audio list"}/>
                <Shiitake lines={2} throttleRate={200} className="audio-title text-info" tagName="p">
                  {carouselItem.title_1}
                </Shiitake>
                <h6><small>{carouselItem.tags.split(',')[0]}</small></h6>
                
              </div>
            </div>
          ))
        )
      }else if(slideIdentity === 'home_docs') {
        return (
          carouselData.map((carouselItem,index) => (
            <div key={index} className="audio-list-item" onClick={()=>playCurrentVideo(carouselItem.file, 'audio_click')}>
              <div className="docs-item">
                <img src={`${contextData.fileURL}${carouselItem.thumbnail}`} alt={"docs list"}/>
                <Shiitake lines={2} throttleRate={200} className="audio-title text-info" tagName="p">
                  {carouselItem.title_1}
                </Shiitake>
                <h6><small>{carouselItem.title_1_ml}</small></h6>
                
              </div>
            </div>
          ))
        )
      }

    }

    return (
      <Styles>
        {carouselData.length === 0? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ):(
          <Slider {...settings} className={slideIdentity}>
            {displayCarousel(slideIdentity)}
          </Slider>
        )}
        
      </Styles>
    );
}

const Styles = Styled.div`
  .slick-slider {
    &.home_video, &.home_audio, &.home_docs {
      .slick-prev,
      .slick-next {
        &:before {
          color: #BF3577;
          font-size: 26px;
        }
      }
      .slick-prev {
        left: -28px;
      }
      .slick-track{
        .slick-slide {
          height: auto;
          .video-list-item,
          .audio-list-item {
            height: 100%;
            padding: 5px;
            cursor: pointer;
            img {
              max-width: 100%;
            }

            .video-item,
            .audio-item,
            .docs-item {
              min-width: 0;
              word-wrap: break-word;
              background-clip: border-box;
              box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
              height: inherit;

              .video-title,
              .audio-title {
                padding: 10px 10px 5px;
                margin: 0;
                line-height: 20px;
              }
              .audio-title {
                padding-top: 0;
              }
              h6 {
                padding: 0 10px 10px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              &:hover {
                .text-info, h6 {
                  color: #007bff!important
                }
              }
            }
            .audio-item,
            .docs-item {
              min-height: 180px;
              @media screen and (min-width: 992px) and (max-width: 1200px) {
                min-height: 170px;
              }
              @media screen and (min-width: 576px) and (max-width: 992px) {
                min-height: 160px;
              }
              @media screen and (min-width: 480px) and (max-width: 576px) {
                min-height: 152px;
              }
              @media screen and (max-width: 400px) {
                min-height: 160px;
              }
            }
            .video-item {
              min-height: 204px;
              @media screen and (min-width: 992px) and (max-width: 1200px) {
                min-height: 182px;
              }
              @media screen and (min-width: 576px) and (max-width: 992px) {
                min-height: 152px;
              }
              @media screen and (min-width: 480px) and (max-width: 576px) {
                min-height: 132px;
              }
              @media screen and (min-width: 400px) and (max-width: 480px) {
                min-height: 200px;
              }
              @media screen and (max-width: 400px) {
                min-height: 160px;
              }
              
            }
          }
        }
      }
    }
    .slick-dots {
      bottom: 25px;
      li {
        button {
          &:before {
            color: #fff;
            font-size: 12px;
          }
        }
      }
    }
    .audio-item,
    .docs-item {
      img {
        max-width: 80%;
        margin: 0 auto;
      }
    }
  }
`