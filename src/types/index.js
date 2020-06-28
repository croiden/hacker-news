// @flow
import { type ComponentType } from 'react'

export type ThemeType = ComponentType<{}>

export type StoreType = {
    page: number,
    totalPages: number,
    items: Object,
}
