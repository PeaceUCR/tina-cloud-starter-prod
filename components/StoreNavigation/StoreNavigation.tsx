import {Fragment, useEffect, useRef, useState} from 'react'
import {Dialog, Popover, Tab, Transition, Menu, Disclosure} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import logoImage from '../../public/logo.svg'
import manageProfileImage from '../../public/manageProfile.svg'
import recentOrderImage from '../../public/recentOrder.svg'
import settingsImage from '../../public/settings.svg'
import signOutImage from '../../public/signOut.svg'
import Link from "next/link";
import {getUsername, handleSignOut, isAnonymousUser, signInAsGuestIfNoCurrentUser} from "../../utils/firebase";
import {emitCustomEvent, useCustomEventListener} from "react-custom-events";
import {getCartCount, saveServerCartToLocal} from "../../utils/localCart";
import {client} from "../../apollo/client";
import {Cart_Info} from "../../apollo/queries/cartInfo";
import {GET_COLLECTIONS} from "../../apollo/queries/getCollections";
import {deepLinkRedirect} from "../../utils/deepLink";
import {Get_Store_Theme} from "../../apollo/queries/getStoreTheme";
import {GET_SHOWS} from "../../apollo/queries/getShows";
import {
    ChevronDownIcon,
    ChevronRightIcon,
    ArrowLeftIcon,
    ArrowRightIcon
} from "@heroicons/react/20/solid";
import {GET_COLLECTIONS_V2} from "../../apollo/queries/getCollectionsV2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {useWindowSize} from "usehooks-ts";
import { tinaField } from "tinacms/dist/react";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <ChevronRightIcon
            onClick={onClick}
            style={{ ...style}}
            className={classNames('!h-8 !w-8 cursor-pointer !text-secondary hover:!text-primary',  className)}
            aria-hidden="true"
        />

    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <ArrowLeftIcon
            onClick={onClick}
            style={{ ...style}}
            className={classNames('!h-8 !w-8 cursor-pointer !text-secondary hover:!text-primary',  className)}
            aria-hidden="true"
        />
    );
}

const ManageProfileActiveImage = (props) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
        width: '20px',
        height: '20px',
        marginRight: '8px'
    }}>
        <g clip-path="url(#clip0_6274_33952)">
            <path d="M9 4.35938C7.45312 4.35938 6.1875 5.59688 6.1875 7.0875C6.1875 8.57813 7.45312 9.84375 9 9.84375C10.5469 9.84375 11.8125 8.60625 11.8125 7.11562C11.8125 5.625 10.5469 4.35938 9 4.35938ZM9 8.57812C8.15625 8.57812 7.45312 7.93125 7.45312 7.11562C7.45312 6.3 8.15625 5.625 9 5.625C9.84375 5.625 10.5469 6.27188 10.5469 7.0875C10.5469 7.90313 9.84375 8.57812 9 8.57812Z" fill={props.fill}/>
            <path d="M9.00156 0.506348C4.30469 0.506348 0.507812 4.30322 0.507812 9.0001C0.507812 13.697 4.30469 17.522 9.00156 17.522C13.6984 17.522 17.5234 13.697 17.5234 9.0001C17.5234 4.30322 13.6984 0.506348 9.00156 0.506348ZM5.57031 15.3563V13.0501C5.57031 12.1501 6.30156 11.4188 7.20156 11.4188H10.8578C11.7578 11.4188 12.4891 12.1501 12.4891 13.0501V15.3563C11.4766 15.9188 10.2953 16.2282 9.02969 16.2282C7.76406 16.2563 6.58281 15.9188 5.57031 15.3563ZM13.7266 14.4845V13.0501C13.7266 11.447 12.4328 10.1532 10.8297 10.1532H7.17344C5.57031 10.1532 4.27656 11.447 4.27656 13.0501V14.4845C2.72969 13.1626 1.74531 11.1938 1.74531 9.0001C1.77344 5.00635 5.00781 1.77197 9.00156 1.77197C12.9953 1.77197 16.2578 5.03447 16.2578 9.02822C16.2578 11.1938 15.2734 13.1626 13.7266 14.4845Z" fill={props.fill}/>
        </g>
        <defs>
            <clipPath id="clip0_6274_33952">
                <rect width="18" height="18" fill="white"/>
            </clipPath>
        </defs>
    </svg>
)

const RecentOrderActiveImage = (props) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
        width: '20px',
        height: '20px',
        marginRight: '8px'
    }}>
        <path d="M17.2705 14.7656L15.8643 2.64377C15.7237 1.40627 14.683 0.478149 13.4174 0.478149H4.55803C3.32053 0.478149 2.2799 1.40627 2.11115 2.64377L0.704904 14.7656C0.620529 15.4688 0.845529 16.1438 1.32365 16.6781C1.80178 17.2125 2.44865 17.4938 3.15178 17.4938H14.8237C15.5268 17.4938 16.2018 17.1844 16.6518 16.6781C17.1018 16.1719 17.3549 15.4688 17.2705 14.7656ZM15.7237 15.8344C15.4987 16.0875 15.1893 16.2281 14.8518 16.2281H3.15178C2.81428 16.2281 2.5049 16.0875 2.2799 15.8344C2.0549 15.5813 1.9424 15.2438 1.99865 14.9063L3.37678 2.81252C3.43303 2.2219 3.93928 1.7719 4.55803 1.7719H13.4455C14.0362 1.7719 14.5424 2.2219 14.6268 2.81252L16.033 14.9344C16.0612 15.2719 15.9487 15.5813 15.7237 15.8344Z" fill={props.fill}/>
        <path d="M11.7297 4.33127C11.3922 4.41564 11.1672 4.75315 11.2516 5.09065C11.2797 5.2594 11.3078 5.42814 11.3078 5.56877C11.3078 6.83439 10.2672 7.87502 9.00156 7.87502C7.73594 7.87502 6.69531 6.83439 6.69531 5.56877C6.69531 5.40002 6.72344 5.2594 6.75156 5.09065C6.83594 4.75315 6.61094 4.41564 6.27344 4.33127C5.93594 4.24689 5.59844 4.4719 5.51406 4.8094C5.45781 5.06252 5.42969 5.31564 5.42969 5.56877C5.42969 7.53752 7.03281 9.14064 9.00156 9.14064C10.9703 9.14064 12.5734 7.53752 12.5734 5.56877C12.5734 5.31564 12.5453 5.06252 12.4891 4.8094C12.4047 4.4719 12.0672 4.27502 11.7297 4.33127Z" fill={props.fill}/>
    </svg>

)

