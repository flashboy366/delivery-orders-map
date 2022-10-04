import L from 'leaflet'

let renderTree = () => { }

export const subscribe = (observer) => renderTree = observer

let state = {
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
    },
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
            [54.515, -1],
        ]
    }
}

const updateCurrentRoute = (orderID) => {
    let loadPointID = state.orders.orderData[orderID].loadPointID
    let unloadPointID = state.orders.orderData[orderID].unloadPointID

    state.orders.currentRoute = [
        new L.LatLng(
            state.pointsList.loadPoints[loadPointID][0],
            state.pointsList.loadPoints[loadPointID][1],
        ),
        new L.LatLng(
            state.pointsList.unloadPoints[unloadPointID][0],
            state.pointsList.unloadPoints[unloadPointID][1],
        ),
    ]
}

// handle item select
export const changeSelectedOrder = (newSelectedOrderID) => {
    console.log(newSelectedOrderID)
    state.orders.selectedOrder = newSelectedOrderID
    if(newSelectedOrderID !== null) updateCurrentRoute(newSelectedOrderID)
    renderTree(state)
}

export const changePoint = (orderID, pointType, newPointID) => {
    if (pointType === 'load')
        state.orders.orderData[orderID].loadPointID = newPointID
    else
        state.orders.orderData[orderID].unloadPointID = newPointID
    updateCurrentRoute(orderID)
    renderTree(state)
}

export default state