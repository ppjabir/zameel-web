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
        pauseOnHover: true,
        easing: 'easeOutElastic',
      }
    }else if(slideIdentity === 'home_video' || slideIdentity === 'home_audio' || slideIdentity === 'home_docs' || slideIdentity === 'sec-light') {
      settings = {
        dots: false,
        infinite: false,
        speed: 600,
        slidesToShow: slideIdentity === 'sec-light' ? 4 : 5,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: true,
        adaptiveHeight: false,
        easing: 'easeOutElastic',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: slideIdentity === 'sec-light' ? 3 : 4,
              slidesToScroll: 1,
              infinite: false,
              dots: false,
              arrows: true
            }
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: slideIdentity === 'sec-light' ? 2 : 3,
              slidesToScroll: 1,
              infinite: false,
              dots: false,
              arrows: false,
              draggable: true,
              initialSlide: 0
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: slideIdentity === 'sec-light' ? 1 : 2,
              slidesToScroll: 1,
              arrows: false,
              draggable: true,
              initialSlide: 0
            }
          }
        ]
      };
    }

    const history = useHistory();
    const playCurrentAudioVideo = (fileId, fromJourney, description=null) => {
      if(fromJourney === 'docs') {
        if(description !== null) {
          const stripDescription = description.replace(/<\/?[^>]+(>|$)/g, "");
          if (stripDescription.indexOf("http") === 0) {
            window.location.replace(stripDescription)
          }else {
            window.open(`${contextData.fileURL}${fileId}`)
          }
        }else {
          window.open(`${contextData.fileURL}${fileId}`)
        }
      }else {
        history.push('/allListings',{paramIdProps:fileId, fromJourney})
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
            <div key={index} className="video-list-item" onClick={()=>playCurrentAudioVideo(carouselItem.video, 'video')}>
              <div className="video-item">
                <img src={`${contextData.youTubeThumb}${carouselItem.video}/mqdefault.jpg`} alt={"video list"}/>
                <Shiitake lines={2} throttleRate={200} className="video-title text-info" tagName="p">
                  {carouselItem.title_1}
                </Shiitake>
                <h6><small>{carouselItem.tags ? carouselItem.tags.split(',')[0] : ''}</small></h6>
              </div>
            </div>
          ))
        )
      }else if(slideIdentity === 'home_audio') {
        return (
          carouselData.map((carouselItem, index) => (
            <div key={index} className="audio-list-item" onClick={()=>playCurrentAudioVideo(carouselItem.file, 'audio')}>
              <div className="audio-item">
                <img src={`${contextData.fileURL}${carouselItem.thumbnail}`} alt={"audio list"}/>
                <Shiitake lines={2} throttleRate={200} className="audio-title text-info" tagName="p">
                  {carouselItem.title_1}
                </Shiitake>
                <h6><small>{carouselItem.tags ? carouselItem.tags.split(',')[0] : ''}</small></h6>
                
              </div>
            </div>
          ))
        )
      }else if(slideIdentity === 'home_docs') {
        return (
          carouselData.map((carouselItem,index) => (
            <div key={index} className="audio-list-item" onClick={()=>playCurrentAudioVideo(carouselItem.file, 'docs', carouselItem.description)}>
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
      }else if(slideIdentity === 'sec-light') {
        return (
          carouselData.map((carouselItem, index) => (
            <div key={index} className="light-img">
              <img src={`${contextData.fileURL}${carouselItem.file}`} alt="{banner}" />
            </div>
          ))
        )
      }

    }

    return (
      <Styles>
          <Slider {...settings} className={slideIdentity}>
            {displayCarousel(slideIdentity)}
          </Slider>
      </Styles>
    );
}

const Styles = Styled.div`
  .slick-slider {
    &.home_video, &.home_audio, &.home_docs, &.sec-light {
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
          div {
            &:focus {
              outline: none; !important
            }
          }
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
        &:foucus {
          border: 0 none;
          outline: none;
        }
      }
    }
  }
  .light-img {
    padding: 0 5px;
    img {
      max-width: 100%;
      &:foucus {
        border: 0 none;
        outline: none;
      }
    }
  }
`