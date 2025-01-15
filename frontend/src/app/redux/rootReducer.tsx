import { AppActions } from './actions'

// Опис стейту для продуктів та кошика
export interface ProductState {
    products: any[]
    sort: string
    order: string
    filter: {
        name?: string
        minPrice?: number
        maxPrice?: number
    }
    page: number
}

export interface BasketState {
    isOpen: boolean
}

export interface RootState {
    products: ProductState
    basket: BasketState
}

const initialProductState: ProductState = {
    products: [],
    sort: 'name',
    order: 'ASC',
    filter: {},
    page: 1,
}

const initialBasketState: BasketState = {
    isOpen: false,
}

// Редюсер
const rootReducer = (
    state: RootState = {
        products: initialProductState,
        basket: initialBasketState,
    },
    action: AppActions
): RootState => {
    switch (action.type) {
        // Продукти
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: {
                    ...state.products,
                    products: action.products,
                },
            }
        case 'SET_SORT':
            return {
                ...state,
                products: {
                    ...state.products,
                    sort: action.sort,
                    order: action.order,
                },
            }
        case 'SET_FILTER':
            return {
                ...state,
                products: {
                    ...state.products,
                    filter: action.filter,
                },
            }
        case 'SET_PAGE':
            return {
                ...state,
                products: {
                    ...state.products,
                    page: action.page,
                },
            }
        // Кошик
        case 'TOGGLE_BASKET':
            return {
                ...state,
                basket: {
                    isOpen: !state.basket.isOpen,
                },
            }
        default:
            return state
    }
}

export default rootReducer
