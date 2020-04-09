import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {SiteContext} from '../SiteContext';
import React, {useContext} from "react";
import Slider from "react-slick";
import Styled from "styled-components";
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
    }else if(slideIdentity === 'home_video') {
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
    const playCurrentVideo = (videoId) => {
        history.push('/featureVideos',{videoIdParamprops:videoId})
    }
    
    const displayCarousel =(slideIdentity) => {
      if(slideIdentity === 'banner') {
        return (
          carouselData.map(carouselItem => (
            <img src={`${contextData.fileURL}${carouselItem.file}`} alt="{banner}" />
          ))
        )
      }else if(slideIdentity === 'home_video') {
        return (
          carouselData.map(carouselItem => (
            <div className="video-list-item" onClick={()=>playCurrentVideo(carouselItem.video)}>
              <div className="video-item">
                <img src={`${contextData.youTubeThumb}${carouselItem.video}/mqdefault.jpg`} alt={"video list"}/>
                <h6>{carouselItem.title_1}</h6>
              </div>
            </div>
          ))
        )
      }
    }

    return (
      <Styles>
        {carouselData.length === 0? (
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
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
    &.home_video {
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
          .video-list-item {
            height: 100%;
            padding: 5px;
            cursor: pointer;
            img {
              max-width: 100%;
            }

            .video-item {
              min-width: 0;
              word-wrap: break-word;
              background-clip: border-box;
              box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
              height: inherit;

              h6 {
                padding: 10px;
                height: 107px;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
  }
`