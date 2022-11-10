import React, { useEffect, useRef, useState } from 'react';
import './hero-slide.scss'

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import tmdbApi, { movieType, category } from './../../api/tmdbApi'
import apiConfig from '../../api/apiConfig';

import { useNavigate } from 'react-router-dom';

import  Button,{OutlineButton} from './../button/Button'
import Modal, {ModalContent} from './../modal/Modal'


const HeroSlide = () => {
    //console.log("tmdbApi", tmdbApi.getMoviesList);


    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 5 };
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, params);
                setMovieItems(response.results.slice(0, 4));


            } catch (err) {
                console.log('error');
            }
        }
        getMovies();
    }, [])
    console.log("movieItems", movieItems)
    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                //isPrev={1}
            //autoplay={{delay:3000}}
            >
                {
                    movieItems.map((item, index) => (
                        <SwiperSlide key={index}>
                            {({ isActive }) => (
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`}/>
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                movieItems.map((item, index) => <TrailerModal key={index} item={item}/>)
            }
        </div>
    )
}

const HeroSlideItem = props => {
    let navigate = useNavigate();
    const item = props.item;
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id);
        console.log("videos",videos)

        if (videos.results.length > 0) {
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
            console.log(modal)
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active');
    }

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">
                        {item.title}
                    </h2>
                    <div className="overview">
                        {item.title}
                    </div>
                    <div className="btns">
                        <Button
                            onClick={()=> navigate('/movie/' + item.id)}
                        >
                            Watch now
                        </Button>
                        <OutlineButton
                            onClick={()=>setModalActive()}
                        >
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                {/* poster */}
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
            {/* <img src={apiConfig.originalImage(item.backdrop_path)} alt="" /> */}
        </div>
    )
}

const TrailerModal = props => {
    const item = props.item;
    
    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src','');
    return(
        <Modal active={false} id= {`modal_${item.id}`} >
            <ModalContent onClose={onClose}>
                <iframe
                ref={iframeRef}
                title="trailer"
                width="100%"
                height="500px"
                ></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide