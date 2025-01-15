// Дії для фільтрації, сортування та пагінації
export const SET_PRODUCTS = 'SET_PRODUCTS'
export const SET_SORT = 'SET_SORT'
export const SET_FILTER = 'SET_FILTER'
export const SET_PAGE = 'SET_PAGE'
export const TOGGLE_BASKET = 'TOGGLE_BASKET'

export interface SetProductsAction {
    type: typeof SET_PRODUCTS
    products: any[]
}

export interface SetSortAction {
    type: typeof SET_SORT
    sort: string
    order: string
}

export interface SetFilterAction {
    type: typeof SET_FILTER
    filter: {
        name?: string
        minPrice?: number
        maxPrice?: number
    }
}

export interface SetPageAction {
    type: typeof SET_PAGE
    page: number
}

export interface ToggleBasketAction {
    type: typeof TOGGLE_BASKET
}

export type AppActions =
    | SetProductsAction
    | SetSortAction
    | SetFilterAction
    | SetPageAction
    | ToggleBasketAction

// Дії
export const setProducts = (products: any[]): SetProductsAction => ({
    type: SET_PRODUCTS,
    products,
})

export const setSort = (sort: string, order: string): SetSortAction => ({
    type: SET_SORT,
    sort,
    order,
})

export const setFilter = (filter: {
    name?: string
    minPrice?: number
    maxPrice?: number
}): SetFilterAction => ({
    type: SET_FILTER,
    filter,
})

export const setPage = (page: number): SetPageAction => ({
    type: SET_PAGE,
    page,
})

export const toggleBasket = (): ToggleBasketAction => ({
    type: TOGGLE_BASKET,
})
