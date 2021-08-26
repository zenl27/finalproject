export const getPage = () => {
    const search = new URLSearchParams(window.location.search)
    if (!search.get('_page')) {
        return 1
    }
    return search.get('_page')

}