const SettingsActiveImage = (props) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
        width: '20px',
        height: '20px',
        marginRight: '8px'
    }}>
        <g clip-path="url(#clip0_6274_32514)">
            <path d="M16.3675 10.2094L15.2987 9.59065C15.3269 9.4219 15.3269 9.22502 15.3269 9.00002C15.3269 8.80315 15.3269 8.60627 15.2987 8.4094L16.3675 7.79065C17.0987 7.36877 17.3519 6.41252 16.93 5.68127L15.8331 3.76877C15.6362 3.40315 15.2987 3.15002 14.905 3.06565C14.5112 2.95315 14.0894 3.0094 13.7237 3.20627L12.655 3.85315C12.3456 3.62815 12.0081 3.43127 11.6425 3.26252V2.02502C11.6425 1.18127 10.9394 0.478149 10.0956 0.478149H7.90187C7.05812 0.478149 6.35499 1.18127 6.35499 2.02502V3.26252C5.98937 3.43127 5.65187 3.62815 5.34249 3.82502L4.27375 3.20627C3.90812 3.0094 3.51437 2.95315 3.0925 3.06565C2.69875 3.17815 2.36125 3.43127 2.16437 3.76877L1.0675 5.68127C0.645621 6.41252 0.898746 7.36877 1.63 7.79065L2.69875 8.4094C2.67062 8.57815 2.67062 8.77502 2.67062 9.00002C2.67062 9.1969 2.67062 9.39377 2.69875 9.59065L1.63 10.2094C0.898746 10.6313 0.645621 11.5875 1.0675 12.3188L2.16437 14.2313C2.36125 14.5969 2.69875 14.85 3.0925 14.9344C3.48625 15.0469 3.90812 14.9906 4.27375 14.7938L5.34249 14.175C5.65187 14.4 5.98937 14.5969 6.35499 14.7375V15.975C6.35499 16.8188 7.05812 17.5219 7.90187 17.5219H10.0956C10.9394 17.5219 11.6425 16.8188 11.6425 15.975V14.7375C12.0081 14.5688 12.3456 14.3719 12.655 14.1469L13.7237 14.7656C14.0894 14.9625 14.4831 15.0188 14.8769 14.9063C15.2706 14.7938 15.6081 14.5406 15.805 14.2031L16.9019 12.2906C17.3237 11.5594 17.0706 10.6313 16.3675 10.2094ZM15.8331 11.6719L14.7362 13.5844C14.7081 13.6406 14.6519 13.6969 14.5675 13.6969C14.4831 13.725 14.4269 13.6969 14.3706 13.6688L13.2456 13.0219C12.8237 12.7688 12.3175 12.7969 11.9237 13.0781C11.6706 13.275 11.3894 13.4156 11.08 13.5563C10.6581 13.7531 10.3769 14.175 10.3769 14.6531V15.9469C10.3769 16.0875 10.2644 16.2281 10.0956 16.2281H7.90187C7.76124 16.2281 7.62062 16.1156 7.62062 15.9469V14.6531C7.62062 14.175 7.33937 13.7531 6.91749 13.5563C6.60812 13.4156 6.32687 13.2469 6.07374 13.0781C5.87687 12.9375 5.62374 12.8531 5.37062 12.8531C5.14562 12.8531 4.94875 12.9094 4.78 13.0219L3.655 13.6688C3.59875 13.6969 3.51437 13.725 3.45812 13.6969C3.40187 13.6688 3.34562 13.6406 3.28937 13.5844L2.1925 11.6719C2.10812 11.5313 2.16437 11.3625 2.27687 11.3063L3.40187 10.6594C3.79562 10.4344 4.04875 9.95627 3.9925 9.50627C3.96437 9.36565 3.96437 9.1969 3.96437 9.02815C3.96437 8.83127 3.96437 8.69065 3.9925 8.55002C4.04875 8.0719 3.82375 7.6219 3.40187 7.3969L2.27687 6.75002C2.13625 6.66565 2.10812 6.4969 2.16437 6.3844L3.26125 4.4719C3.28937 4.41565 3.34562 4.3594 3.43 4.3594C3.51437 4.33127 3.57062 4.3594 3.62687 4.38752L4.75187 5.0344C5.17375 5.28752 5.68 5.2594 6.07374 4.97815C6.32687 4.78127 6.60812 4.64065 6.91749 4.50002C7.33937 4.30315 7.62062 3.88127 7.62062 3.40315V2.02502C7.62062 1.8844 7.73312 1.74377 7.90187 1.74377H10.0956C10.2362 1.74377 10.3769 1.85627 10.3769 2.02502V3.31877C10.3769 3.7969 10.6581 4.21877 11.08 4.41565C11.3894 4.55627 11.6706 4.72502 11.9237 4.89377C12.3175 5.17502 12.8237 5.20315 13.2175 4.97815L14.3425 4.33127C14.3987 4.30315 14.4831 4.27502 14.5394 4.30315C14.5956 4.33127 14.6519 4.3594 14.7081 4.41565L15.805 6.32815C15.8894 6.46877 15.8331 6.63752 15.7206 6.69377L14.5956 7.34065C14.2019 7.56565 13.9487 8.04377 14.005 8.49377C14.0331 8.6344 14.0331 8.80315 14.0331 8.9719C14.0331 9.16877 14.0331 9.3094 14.005 9.45002C13.9487 9.92815 14.2019 10.3781 14.5956 10.6031L15.7206 11.25C15.8612 11.3625 15.8894 11.5313 15.8331 11.6719Z" fill={props.fill}/>
            <path d="M8.99922 5.37195C7.00234 5.37195 5.37109 7.0032 5.37109 9.00007C5.37109 10.9969 7.00234 12.6282 8.99922 12.6282C10.9961 12.6282 12.6273 10.9969 12.6273 9.00007C12.6273 7.0032 10.9961 5.37195 8.99922 5.37195ZM8.99922 11.3626C7.70547 11.3626 6.63672 10.2938 6.63672 9.00007C6.63672 7.70632 7.70547 6.63757 8.99922 6.63757C10.293 6.63757 11.3617 7.70632 11.3617 9.00007C11.3617 10.2938 10.293 11.3626 8.99922 11.3626Z" fill={props.fill}/>
        </g>
        <defs>
            <clipPath id="clip0_6274_32514">
                <rect width="18" height="18" fill="white"/>
            </clipPath>
        </defs>
    </svg>

)

