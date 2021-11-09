export const pageview = (url) => {
    if (window && window.gtag) {
        window.gtag('config', 'G-38WZF6734L', {
            page_path: url,
        })
    }
}

export const event = ({ action, params }) => {
    window.gtag('event', action, params)
}