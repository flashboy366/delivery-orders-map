import { TileLayer, useMap } from "react-leaflet"


export const Canvas = (props) => {
    let map = useMap()

    // observer for resizing map and fitting route
    const fitMap = (selectedOrder, routeCoords) => {
        map.invalidateSize()
        if (selectedOrder !== null) map.fitBounds(routeCoords)
    }
    props.fitMapSubscribe(fitMap)
    

    return(
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    )
}