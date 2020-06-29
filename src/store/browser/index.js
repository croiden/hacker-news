// @flow
const HACKER_NEWS_STORE: 'HACKER_NEWS_STORE' = 'HACKER_NEWS_STORE'
const isStorageSupported = (): boolean => typeof Storage !== 'undefined'

export const setStorageData = (updatedData: Object) => {
    localStorage.setItem(HACKER_NEWS_STORE, JSON.stringify(updatedData))
}
export const getStorageData = (): Object => {
    if (isStorageSupported()) {
        return JSON.parse(localStorage.getItem(HACKER_NEWS_STORE) || '{}')
    }
}

export const updateVote = (id: string, points: number) => {
    if (isStorageSupported()) {
        const data = getStorageData()
        const updatedData = {
            ...data,
            [id]: {
                ...data[id],
                points,
            },
        }
        setStorageData(updatedData)
    }
}

export const hideItem = (id: string) => {
    if (isStorageSupported()) {
        const data = getStorageData()
        const updatedData = {
            ...data,
            [id]: {
                ...data[id],
                hidden: true,
            },
        }
        setStorageData(updatedData)
    }
}
