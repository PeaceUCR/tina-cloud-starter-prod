/* eslint-disable @typescript-eslint/naming-convention */
import {gql} from '@apollo/client';

export const Get_Store_Theme = gql`
    query GetStoreTheme {
        getStoreTheme {
            id
            logoUrl
            primaryColor
            secondaryColor
        }
    }
`;