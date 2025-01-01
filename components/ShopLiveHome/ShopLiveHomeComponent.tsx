// 'use client'
import {useEffect, useRef, useState} from "react";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import Image from "next/image";
import moment from 'moment';
import {client} from "../../apollo/client";
import {GET_SHOWS} from "../../apollo/queries/getShows";
import {useRouter} from "next/navigation";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { tinaField } from "tinacms/dist/react";

const MAX_SLIDE = 60;

const placeHolders = [1,1,1,1,1];
const ShopLiveHomeComponent = ({config}) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [shows, setShows] = useState([]);
    const fetchData = async () => {
        const {data: showData} = await client.query({
            query: GET_SHOWS,
            variables: {
                pageInfo: {
                    skipCount: 0,
                    limitCount: 10,
                },
            },
            fetchPolicy: 'no-cache',
        });
        setShows(showData?.getShows.showDetails);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const ref = useRef();

    const goNext = () => {
        if (ref.current && ref.current.goToSlide) {
            console.log('ref.current.state.currentSlide', ref.current.state.currentSlide);
            if (ref.current.state.currentSlide < MAX_SLIDE) {
                const nextSlide = ref.current.state.currentSlide + 1;
                ref.current.goToSlide(nextSlide);
            }
        }
    }

    const goPrevious = () => {
        if (ref.current && ref.current.goToSlide) {
            console.log('ref.current.state.currentSlide', ref.current.state.currentSlide);
            if (ref.current.state.currentSlide > 0) {
                const nextSlide = ref.current.state.currentSlide - 1;
                ref.current.goToSlide(nextSlide);
            }
        }
    }

    return (
    <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="flex items-center justify-between mb-8">
                <h2
                  data-tina-field={tinaField(config, "title")}
                  className="text-xl font-medium tracking-tight text-secondary"
                >
                    {config.title || 'Liveshows'}
                </h2>
                {!isLoading && <div>
                    <button onClick={goPrevious} className="shadow-md bg-white hover:bg-primary text-white font-bold py-2 px-2 rounded">
                        <img
                            src="/arrowLeft.svg"
                            alt="Buy Social"
                            className="h-5 w-5"
                        />
                    </button>
                    <button onClick={goNext} className="shadow-md ml-4 bg-white hover:bg-primary text-white font-bold py-2 px-2 rounded">
                        <img
                           src="/arrowRight.svg"
                            alt="Buy Social"
                            className="h-5 w-5"
                        />
                    </button>
                </div>}
            </div>
            {isLoading && <div className="flex justify-between flex-wrap relative overflow-hidden h-56 lg:h-72 xl:h-80">
                {placeHolders.map((p, index) => (
                    <div key={index} className='w-full sm:w-1/2 lg:w-1/5'>
                        <div className="mr-2 ml-2 relative h-56 overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
                            <Skeleton className="h-56 w-full rounded-md lg:h-72 xl:h-80"/>
                        </div>
                    </div>
                ))}
            </div>}
            <Carousel
                ref={ref}
                additionalTransfrom={0}
                centerMode={false}
                className=""
                containerClass={`w-full h-56 lg:h-72 xl:h-80 ${isLoading ? '!h-0' : ''}`}
                dotListClass=""
                focusOnSelect={false}
                infinite={false}
                itemClass=""
                keyBoardControl
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 5
                    },
                    mobile: {
                        breakpoint: {
                            max: 640,
                            min: 0
                        },
                        items: 1
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 640
                        },
                        items: 2
                    }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
                customLeftArrow={(<div></div>)}
                customRightArrow={(<div></div>)}
                >
                {isLoading ? placeHolders.map((p, index) => (
                    <div key={index}>
                        <div className="mr-2 ml-2 relative h-56 overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
                            <Skeleton className="h-56 w-full rounded-md lg:h-72 xl:h-80"/>
                        </div>
                    </div>
                )) : shows.map((show) => (
                        <div key={show.id} onClick={() => {
                            if (show.status === 'LIVE_NOW' || show.status === 'COMPLETED') {
                                router.push(`/live/${show.id}`)
                            }
                        }} className='cursor-pointer hover:opacity-75'>
                            <div className="mr-2 ml-2 relative h-56 overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
                                <Image
                                    fill={true}
                                    src={show.thumbnailUrl || 'https://picsum.photos/226/378'}
                                    className="h-full w-full object-cover object-center"
                                />
                                <img
                                    src="/previewPlay.svg"
                                    className="absolute w-14 h-14 object-cover object-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                />
                                <p className="absolute mt-1 text-lg text-white bottom-12 left-6 z-10 font-semibold">{show.title}</p>
                                <div className="absolute mt-1 text-sm text-white bottom-6 right-6 z-10 flex items-center">
                                    <img
                                        src="/user.svg"
                                        className="h-5 w-5 mr-2"
                                    />
                                    {show.views}
                                </div>
                                <p className="absolute mt-1 text-sm text-white bottom-6 left-6 z-10">{moment(show.startingAt).fromNow()}</p>
                                {show.status === 'LIVE_NOW' && <img
                                                                      src="/liveIcon.svg"
                                                                      alt=''
                                                                      className="h-8 w-auto absolute z-10 top-2 left-4"/>}

                                {show.status === 'COMPLETED' && <span className="absolute z-10 top-3 left-4 text-xs text-white bg-gray-400 px-2 py-1 tracking-widest rounded">
                                COMPLETED
                            </span>}
                                {show.status === 'UPCOMMING' && <span className="absolute z-10 top-3 left-4 text-xs text-white bg-primary px-2 py-1 tracking-widest rounded">
                                UPCOMING
                            </span>}
                                {show.status === 'AVAILABLE_SOON' && <span className="absolute z-10 top-3 left-4 text-xs text-white bg-primary px-2 py-1 tracking-widest rounded">
                                AVAILABLE SOON
                            </span>}
                            </div>
                        </div>
                    ))}
            </Carousel>
            {/*<div className="mt-8 text-sm md:hidden">*/}
            {/*    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">*/}
            {/*        Shop all*/}
            {/*        <span aria-hidden="true"> &rarr;</span>*/}
            {/*    </a>*/}
            {/*</div>*/}
        </div>
    </div>)
}

export default ShopLiveHomeComponent;