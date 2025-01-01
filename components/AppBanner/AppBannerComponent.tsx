import googlePlay from "../../public/googlePlay.svg";
import appStore from "../../public/appStore.svg";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";

const AppBannerComponent = ({config}) => {
    return (
        <div className="bg-gray-50">
            <section
                aria-labelledby="social-impact-heading"
                className="mx-auto max-w-7xl px-4 pt-0 sm:px-6 sm:pt-24 lg:px-8 mt-10 md:mt-0"
            >
                <div className="relative overflow-hidden rounded-lg">
                    <div className="absolute inset-0">
                        <img
                            src={config && config.background || "https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-01.jpg"}
                            alt=""
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
                        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                            <h2 id="social-impact-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                <span
                                  data-tina-field={tinaField(config, "title")}
                                  className="block sm:inline">
                                {config && config.title || 'Download Our App'}
                                </span>
                            </h2>
                            <p
                              data-tina-field={tinaField(config, "description")}
                              className="mt-3 text-xl text-white">
                                {config && config.description || 'Take your shopping experience to the next level! Get our app for exclusive deals and early access to sales.'}

                            </p>
                            <div className="flex justify-center mt-5">
                                <img
                                    data-tina-field={tinaField(config, "googlePlayLink")}
                                    src="/googlePlay.svg"
                                    alt="Buy Social"
                                    className="h-10 w-30 cursor-pointer"
                                    onClick={() => {
                                        if (config.googlePlayLink) {
                                            window.location.href = config.googlePlayLink
                                        }
                                    }}
                                />
                                <img
                                   data-tina-field={tinaField(config, "appStoreLink")}
                                    src="/appStore.svg"
                                    alt="Buy Social"
                                    className="h-10 w-30 ml-6 cursor-pointer"
                                    onClick={() => {
                                        if (config.appStoreLink) {
                                            window.location.href = config.appStoreLink
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AppBannerComponent;