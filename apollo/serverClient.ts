import {ApolloClient, ApolloLink, HttpLink} from '@apollo/client';
import {createSubscriptionHandshakeLink} from 'aws-appsync-subscription-link';
import {UrlInfo} from 'aws-appsync-subscription-link/lib/types';
import {BS_API_ENDPOINT, BS_API_KEY, GOOGLE_TENENT_ID, SSR_TOKEN} from '../constants';
import {
    NextSSRInMemoryCache,
    NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

import {cache} from './cache';
const httpLink = new HttpLink({
    uri: BS_API_ENDPOINT,
    headers: {
        storeId: GOOGLE_TENENT_ID,
    },
});

export const getSsrHeaders = () => {
    return {
        'x-api-key': BS_API_KEY,
        ssrauthorization: SSR_TOKEN,
        authorization: SSR_TOKEN,
        bschannel: 'WEB_STORE'
    }
};

// @ts-ignore
const authLink = new ApolloLink(async (operation, forward) => {
    const headers = getSsrHeaders();
    operation.setContext({
        headers,
    });
    console.log(operation.operationName, operation.variables.input);
    return forward(operation);
});

const auth: UrlInfo['auth'] = {
    type: 'API_KEY',
    apiKey: BS_API_KEY,
};

const link = ApolloLink.from([
    authLink,
    createSubscriptionHandshakeLink({url: BS_API_ENDPOINT, auth, region: 'ap-south-1'}, httpLink),
]);

export const { getClient } = registerApolloClient(() => {
    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link,
    });
});