const SignOutActiveImage = (props) => (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
        width: '20px',
        height: '20px',
        marginRight: '8px'
    }}>
        <path d="M3.28828 17.4938H6.46641C7.19766 17.4938 7.81641 16.875 7.81641 16.1438V14.2031C7.81641 13.8656 7.53516 13.5844 7.19766 13.5844C6.86016 13.5844 6.55078 13.8656 6.55078 14.2031V16.1719C6.55078 16.2281 6.52266 16.2563 6.46641 16.2563H3.28828C2.61328 16.2563 2.07891 15.7219 2.07891 15.0469L2.07891 2.98127C2.07891 2.30627 2.61328 1.7719 3.28828 1.7719H6.46641C6.52266 1.7719 6.55078 1.80002 6.55078 1.85627V3.7969C6.55078 4.1344 6.83203 4.41565 7.19766 4.41565C7.56328 4.41565 7.81641 4.1344 7.81641 3.7969V1.85627C7.81641 1.12502 7.19766 0.506273 6.46641 0.506273H3.28828C1.91016 0.506273 0.813282 1.63127 0.813282 2.98127L0.813282 15.0188C0.813282 16.3969 1.93828 17.4938 3.28828 17.4938Z" fill={props.fill}/>
        <path d="M11.0492 8.38125H6.01484C5.67734 8.38125 5.39609 8.6625 5.39609 9C5.39609 9.3375 5.67734 9.61875 6.01484 9.61875H11.0211L9.27734 11.3906C9.02422 11.6437 9.02422 12.0375 9.27734 12.2906C9.53047 12.5438 9.92422 12.5438 10.1773 12.2906L12.9898 9.42187C13.243 9.16875 13.243 8.775 12.9898 8.52187L10.1773 5.65312C10.0648 5.54062 9.89609 5.45625 9.72734 5.45625C9.55859 5.45625 9.41797 5.5125 9.27734 5.625C9.02422 5.87813 9.02422 6.27188 9.27734 6.525L11.0492 8.38125Z" fill={props.fill}/>
    </svg>

)

const THEME = 'THEME';
const IS_LIVE = 'IS_LIVE';
const THREE_LEVEL_COLLECION = 'THREE_LEVEL_COLLECION';
const hexToRgb = hex =>
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
        ,(m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16));
