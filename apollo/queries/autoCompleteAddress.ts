/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const Auto_Complete_Address = gql`
    query onAutoComplete($input: AutoComplete!) {
        autoComplete(input: $input) {
            street_line
            secondary
            city
            state
            zipcode
            entries
        }
    }
`;
