/* eslint-disable @typescript-eslint/naming-convention */
import {gql} from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const Get_Fit_And_Care = gql`
  query GetFitAndCare($input: GetFitAndCareInput!) {
    getFitAndCare(input: $input) {
      id
      text
    }
  }
`;
