import { FetchParams } from '../services/movieService';

export const defaultFetchParams: Omit<FetchParams, 'query'> = {
  page: 1,
  include_adult: false,
  language: 'en-US'
};