import {useEffect} from "react"
import {showPresentation} from "../functions/showPresentation"
import {store} from "../store/store"

export function useMobileViewOnLoad() {
    useEffect(() => {
        if (window.innerWidth <= 1024 || window.innerHeight <= 768) {
            setTimeout(() => {
                showPresentation(store.getState())
                let closeBtn = document.getElementById('close-show-presentation')
                if (closeBtn) {
                    closeBtn.style.display = 'none'
                }
            }, 0)
        }
    }, [])
}
