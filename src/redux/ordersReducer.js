const CHANGE_SELECTED_ORDER = 'CHANGE-SELECTED-ORDER'
const CHANGE_POINT = 'CHANGE-POINT'

let initialState = {
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
}

export const ordersReducer = (state = initialState, action) => {
    // update current route coordinates
    const _updateCurrentRoute = (orderID) => {
        if (orderID !== null) {
            let loadPointID = state.orderData[orderID].loadPointID
            let unloadPointID = state.orderData[orderID].unloadPointID

            state.currentRoute = [
                [
                    state.pointsList.loadPoints[loadPointID][0],
                    state.pointsList.loadPoints[loadPointID][1],
                ],
                [
                    state.pointsList.unloadPoints[unloadPointID][0],
                    state.pointsList.unloadPoints[unloadPointID][1],
                ],
            ]
        }
        else
            state.currentRoute = []
    }

    // handle item select
    switch(action.type) {
        case CHANGE_SELECTED_ORDER:
            let newID = action.newSelectedOrderID
            if(newID !== state.selectedOrder){
                state.selectedOrder = newID
                _updateCurrentRoute(newID)
            }
            break
        case CHANGE_POINT:
            let orderID = action.orderID
            let newPointID = action.newPointID
            if (action.pointType === 'load')
                state.orderData[orderID].loadPointID = newPointID
            else
                state.orderData[orderID].unloadPointID = newPointID
            _updateCurrentRoute(orderID)
            break
        // no default
    }

    return state
}

export const changeSelectedOrderActionCreator = (id) => ({
    type: CHANGE_SELECTED_ORDER,
    newSelectedOrderID: id
})

export const changePointActionCreator = (orderID, type, newPointID) => ({
    type: CHANGE_POINT,
    orderID: orderID,
    pointType: type,
    newPointID: newPointID,
})