export const setThemeData = async () => {
    const cachedData = localStorage.getItem(THEME);
    if (cachedData) {
        const pared = JSON.parse(cachedData);
        const { primaryColor, secondaryColor } = pared;
        if (primaryColor && secondaryColor) {
            document.documentElement.style
                .setProperty('--color-primary', hexToRgb(primaryColor).join(' '));
            document.documentElement.style
                .setProperty('--color-secondary', hexToRgb(secondaryColor).join(' '));
        }
    }
    const { data } = await client.query({ query: Get_Store_Theme});
    const { primaryColor, secondaryColor } = data.getStoreTheme;
    if (primaryColor && secondaryColor) {
        localStorage.setItem(THEME, JSON.stringify(data.getStoreTheme));
        document.documentElement.style
            .setProperty('--color-primary', hexToRgb(primaryColor).join(' '));
        document.documentElement.style
            .setProperty('--color-secondary', hexToRgb(secondaryColor).join(' '));
    }
}
// TODO this logo not work for webstore, it only for app
export const getLogo = () => {
    const cachedData = localStorage.getItem(THEME);
    if (cachedData) {
        const pared = JSON.parse(cachedData);
        const { logoUrl } = pared;
        if (logoUrl) {
            return logoUrl;
        }
    }
    return logoImage;
}
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const AccountDropDown = () =>  {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex items-center rounded-full text-secondary/60 hover:text-secondary/80">
                    <span className="sr-only">Open options</span>
                    <UserIcon className="h-6 w-6" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-72 px-5 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="/profile"
                                    className={classNames(
                                        active ? 'text-primary' : 'text-secondary/80',
                                        'block px-4 py-4 text-base flex flex-row items-center border-b border-gray-200'
                                    )}
                                >

                                    {active ?
                                        <ManageProfileActiveImage fill={`rgb(${typeof window !== "undefined" ? window.getComputedStyle(document.body).getPropertyValue('--color-primary').split(' ').join(',') : ''})`}/>
                                        :
                                        <Image
                                            priority
                                            src={manageProfileImage}
                                            alt="Manage Profile"
                                            className="h-5 w-5 mr-2"
                                        />
                                    }
                                    <span>
                                        Manage Profile
                                    </span>
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="/recent"
                                    className={classNames(
                                        active ? 'text-primary' : 'text-secondary/80',
                                        'block px-4 py-4 text-base flex flex-row items-center border-b border-gray-200'
                                    )}
                                >
                                    {active ?
                                        <RecentOrderActiveImage fill={`rgb(${typeof window !== "undefined" ? window.getComputedStyle(document.body).getPropertyValue('--color-primary').split(' ').join(',') : ''})`}/>
                                        :
                                        <Image
                                            priority
                                            src={recentOrderImage}
                                            alt="Recent Orders"
                                            className="h-5 w-5 mr-2"
                                        />
                                    }
                                    <span>
                                        Recent Orders
                                    </span>
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="/settings"
                                    className={classNames(
                                        active ? 'text-primary' : 'text-secondary/80',
                                        'block px-4 py-4 text-base flex flex-row items-center border-b border-gray-200'
                                    )}
                                >
                                    {active ?
                                        <SettingsActiveImage fill={`rgb(${typeof window !== "undefined" ? window.getComputedStyle(document.body).getPropertyValue('--color-primary').split(' ').join(',') : ''})`}/>
                                        :
                                        <Image
                                            priority
                                            src={settingsImage}
                                            alt="Settings"
                                            className="h-5 w-5 mr-2"
                                        />
                                    }
                                    <span>
                                        Settings
                                    </span>
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    type="submit"
                                    onClick={handleSignOut}
                                    className={classNames(
                                        active ? 'text-primary' : 'text-secondary/80',
                                        'block px-4 py-4 text-base flex flex-row items-center'
                                    )}
                                >
                                    {active ?
                                        <SignOutActiveImage fill={`rgb(${typeof window !== "undefined" ? window.getComputedStyle(document.body).getPropertyValue('--color-primary').split(' ').join(',') : ''})`}/>
                                        :
                                        <Image
                                            priority
                                            src={signOutImage}
                                            alt="Sign out"
                                            className="h-5 w-5 mr-2"
                                        />
                                    }
                                    <span>
                                          Sign out
                                        </span>
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

const HeaderMenu = ({collection}) => {
    const [isShowing, setIsShowing] = useState(false);
    // useEffect(() => {
    //     emitCustomEvent('showCollection', {
    //         isShowing: isShowing,
    //         collection: collection
    //     });
    // }, [isShowing]);
    return (<Popover>
        <Popover.Button>
            <div
                onMouseEnter={() => {
                    console.log('onMouseEnter', collection.id);
                    setIsShowing(true);
                    emitCustomEvent('showCollection', {
                        isShowing: true,
                        collection: collection
                    });
                }}
                onMouseLeave={() => {
                    setIsShowing(false);
                    emitCustomEvent('showCollection', {
                        isShowing: false,
                        collection: collection
                    });
                }}
                onClick={() => {window.location.href = `/productList/${collection.id}?collectionName=${collection.name}`}}
                style={{
                    height: '74px'
                }}
                className={classNames('p-3 flex items-center gap-x-1 leading-6 text-base font-medium hover:text-primary border-b-2 outline-0', isShowing ? 'border-primary text-primary' : 'border-transparent text-secondary')}>
                {collection.name}
                <ChevronDownIcon className={classNames('h-5 w-5 flex-none', isShowing ? 'text-primary' : 'text-secondary hover:text-primary')} aria-hidden="true" />
            </div>
        </Popover.Button>
    </Popover>)
}

const MobileSubMenu = ({subCollections}) => {
    return subCollections.map((c1) => (
            <li key={c1.id}>
                        {c1.children && c1.children.length > 0 ? <Disclosure as="div" key={c1.id}>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button
                                            className={classNames(
                                                'flex items-center w-full text-left rounded-md p-2 gap-x-1 leading-6 text-base font-medium text-secondary hover:text-primary'
                                            )}
                                        >
                                            <ChevronRightIcon
                                                className={classNames(
                                                    open ? 'rotate-90 text-primary' : 'text-secondary',
                                                    'h-5 w-5 shrink-0 ml-2'
                                                )}
                                                aria-hidden="true"
                                            />
                                            {c1.name}
                                        </Disclosure.Button>
                                        <Disclosure.Panel as="ul" className="mt-1 px-2">
                                            {c1.children.map((c2) => (
                                                <li key={c2.id}>
                                                    <a
                                                        href={`/productList/${c2.id}?collectionName=${c2.name}`}
                                                        className={classNames(
                                                            'block rounded-md py-2 pr-2 pl-9 leading-6 text-base text-secondary hover:text-primary'
                                                        )}
                                                    >
                                                        {c2.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure> :
                        <a
                            href={`/productList/${c1.id}?collectionName=${c1.name}`}
                            className={classNames(
                                'block rounded-md py-2 pr-2 pl-9 leading-6 text-base font-medium text-secondary hover:text-primary'
                            )}
                        >
                            {c1.name}
                        </a>}
            </li>
        ))
}

// showing status with different collection, should be sync update, can't be state
let showingStatus = {};

export default function StoreNavigation({config}) {
    const [open, setOpen] = useState(false);
    const [collectionData, setCollectionData] = useState([]);
    const [isAnonymous, setIsAnonymous] = useState(true);
    const [name, setName] = useState('');
    const fetchCollection = async () => {
        const {data: collectionData} = await client.query({
            query: GET_COLLECTIONS
        });
        setCollectionData([
            {id: 0, name: 'Recent'},
            ...collectionData.getProductCollections
        ]);
    }

    const [levelCollections, setLevelCollections] = useState([]);

    const processV2Response = (response) => {
        const result = []

        const getChildren = (id) => {
            return response.filter(c => c.parentId === id);
        }
        response.filter(c => !c.parentId).forEach(c1 => {
            // const level1 =
            let c1Children = getChildren(c1.id);
            if (c1Children && c1Children.length > 0) {
                c1Children = c1Children.map(c2 => {
                    const c2Children = getChildren(c2.id);
                    return {
                        ...c2,
                        children: c2Children
                    }
                })
            }
            result.push({
                ...c1,
                children: c1Children
            })
        });

        console.log('fetchCollectionV2', result);
        setLevelCollections([
            {id: 0, name: 'Recent', children: []},
            ...result
        ]);
        localStorage.setItem(THREE_LEVEL_COLLECION, JSON.stringify(response));
    }
    const fetchCollectionV2 = async () => {
        const {data: collectionData} = await client.query({
            query: GET_COLLECTIONS_V2
        });
        const { getProductCollectionsV2 } = collectionData;
        const response = JSON.parse(JSON.stringify(getProductCollectionsV2));
        processV2Response(response);
    }
    const fetchServerCart = async () => {
        const {data: serverCart} = await client.query({
            query: Cart_Info,
            fetchPolicy: 'no-cache'
        });
        console.log('serverCart', serverCart.getUserCartInfo);
        saveServerCartToLocal(serverCart.getUserCartInfo);
        emitCustomEvent('fetchServerCartDone');
        setCartCount(getCartCount());
    }

    const [isLive, setIsLive] = useState(
        typeof window !== "undefined" ? localStorage.getItem(IS_LIVE) === 'true' : false
    );
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
        const shows = showData?.getShows.showDetails;
        const liveShow = shows.find(show => show.status === 'LIVE_NOW');
        if (liveShow) {
            setIsLive(true);
            localStorage.setItem(IS_LIVE, 'true');
        } else {
            setIsLive(false);
            localStorage.removeItem(IS_LIVE);
        }
    }

    useEffect(() => {
        setThemeData();
        fetchCollection();
        fetchCollectionV2();
        signInAsGuestIfNoCurrentUser().then(() => {
            isAnonymousUser().then(r => {
                    console.log('StoreNavigation isAnonymous', r);
                    setIsAnonymous(r);
                    if (!r) {
                        fetchServerCart();
                        getUsername().then(name => setName(name))
                    }
                }
            );
        });
        setCartCount(getCartCount());
        fetchData();
        const cachedData = localStorage.getItem(THREE_LEVEL_COLLECION);
        if (cachedData) {
            const response = JSON.parse(cachedData);
            processV2Response(response);
        }
    }, []);

    useCustomEventListener('refreshCart', (data) => {
        setCartCount(getCartCount());
    })
    useCustomEventListener('dumpCart', (data) => {
        setCartCount(getCartCount());
        fetchServerCart();
    })
    const [cartCount, setCartCount] = useState(0);


    const collections = collectionData && collectionData.length > 0 ? collectionData : [];

    const handleClickAccount = () => {
        window.location.href = `/login?callback=${window.location.href}`;
    }

    const [subCollection, setSubCollection] = useState({});
    const [isShowing, setIsShowing] = useState(false);
    const [isHoverIn, setIsHoverIn] = useState(false);
    // showing status with different collection

    useEffect(() => {
        // console.log('showingStatus', showingStatus);
        showingStatus = {}
    }, []);

    useCustomEventListener('showCollection', ({isShowing, collection}) => {
        if (!collection) {
            return;
        }
        console.log('isShowing', isShowing, collection)
        showingStatus[collection.id] = isShowing;

        if (isShowing) {
            setSubCollection(collection);
        }
        const keys = Object.keys(showingStatus);
        let result = false;
        keys.forEach(key => result = result || showingStatus[key]);


        setIsShowing(result);
        console.log('result', result, showingStatus);

        // if (isHoverIn) {
        //     setIsShowing(true);
        //     // NO need to change if hover in drop down
        // } else {
        //     // setIsShowing(isShowing);
        //     setIsShowing(result);
        //     console.log('result', result, showingStatus);
        // }
        // setSubCollection(subCollection);
    })
    const handleHoverIn = () => {
        // showingStatus[subCollection.id] = true;
        if (subCollection) {
            emitCustomEvent('showCollection', {
                isShowing: true,
                collection: subCollection
            });
        }
    }
    const handleHoverOut = () => {
        if (subCollection) {
            emitCustomEvent('showCollection', {
                isShowing: false,
                collection: subCollection
            });
        }
    }
    useEffect(() => {
        if (isHoverIn) {
            // setIsShowing(true);
            // handleHoverIn();
        } else {
            // setIsShowing(false);
            // is move top /bottom???
            // const keys = Object.keys(showingStatus);
            // let result = false;
            // keys.forEach(key => result = result || showingStatus[key]);
            // setIsShowing(result);
            // handleHoverOut();
        }
    }, [isHoverIn]);

    const { width } = useWindowSize();

    const [currentSlide, setCurrentSlide] = useState(0);
    const settings = {
        className: "slider variable-width",
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        // slidesToShow: 5,
        slidesToScroll: 1,
        variableWidth: true,
        beforeChange: (current, next) => {
            setCurrentSlide(next);
        },
        // nextArrow: <SampleNextArrow />,
        // prevArrow: <SamplePrevArrow isFirst={currentSlide === 0}/>
    }
    let sliderRef = useRef();

    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef();

    useEffect(() => {
        console.log('headerRef.current', headerRef.current);
        if (!headerRef.current) return;
        const resizeObserver = new ResizeObserver(() => {
            console.log('headerRef.current.clientHeight', headerRef.current.clientHeight);
            setHeaderHeight(headerRef.current.clientHeight);
            // Do what you want to do when the size of the element changes
        });
        resizeObserver.observe(headerRef.current);
        return () => resizeObserver.disconnect(); // clean up
    }, []);

    return (
        <div className="bg-white">
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">

                                <ul role="list" className="flex flex-1 flex-col gap-y-7 pt-8">
                                    <li>
                                        <ul role="list" className="-mx-2 space-y-1">
                                            {levelCollections.map((c, index) => (
                                                <div key={index}>
                                                    {c.children && c.children.length > 0 ?
                                                        <Disclosure as="div">
                                                            {({ open }) => (
                                                                <>
                                                                    <Disclosure.Button
                                                                        className={classNames(
                                                                            'flex items-center w-full text-left rounded-md p-2 gap-x-1 leading-6 text-base font-medium text-secondary hover:text-primary'
                                                                        )}
                                                                    >
                                                                        <ChevronRightIcon
                                                                            className={classNames(
                                                                                open ? 'rotate-90 text-primary' : 'text-secondary',
                                                                                'h-5 w-5 shrink-0 ml-2'
                                                                            )}
                                                                            aria-hidden="true"
                                                                        />
                                                                        {c.name}
                                                                    </Disclosure.Button>
                                                                    <Disclosure.Panel as="ul" className="mt-1 px-2">
                                                                        <MobileSubMenu subCollections={c.children}/>
                                                                    </Disclosure.Panel>
                                                                </>
                                                            )}
                                                        </Disclosure> :
                                                        <a href={`/productList/${c.id}?collectionName=${c.name}`} className="whitespace-nowrap block rounded-md py-2 pr-2 pl-10 leading-6 text-base font-medium text-secondary hover:text-primary">
                                                            {c.name}
                                                        </a>}
                                                </div>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>

                                {isAnonymous && <div className="space-y-6 border-t border-gray-200 px-8 py-6">
                                    <div className="flow-root">
                                        <a href="/signup" className="-m-2 block p-2 font-medium text-secondary">
                                            Create an account
                                        </a>
                                    </div>
                                    <div className="flow-root">
                                        <a href="/login" className="-m-2 block p-2 font-medium text-secondary">
                                            Sign in
                                        </a>
                                    </div>
                                </div>}
                                {!isAnonymous && <div className="space-y-6 border-t border-gray-200 px-8 py-6">
                                    <div className="flow-root">
                                        <span className="-m-2 block p-2 font-medium text-secondary">
                                            {name}
                                        </span>
                                    </div>
                                    <div className="flow-root">
                                        <span onClick={handleSignOut} className="-m-2 block p-2 font-medium text-secondary cursor-pointer">
                                            Sign out
                                        </span>
                                    </div>
                                </div>}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="relative">
                <nav aria-label="Top">
                    {/* Top navigation */}


                </nav>
            </header>

            <header className="relative isolate z-10 bg-white" ref={headerRef}>
                {isLive &&
                    <a href="/live" className="cursor-pointer block hover:opacity-90" style={{
                        backgroundColor: '#F23030'
                    }}>
                        <div className="mx-auto flex h-14 max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
                            <p className="font-inter flex-1 text-center text-sm font-bold text-white lg:flex-none">
                                We are LIVE!
                            </p>
                        </div>
                    </a>}
                {(!isLive || isAnonymous) && <div className="bg-gray-900">
                    <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <div className="hidden lg:block lg:flex-1">
                        </div>

                        <a
                          href={config.topbarLink ? config.topbarLink : "/"}
                          className="flex-1 text-center text-sm font-medium text-white lg:flex-none"
                          data-tina-field={tinaField(config, "topbar")}
                        >
                            {config.topbar || 'Get free delivery on orders over $100'}
                        </a>
                        {isAnonymous && <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                            <a href="/signup" className="text-sm font-medium text-white hover:text-primary">
                                Create an account
                            </a>
                            <span className="h-6 w-px bg-gray-600" aria-hidden="true" />
                            <a href="/login" className="text-sm font-medium text-white hover:text-primary">
                                Sign in
                            </a>
                        </div>}
                        {!isAnonymous && <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                <span className="text-sm font-medium text-white hover:text-primary">
                                    {name}
                                </span>
                            <span className="h-6 w-px bg-gray-600" aria-hidden="true" />
                            <span onClick={handleSignOut} className="text-sm font-medium text-white hover:text-primary cursor-pointer">
                                    Sign out
                                </span>
                        </div>}
                    </div>
                </div>}
                {/* Secondary navigation */}
                <div className="bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="border-b border-gray-200" style={{
                            borderBottomWidth: '1px'
                        }}>
                            <div className="flex items-center justify-between" style={{
                                height: '74px'
                            }}>
                                {/* Logo (lg+) */}
                                <div className="hidden lg:flex lg:items-center"
                                     data-tina-field={tinaField(config.logo, "src")}
                                     style={{
                                    width: '118px',
                                    flexGrow: 0,
                                    flexShrink: 0,
                                }}>
                                    <a href="/">
                                        <span className="sr-only">Buy Social</span>
                                        <img
                                            src={config.logo && config.logo.src ? config.logo.src : "/logo.svg"}
                                            alt="Buy Social"
                                            className="h-8 w-auto"
                                        />
                                    </a>
                                </div>

                                <div className="hidden h-full lg:flex lg:items-center lg:ml-4">
                                    {/* Mega menus */}
                                    {/*<div className="flex justify-start space-x-8 flex-wrap h-6 overflow-hidden">*/}
                                    {levelCollections.length > 4 && <ArrowLeftIcon
                                        onClick={() => sliderRef.slickPrev()}
                                        className={classNames('!h-5 !w-5 ', currentSlide === 0 ? 'opacity-0 cursor-not-allowed' : 'cursor-pointer !text-secondary hover:!text-primary')}
                                        aria-hidden="true"
                                    />}
                                    <div style={{
                                        width: `${width && width < 1280 ? width - 460 : 1280 - 460}px`
                                    }}>
                                        <Slider {...settings}
                                                ref={slider => {
                                                    sliderRef = slider;
                                                }}
                                        >
                                            {levelCollections.map((c, index) => (
                                                <div key={index}>
                                                    {c.children && c.children.length > 0 ?
                                                        <HeaderMenu key={index} collection={c}/> :
                                                        <a href={`/productList/${c.id}?collectionName=${c.name}`} className="whitespace-nowrap p-3 flex items-center gap-x-1 leading-6 text-base font-medium text-secondary hover:text-primary border-b-2 border-transparent" style={{
                                                            height: '74px'
                                                        }}>
                                                            {c.name}
                                                        </a>}
                                                </div>
                                            ))}

                                        </Slider>
                                    </div>
                                    {levelCollections.length > 4 && <ArrowRightIcon
                                        onClick={() => sliderRef.slickNext()}
                                        className={classNames('!h-5 !w-5 ml-2', currentSlide === levelCollections.length - 1 ? 'opacity-0 cursor-not-allowed' : 'cursor-pointer !text-secondary hover:!text-primary')}
                                        aria-hidden="true"
                                    />}
                                </div>

                                {/* Mobile menu and search (lg-) */}
                                <div className="flex flex-1 items-center lg:hidden">
                                    <button
                                        type="button"
                                        className="-ml-2 rounded-md bg-white p-2 text-secondary/60"
                                        onClick={() => setOpen(true)}
                                    >
                                        <span className="sr-only">Open menu</span>
                                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    {/* Search */}
                                    <a href="/search" className="ml-2 p-2 text-secondary/60 hover:text-secondary/80">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                    </a>
                                </div>

                                {/* Logo (lg-) */}
                                <a href="/" className="lg:hidden">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        src={config.logo && config.logo.src ? config.logo.src : "/logo.svg"}
                                        alt="Buy Social"
                                        className="h-8 w-auto"
                                    />
                                </a>

                                <div className="flex flex-1 items-center justify-end">
                                    <div className="flex items-center lg:ml-8">
                                        <div className="flex space-x-8">
                                            <div className="hidden lg:flex">
                                                <a href="/search" className="-m-2 p-2 text-secondary/60 hover:text-secondary/80">
                                                    <span className="sr-only">Search</span>
                                                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                                </a>
                                            </div>

                                            <div className="flex">
                                                {isAnonymous && <span onClick={handleClickAccount} className="-m-2 p-2 text-secondary/60 hover:text-secondary/80 cursor-pointer">
                                                        <span className="sr-only">Account</span>
                                                        <UserIcon className="h-6 w-6" aria-hidden="true" />
                                                    </span>}
                                                {!isAnonymous && <AccountDropDown/>}
                                            </div>
                                        </div>

                                        <span className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true" />

                                        <div className="flow-root" id="cart">
                                            <a onClick={() => deepLinkRedirect(
                                                'shopperapp://cart',
                                                '/cart'
                                            )
                                            } className="group -m-2 flex items-center p-2 cursor-pointer">
                                                <ShoppingCartIcon
                                                    className="h-6 w-6 flex-shrink-0 text-secondary/60 group-hover:text-secondary/80"
                                                    aria-hidden="true"
                                                />
                                                <span className="ml-2 text-sm font-medium text-secondary/80 group-hover:text-secondary">{cartCount}</span>
                                                <span className="sr-only">items in cart, view bag</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div className="max-w-7xl mx-auto">*/}
                {/*    <Slider {...settings}>*/}
                {/*        {levelCollections.map((c, index) => (*/}
                {/*            <div key={index}>*/}
                {/*                {c.children && c.children.length > 0 ?*/}
                {/*                    <HeaderMenu key={index} collection={c}/> :*/}
                {/*                    <a href={`/productList/${c.id}?collectionName=${c.name}`} className="p-3 flex items-center gap-x-1 leading-6 text-base font-medium text-secondary hover:text-primary border-b-2 border-transparent" style={{*/}
                {/*                        height: '74px'*/}
                {/*                    }}>*/}
                {/*                        {c.name}*/}
                {/*                    </a>}*/}
                {/*            </div>*/}
                {/*        ))}*/}

                {/*    </Slider>*/}
                {/*</div>*/}
                <Transition
                    show={isShowing || isHoverIn}
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 -translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-1"
                >
                    <div
                        // TODO Dynamic position height
                        className="absolute -screen inset-x-0  -z-10 bg-white shadow-lg ring-1 ring-gray-900/5"
                        style={{
                            top: `${headerHeight}px`
                        }}>
                        <div
                            onMouseEnter={() => setIsHoverIn(true)}
                            onMouseLeave={() => setIsHoverIn(false)}
                            className="mx-auto max-w-7xl max-h-96 pt-4 pb-6 flex flex-col flex-wrap justify-center items-center content-center">

                            {subCollection.children && subCollection.children.map((c1, index) => (
                                <div key={`${c1.id}-${index}`} className="flex flex-col mx-10 min-w-[260px]">
                                    <a href={`/productList/${c1.id}?collectionName=${c1.name}`} className="text-base font-semibold text-secondary hover:text-primary py-3">
                                        {c1.name}
                                    </a>
                                    {c1.children.map((c2,index) => (
                                        <a key={`${c2.id}-${index}`} href={`/productList/${c2.id}?collectionName=${c2.name}`} className="text-base font-normal text-secondary hover:text-primary py-3">
                                            {c2.name}
                                        </a>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </Transition>
                {/*<nav className="mx-auto flex max-w-7xl items-center justify-between" aria-label="Global">*/}
                {/*    <div className="hidden lg:flex lg:gap-x-12 items-center">*/}
                {/*        {levelCollections.map((c, index) => (*/}
                {/*             <div key={index}>*/}
                {/*                 {c.children && c.children.length > 0 ?*/}
                {/*                     <HeaderMenu key={index} collection={c}/> :*/}
                {/*                     <a href="#" className="text-base font-medium text-secondary hover:text-secondary/80">*/}
                {/*                         {c.name}*/}
                {/*                     </a>}*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</nav>*/}
                {/*<Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>*/}
                {/*    <div className="fixed inset-0 z-10" />*/}
                {/*    <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">*/}
                {/*        <div className="flex items-center justify-between">*/}
                {/*            <a href="#" className="-m-1.5 p-1.5">*/}
                {/*                <span className="sr-only">Your Company</span>*/}
                {/*                <img*/}
                {/*                    className="h-8 w-auto"*/}
                {/*                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"*/}
                {/*                    alt=""*/}
                {/*                />*/}
                {/*            </a>*/}
                {/*            <button*/}
                {/*                type="button"*/}
                {/*                className="-m-2.5 rounded-md p-2.5 text-gray-700"*/}
                {/*                onClick={() => setMobileMenuOpen(false)}*/}
                {/*            >*/}
                {/*                <span className="sr-only">Close menu</span>*/}
                {/*                <XMarkIcon className="h-6 w-6" aria-hidden="true" />*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*        <div className="mt-6 flow-root">*/}
                {/*            <div className="-my-6 divide-y divide-gray-500/10">*/}
                {/*                <div className="space-y-2 py-6">*/}
                {/*                    <Disclosure as="div" className="-mx-3">*/}
                {/*                        {({ open }) => (*/}
                {/*                            <>*/}
                {/*                                <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">*/}
                {/*                                    Product*/}
                {/*                                    <ChevronDownIcon*/}
                {/*                                        className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}*/}
                {/*                                        aria-hidden="true"*/}
                {/*                                    />*/}
                {/*                                </Disclosure.Button>*/}
                {/*                                <Disclosure.Panel className="mt-2 space-y-2">*/}
                {/*                                    {[...products, ...callsToAction].map((item) => (*/}
                {/*                                        <Disclosure.Button*/}
                {/*                                            key={item.name}*/}
                {/*                                            as="a"*/}
                {/*                                            href={item.href}*/}
                {/*                                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
                {/*                                        >*/}
                {/*                                            {item.name}*/}
                {/*                                        </Disclosure.Button>*/}
                {/*                                    ))}*/}
                {/*                                </Disclosure.Panel>*/}
                {/*                            </>*/}
                {/*                        )}*/}
                {/*                    </Disclosure>*/}
                {/*                    <a*/}
                {/*                        href="#"*/}
                {/*                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
                {/*                    >*/}
                {/*                        Features*/}
                {/*                    </a>*/}
                {/*                    <a*/}
                {/*                        href="#"*/}
                {/*                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
                {/*                    >*/}
                {/*                        Marketplace*/}
                {/*                    </a>*/}
                {/*                    <a*/}
                {/*                        href="#"*/}
                {/*                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
                {/*                    >*/}
                {/*                        Company*/}
                {/*                    </a>*/}
                {/*                </div>*/}
                {/*                <div className="py-6">*/}
                {/*                    <a*/}
                {/*                        href="#"*/}
                {/*                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
                {/*                    >*/}
                {/*                        Log in*/}
                {/*                    </a>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </Dialog.Panel>*/}
                {/*</Dialog>*/}
            </header>
        </div>
    )
}