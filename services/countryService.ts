import axios from 'axios'
import { Country } from '../models/countries'
import { arrayUtils } from '../utils'

const APIEndpoint = 'https://restcountries.eu/rest/v2'
const selectedFields = 'name;alpha2Code;capital;region;population'

export const getCountries = async (): Promise<Country[]> => {
  const response = await axios.get<Country[]>(`${APIEndpoint}/all?fields=${selectedFields}`)
  return arrayUtils.shuffle(response.data)
}

export const getEUCountries = async (): Promise<Country[]> => {
  const response = await axios.get<Country[]>(`${APIEndpoint}/regionalbloc/eu?fields=${selectedFields}`)
  return arrayUtils.shuffle(response.data)
}

export const getCountryByName = async (name: string): Promise<Country[]> => {
  const response = await axios.get<Country[]>(`${APIEndpoint}/name/${name}?fields=${selectedFields}`)

  return response.data
}
