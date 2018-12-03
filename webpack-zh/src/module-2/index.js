import { shuffle, keys } from 'lodash'
import { sample } from '../common'

export function logData(data) {
  return sample(shuffle(keys(data)))
}
