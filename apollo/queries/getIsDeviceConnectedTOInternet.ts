import {gql} from '@apollo/client';

export const GET_IS_DEVICE_CONNECTED_TO_INTERNET = gql`
    query getIsDeviceConnectedTOInternet {
        getIsDeviceConnectedToInternet @client
    }
`;
