// @flow
const HACKER_NEWS_STORE: 'HACKER_NEWS_STORE' = 'HACKER_NEWS_STORE'

export const getCookieByKey = (cookie: string) => {
    const data = cookie.split('; ').find(row => row.startsWith(HACKER_NEWS_STORE))
    return data ? data.split('=')[1] : ''
}

export const setStorageData = (updatedData: Object) => {
    document.cookie = `${HACKER_NEWS_STORE}=${JSON.stringify(updatedData)}`
}
export const getStorageData = (): Object => {
    try {
        return JSON.parse(getCookieByKey(document.cookie)) || {}
    } catch {
        return {}
    }
}

export const updateVote = (id: string, points: number) => {
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

export const hideItem = (id: string) => {
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
