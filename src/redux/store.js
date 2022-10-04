import { ordersReducer } from "./ordersReducer"

let store = {
    // state
    _state: {
        orders: {
            orderData: [
                {
                    title: 'Order 1',
                    loadPointID: 0,
                    unloadPointID: 0,
                },
                {
                    title: 'Order 2',
                    loadPointID: 1,
                    unloadPointID: 1,
                },
                {
                    title: 'Order 3',
                    loadPointID: 2,
                    unloadPointID: 2,
                },
                {
                    title: 'Order 4',
                    loadPointID: 3,
                    unloadPointID: 3,
                },
            ],
            selectedOrder: null,
            currentRoute: [],
            pointsList: {
                loadPoints: [
                    [51.505, -0.09],
                    [52.505, -0.07],
                    [53.505, -0.03],
                    [54.505, -1.09],
                ],
                unloadPoints: [
                    [51.515, -0.05],
                    [52.515, -0.07],
                    [53.515, -0.04],
                    [54.515, -1.00],
                ]
            },
        },
    },
    getState() {
        return this._state
    },

    // subscriber for rerendering app
    _renderTree() { },
    subscribe(observer) {this._renderTree = observer},

    dispatch(action) {
        this._state.orders = ordersReducer(this._state.orders, action)
        this._renderTree(this._state)
    },
}

export default store