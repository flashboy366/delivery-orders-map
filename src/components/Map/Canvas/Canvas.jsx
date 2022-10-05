import { TileLayer, useMap } from "react-leaflet"



export const Canvas = (props) => {
    let map = useMap()

    // resizing map and fitting route
    const updateMap = (selectedOrder, routeCoords) => {
        map.invalidateSize()
        if (selectedOrder !== null) map.fitBounds(routeCoords)
    }
    props.updateMapSubscribe(updateMap)
    

    return(
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    )
}