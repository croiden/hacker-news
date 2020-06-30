// @flow

import { useEffect } from 'react'
export default (callback: Function) => {
    useEffect(() => {
        // timeoutId for debounce mechanism
        let timeoutId = null
        const resizeListener = () => {
            // prevent execution of previous setTimeout
            clearTimeout(timeoutId)
            // invoke callback after 150 milliseconds
            timeoutId = setTimeout(() => callback(), 150)
        }
        // set resize listener
        window.addEventListener('resize', resizeListener)

        // clean up function
        return () => {
            // remove resize listener
            window.removeEventListener('resize', resizeListener)
        }
    }, [callback])
}
