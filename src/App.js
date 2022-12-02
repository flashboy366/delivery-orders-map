import s from './App.module.scss'
import 'antd/dist/antd.min.css'
import 'leaflet/dist/leaflet.css'

import {Map} from "./components/Map/Map"
import {OrderList} from "./components/OrderList/OrderList"
import Split from 'react-split'
import L from 'leaflet'
import {BrowserRouter} from "react-router-dom";


export const App = (props) => {
    let appState = props.appState

    // convert lat/long points to leaflet coord objects
    const routeToCoords = (route) => {
        return route.map(point => {
            return new L.latLng(point[0], point[1])
        })
    }

    // map resize and route fitting
    let updateMap = () => {
    }
    const updateMapSubscribe = (observer) => updateMap = observer
    const onDragEnd = () => {
        let selectedOrder = appState.orders.selectedOrder
        let currentCoords = routeToCoords(appState.orders.currentRoute)

        updateMap(
            selectedOrder,
            currentCoords,
        )
    }

    return (
        <BrowserRouter basename={'delivery-map-orders'}>
            <div
                className={s.app}
            >
                <Split
                    className={s.split}
                    sizes={[25, 75]}
                    onDragEnd={onDragEnd}
                >
                    <OrderList
                        orders={appState.orders}
                        dispatch={props.dispatch}
                    />
                    <Map
                        currentRoute={appState.orders.currentRoute}
                        updateMapSubscribe={updateMapSubscribe}
                    />
                </Split>
            </div>
        </BrowserRouter>
    );
}
