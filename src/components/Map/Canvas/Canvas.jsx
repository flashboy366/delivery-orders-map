import { TileLayer, useMap } from "react-leaflet"


export const Canvas = (props) => {

    let map = useMap()

    // observer for fitting route on map resize
    const invalidateMapSize = (selectedOrder, routePoints) => {
        map.invalidateSize()
        if (selectedOrder !== null) map.fitBounds(routePoints)
    }
    props.fitMapSubscribe(invalidateMapSize)
    

    return(
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    )
}