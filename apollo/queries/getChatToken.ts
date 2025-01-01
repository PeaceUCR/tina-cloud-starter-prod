import {gql} from '@apollo/client';

export const GET_CHAT_TOKEN = gql`
    query GET_CHAT_TOKEN {
        getChatToken {
            token
            sessionExpirationTime
            tokenExpirationTime
        }
    }
`;
