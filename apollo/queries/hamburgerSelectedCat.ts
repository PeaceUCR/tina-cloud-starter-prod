/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const GET_SELECTED_COLLETION_IN_HAMBURGER = gql`
  query hamburgerSelectedCat {
    selectedHamburgerCollection @client
  }
`;
