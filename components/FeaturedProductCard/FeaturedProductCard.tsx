'use client'

import {deepLinkRedirect} from "../../utils/deepLink";
import {generateProductImageURL} from "../../utils/product";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function FeaturedProductCard({product, isLoading}) {
    if (isLoading) {
        return (<div className="group relative">
            <Skeleton className="h-56 w-full overflow-hidden rounded-md lg:h-72 xl:h-80"/>
            <h3 className="mt-4 text-sm text-secondary/80">
                <Skeleton className="h-5 w-full overflow-hidden rounded-md"/>
            </h3>
        </div>)
    }
    return (
        <a className="cursor-pointer" href={`/product/${product.id}`}
           key={product.id}>
            <div className="group relative">
                <div className="relative h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                    <img
                        src={generateProductImageURL(product.media.url,  '500')}
                        // alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
                    />
                    <p className="absolute mt-1 text-xl text-white bottom-6 right-6 z-10 font-semibold">${(product.salePrice || 0).toFixed(2)}</p>
                </div>
                <h3 className="mt-4 text-sm text-secondary">
                    <a href={product.href}>
                        <span className="absolute inset-0" />
                        {product.name}
                    </a>
                </h3>
                {/*<p className="mt-1 text-sm text-secondary/60">Color</p>*/}
            </div>
        </a>
    )
}
