export type Favorite = {
  id?: string;
  name: string;
  created_at: string
}

export type User = {
  id?: string
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
  created_at: string
  updated_at: string
}

export type Certificate = {
  id?: string
  year: string
  name: string
  created_at: string
  updated_at: string
}

export type Skill = {
  id?: number
  name: string
  score: number
  image: string
  created_at: string
  updated_at: string
}

export type Description = {
  id?: number
  name: string
  created_at: string
}

export type Project = {
  id?: number
  name: string
  start_time: string
  end_time: string
  descriptions: Description[]
  created_at: string
  updated_at: string
}

export type Achievement = {
  id?: number
  name: string
  description: string
  created_at: string
}

export type School = {
  id?: number
  name: string
  start_time: string
  end_time: string
  achievements: Achievement[]
  created_at: string
  updated_at: string
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
