export type Favorite = {
  id: string;
  name: string;
}

export type User = {
  id: string
  name: string
  birthday: string
  phone: string
  gender: string
  address: string
  email: string
  facebook: string
  job: string
  avatar: string
  favorites: Favorite[]
}

export type Certificate = {
  id: string
  year: string
  name: string
}

export type Skill = {
  id: number
  name: string
  score: number
  image: string
}

export type Description = {
  id: number
  name: string
}

export type Project = {
  id: number
  name: string
  start_time: string
  end_time: string
  descriptions: Description[]
}

export type Achievement = {
  id: number
  name: string
  description: string
}

export type School = {
  id: number
  name: string
  start_time: string
  end_time: string
  achievements: Achievement[]
}

export enum Align {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export interface Column {
  key: string
  title?: string
  class?: string
  align?: Align
  scopedSlots?: boolean
  headScopedSlots?: boolean
  isTime?: boolean
  isCurrency?: boolean
}
