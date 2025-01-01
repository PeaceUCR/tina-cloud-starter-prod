import {gql} from '@apollo/client';

export const ADD_VISITOR = gql`
    mutation AddVisitor {
        addVisitor {
            success
        }
    }
`;
