import axios from 'axios'
import { Country } from '../models/countries'

const APIEndpoint = 'https://restcountries.eu/rest/v2'
const selectedFields = 'name;alpha2code;capital;region;population'

export const getCountries = async (): Promise<Country[]> => {
  const response = await axios.get<Country[]>(`${APIEndpoint}/all?fields=${selectedFields}`)
  return response.data
}

export const getEUCountries = async (): Promise<Country[]> => {
  const response = await axios.get<Country[]>(`${APIEndpoint}/regionalbloc/eu?fields=${selectedFields}`)
  return response.data
}
