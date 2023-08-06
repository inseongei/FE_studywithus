import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation,Mousewheel } from "swiper";
import styled from 'styled-components'
import { Link } from 'react-router-dom';

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";


const SwiperCard = (data) => {
    console.log(data)
    
  return (
    <Container>
        <div className='info'>최근 게시글 5개 미리보기</div>

    <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={4}  
        autoplayStart    
        coverflowEffect={{
          rotate: 20, // 회전각도
          stretch: 0, 
          depth: 100, // 깊이감도
          modifier: 2, 
          slideShadows: true,
        }}
        navigation={true} // 네비게이션 버튼
        mousewheel={true} // 마우스 휠
        modules={[EffectCoverflow,Navigation,Mousewheel]} // 모듈추가
        className="mySwiper"
      >
        
        {data.data.slice(0,5).map(data =>

            <SwiperSlide>
                <Link to={`/ProjectDetail/${data.id}`} key={data.id}>
                    <img src={data.rep_image}/>
                    <div className='card-title'>{data.title}</div>
                </Link>
            </SwiperSlide>


        )}

    </Swiper>
    </Container>
  )
}

const Container = styled.div`

.swiper{
    width:100%;
    padding-top: 50px;
    padding-bottom: 50px;
    height: 500px;
    background: #f5f5f5;
}

.info{
    background: #f5f5f5;
    font-size: 24px;
    font-weight: 500;
    padding: 20px;
}

.swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 300px;
    text-align: center;
}

.swiper-slide img {
    width:100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
}

.swiper-slide img:hover{
    background-color: #000;
    opacity: 80%;
    transition: all 1s;
}

.card-title{
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    margin-top: 10px;
}

`
export default SwiperCard