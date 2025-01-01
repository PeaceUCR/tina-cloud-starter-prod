'use client'

import {useEffect, useState} from "react";
import {client} from "../../apollo/client";
import {GET_COLLECTIONS} from "../../apollo/queries/getCollections";
import {useRouter} from "next/navigation";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { tinaField } from "tinacms/dist/react";

const features = [
    {
        name: 'Tops',
        description:
            'From casual tees to elegant blouses, our Tops collection offers a variety of styles to complement any wardrobe.',
        imageSrc: "/shopByCollection1.jpg",
        imageAlt: 'White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.',
    },
    {
        name: 'Pants',
        description:
            'Explore our range of Pants, featuring everything from comfortable joggers to sleek, tailored trousers. ',
        imageSrc: "/shopByCollection2.jpg",
        imageAlt: 'Detail of zipper pull with tan leather and silver rivet.',
    },
    {
        name: 'Sweaters',
        description:
            'Explore our range of Pants, featuring everything from comfortable joggers to sleek, tailored trousers.',
        imageSrc: "/shopByCollection3.jpg",
        imageAlt: 'Detail of zipper pull with tan leather and silver rivet.',
    },
    {
        name: 'Accessories',
        description:
            'Accessorize to perfection with our curated selection. Elevate your look with everything from statement jewelry to practical, stylish hats and scarves',
        imageSrc: "/shopByCollection4.jpg",
        imageAlt: 'Detail of zipper pull with tan leather and silver rivet.',
    },
    {
        name: 'Shoes',
        description:
            'Step up your shoe game with our collection. From everyday sneakers to the finest formal footwear, find the perfect pair to walk you through life’s moments',
        imageSrc: "/shopByCollection5.jpg",
        imageAlt: 'Detail of zipper pull with tan leather and silver rivet.',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const placeHolders = [1,1];
export default function ShopByCollectionComponent({config}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true)

    const [collectionData, setCollectionData] = useState([]);
    const fetchCollection = async () => {
        const {data: collectionData} = await client.query({
            query: GET_COLLECTIONS
        });
        setCollectionData([
            {id: 0, name: 'Recent'},
            ...collectionData.getProductCollections
        ]);
        setIsLoading(false);
    }
    useEffect(() => {
        fetchCollection();
    }, []);

    const handleRedirect = (index) => {
        if (collectionData && collectionData.length > 0) {
            return router.push(`/productList/${collectionData[index].id}?collectionName=${collectionData[index].name}`);
        }
        return '';
    }

    const getCollectionName = (index) => {
        if (collectionData && collectionData.length > 0 && index < collectionData.length) {
            return collectionData[index].name;
        }
        return '';
    }


    const renderBuilderIoCollections = () => {
        return (config.collections || []).map((feature, featureIdx) => {
            return (<div
              key={featureIdx}
              onClick={() => handleRedirect(featureIdx)}
              className="mt-10 bg-white py-2 flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8 rounded-lg"
            >
                <div
                  className={classNames(
                    featureIdx % 2 === 0 ? 'lg:col-start-1 md:pl-6' : 'lg:col-start-8 xl:col-start-9 md:pr-6',
                    'mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4 px-0'
                  )}
                >
                    <h3
                      className="text-lg font-medium text-secondary"
                      data-tina-field={tinaField(feature, "name")}
                    >{feature.name}</h3>
                    <p
                      className="mt-2 text-sm text-secondary/80"
                      data-tina-field={tinaField(feature, "description")}
                    >{feature.description}</p>
                    <button className="bg-primary hover:bg-primary/80 text-white py-3 px-6 rounded text-sm mt-4"
                            data-tina-field={tinaField(feature, "actionLink")}
                            onClick={() => {
                        if (feature.actionLink) {
                            window.location.href = feature.actionLink;
                        }
                    }}>
                        View All Items
                    </button>
                </div>
                <div
                  data-tina-field={tinaField(feature, "src")}
                  className={classNames(
                    featureIdx % 2 === 0 ? 'lg:col-start-6 xl:col-start-5' : 'lg:col-start-1',
                    'flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8'
                  )}
                >
                    <div className="aspect-h-2 aspect-w-5 overflow-hidden bg-gray-100">
                        <img
                          src={feature.src}
                          alt="collection"
                          className="object-cover object-center h-full w-full"
                        />
                    </div>
                </div>
            </div>)
        });
    }
    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:pt-24 pb-0 lg:max-w-7xl lg:px-8">
                <h2
                  data-tina-field={tinaField(config, "title")}
                  className="text-xl font-medium tracking-tight text-secondary">
                    {config.title || 'Shop By Collection'}
                </h2>
                <div className="">
                    {isLoading ? placeHolders.map((p, index) => (
                        <Skeleton key={index} className="w-full h-80 py-2 mt-10"/>
                    )):
                      config && config.collections && config.collections.length > 0 ?
                      renderBuilderIoCollections() :
                      features.map((feature, featureIdx) => {
                        return featureIdx < collectionData.length ? (<div
                            key={featureIdx}
                            onClick={() => handleRedirect(featureIdx)}
                            className="mt-10 bg-white py-2 flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8 rounded-lg"
                        >
                            <div
                                className={classNames(
                                    featureIdx % 2 === 0 ? 'lg:col-start-1 md:pl-6' : 'lg:col-start-8 xl:col-start-9 md:pr-6',
                                    'mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4 px-0'
                                )}
                            >
                                <h3 className="text-lg font-medium text-secondary">{getCollectionName(featureIdx)}</h3>
                                <p className="mt-2 text-sm text-secondary/80">{feature.description}</p>
                                <button className="bg-primary hover:bg-primary/80 text-white py-3 px-6 rounded text-sm mt-4">
                                    View All Items
                                </button>
                            </div>
                            <div
                                className={classNames(
                                    featureIdx % 2 === 0 ? 'lg:col-start-6 xl:col-start-5' : 'lg:col-start-1',
                                    'flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8'
                                )}
                            >
                                <div className="aspect-h-2 aspect-w-5 overflow-hidden bg-gray-100">
                                    <img
                                        src={feature.imageSrc}
                                        alt={feature.imageAlt}
                                        className="object-cover object-center"
                                    />
                                </div>
                            </div>
                        </div>) : undefined
                    })}
                </div>
            </div>
        </div>
    )
}
