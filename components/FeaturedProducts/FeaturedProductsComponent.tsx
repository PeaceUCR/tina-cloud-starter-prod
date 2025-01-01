// 'use client'

import {Featured_Products} from "../../apollo/queries/featuredProducts";
import Link from "next/link";
import FeaturedProductCard from "../FeaturedProductCard/FeaturedProductCard";
import {useEffect, useState} from "react";
import {client} from "../../apollo/client";
import { tinaField } from "tinacms/dist/react";


const placeHolders = [1,1,1,1];
export default function FeaturedProductsComponent({config}) {
    const [products, setProducts] = useState([]);

    const [isLoading, setIsLoading] = useState(true)
    const fetchData = async () => {
        const {data} = await client.query({
            query: Featured_Products,
            fetchPolicy: 'no-cache'
        });
        const productsData = data?.getFeaturedProducts.products ? data?.getFeaturedProducts.products.slice(0, 4) : [];
        setProducts(productsData);
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex items-center justify-between">
                    <h2
                      data-tina-field={tinaField(config, "title")}
                      className="text-xl font-medium tracking-tight text-secondary">
                        {config.title || 'Featured Products'}
                    </h2>
                    {!isLoading && <Link href={`/productList/0?collectionName=Featured Products`} className="text-sm font-medium text-primary hover:text-primary/80 block">
                        Shop All
                        <span aria-hidden="true"> &rarr;</span>
                    </Link>}
                </div>

                <div className={`${isLoading ? 'mt-5' : 'mt-6'} grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8`}>
                    {isLoading ? placeHolders.map((p, index) => (
                        <FeaturedProductCard key={index} isLoading={true}/>
                    )) : products.map((product) => (
                        //`/product/${product.id}`
                        <FeaturedProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
