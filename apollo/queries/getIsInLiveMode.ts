import {gql} from '@apollo/client';

export const GET_IS_IN_LIVE_MODE = gql`
    query getIsInLiveMode {
        getIsInLiveMode @client
    }
`;
