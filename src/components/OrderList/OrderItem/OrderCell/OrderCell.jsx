import s from './OrderCell.module.scss'
import { Select } from 'antd'
import { changePointActionCreator } from '../../../../redux/ordersReducer'

export const OrderCell = (props) => {

    // converting point to readable string format
    const stringifyPoint = (point) => {
        return `${point[0].toFixed(2)}, ${point[1].toFixed(2)}`
    }

    // rendering title cell
    if (props.type === 'title')
        return(
            <div className={`${s.column} ${s.titleCell}`}>
                <span className={s.title}>
                    {props.title}
                </span>
            </div>
        )
    // rendering point cell
    else {
        // defining current point value
        //and list of points for select options
        let pointsList
        let currentPoint
        if (props.type === 'load'){
            pointsList = props.pointsList.loadPoints
            currentPoint = pointsList[props.pointID]
        }
        else {
            pointsList = props.pointsList.unloadPoints
            currentPoint = pointsList[props.pointID]
        }

        // handling option selection
        const changePoint = (name, newPointID) => {
            props.dispatch(changePointActionCreator(
                props.orderID,
                props.type,
                newPointID,
            ))
        }

        return(
            <div className={`${s.column} ${s.pointCell}`}>
                <Select
                    value={stringifyPoint(currentPoint)}
                    className={s.select}
                    onChange={value => changePoint("point", value)}
                >
                    {
                        (() => {
                            // rendering select options
                            let optionsJSX = []
                            for (let i = 0; i < pointsList.length; i++){
                                let className = `${s.selectOption}`
                                if (pointsList[i] === currentPoint)
                                    className += ` ${s.selected}`
                                optionsJSX.push(
                                    <Select.Option
                                        className={className}
                                        value={i}
                                        key={i}
                                    >
                                        {stringifyPoint(pointsList[i])}
                                    </Select.Option>
                                )
                            }
                            return optionsJSX
                        })()
                    }
                </Select>
            </div>
        )
    }
}