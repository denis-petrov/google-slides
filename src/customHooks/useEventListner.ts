import {useEffect, useRef} from "react"

export function useEventListener(eventName: string, handler: any, element = window) {
    const savedHandler = useRef<any>()

    useEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(
        () => {
            const isSupported = element && element.addEventListener
            if (!isSupported) return

            const eventListener = (event: any) => {
                if (event !== undefined) {
                    savedHandler.current(event)
                }
            }

            element.addEventListener(eventName, eventListener)

            return () => {
                element.removeEventListener(eventName, eventListener)
            }
        },
        [eventName, element]
    )
}