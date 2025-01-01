// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {RefObject, useEffect, useRef} from 'react';
import {useQuery} from '@apollo/client';
import {getTokenAfterSignIn} from "../utils/firebase";
import {WEBSOCKET_URL} from "../constants";
import {Cart_Info} from "../apollo/queries/cartInfo";
import {emitCustomEvent} from "react-custom-events";
import {clearLocalCart} from "../utils/localCart";

export interface LiveActionHandlersRefs {
    openSelectProductVariant: (productId: number, variantId?: number | null) => void;
    openCart: () => void;
}
export interface ICommentProduct {
    isBuycomment?: boolean;
    hasProduct?: boolean;
    productId?: number;
    variantId?: number;
    hasVariant?: boolean;
    productName?: string;
    image?: string;
}

export const useLiveWebsocket = (isLive: boolean) => {
    const ws = useRef<WebSocket | null>(null);

    const {refetch: refetchCart} = useQuery(Cart_Info, {fetchPolicy: 'no-cache'});
    // const {data: prodSelData} = useQuery(GET_GLOBAL_MODAL);

    useEffect(() => {
        const intiateWS = async () => {
            const token = await getTokenAfterSignIn();
            // TODO this not working in web??
            // no option for header https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket
            ws.current = new WebSocket(`${WEBSOCKET_URL}?authorization=${token}`, []);
            ws.current.onopen = () => console.log('ws opened');
            ws.current.onclose = e => console.log('ws closed', {e});
            ws.current.onerror = e => {
                console.log('ws onerror', {e});
            };

            ws.current.onmessage = event => {
                const data = JSON.parse(event?.data);
                switch (data[0]?.type) {
                    case 'CART_DUMPED':
                        console.log('CART_DUMPED refetchCart');
                        clearLocalCart();
                        emitCustomEvent('dumpCart');
                        // TODO refetch cart working??
                        // isGlobalModalVar({
                        //     ...prodSelData.isGlobalModal,
                        //     refetchCartItems: true,
                        // });
                        break;

                    case 'BUY_PRODUCT_COMMENT':
                        const body: ICommentProduct = data[0]?.data;
                        console.log({body});
                        // if (body?.isBuycomment && body?.productId) {
                        //     liveActionHandlersRef?.current?.openSelectProductVariant(body?.productId, body?.variantId || null);
                        // }

                        break;

                    default:
                        break;
                }
            };
        };

        if (isLive) {
            intiateWS();
        }
        return () => {
            console.log('executed');
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [isLive, refetchCart]);

    return [ws];
};
