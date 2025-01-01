import {ApolloClient, ApolloLink, HttpLink} from '@apollo/client';
import {createSubscriptionHandshakeLink} from 'aws-appsync-subscription-link';
import {UrlInfo} from 'aws-appsync-subscription-link/lib/types';
import {BS_API_ENDPOINT, BS_API_KEY, GOOGLE_TENENT_ID, SSR_TOKEN} from '../constants';

import {getHeaders} from '../utils/firebase'

import {cache} from './cache';
const httpLink = new HttpLink({
    uri: BS_API_ENDPOINT,
    headers: {
        storeId: GOOGLE_TENENT_ID,
    },
});

const getSsrHeaders = () => {
    return {
        'x-api-key': BS_API_KEY,
        ssrauthorization: SSR_TOKEN,
        authorization: SSR_TOKEN,
        bschannel: 'WEB_STORE'
    }
};

const shouldApplySsrHeader = (operation) => {
    return operation === 'GetProduct'
        || operation === 'GetProductCollections'
        || operation === 'onGetProductCollections'
        || operation === 'GetAllProduct'
        || operation === 'GET_SHOWS'
        || operation === 'GetFeaturedProducts'
        || operation === 'GetStoreTheme'
}

// @ts-ignore
const authLink = new ApolloLink(async (operation, forward) => {
    let headers;
    if (shouldApplySsrHeader(operation.operationName)) {
        headers = getSsrHeaders();
    } else {
        headers = await getHeaders();
    }
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
    httpLink,
    // TODO createSubscriptionHandshakeLink NOT working, throw ReferenceError: global is not defined
    // createSubscriptionHandshakeLink({url: BS_API_ENDPOINT, auth, region: 'ap-south-1'}, httpLink),
]);

export const client = new ApolloClient({
    cache,
    link,
});
