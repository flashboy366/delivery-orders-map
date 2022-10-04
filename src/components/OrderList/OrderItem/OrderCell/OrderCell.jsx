import s from './OrderCell.module.scss'
import { Select } from 'antd'
import { forwardRef } from 'react'

export const OrderCell = forwardRef((props, selectMenuRef) => {

    console.log('select menu ref', selectMenuRef)

    const stringifyPoint = (point) => {
        return `${point[0]}, ${point[1]}`
    }

    if (props.type === 'title')
        return(
            <div className={`${s.column} ${s.titleCell}`} ref={selectMenuRef}>
                <span className={s.title}>
                    {props.title}
                </span>
            </div>
        )
    else {
        let pointsList = null
        let currentPoint

        if (props.type === 'load'){
            pointsList = props.pointsList.loadPoints
            currentPoint = pointsList[props.pointID]
        }
        else {
            pointsList = props.pointsList.unloadPoints
            currentPoint = pointsList[props.pointID]
        }

        const onChange = (name, selectedPointID) => {
            props.changePoint(
                props.orderID,
                props.type,
                selectedPointID,
            )
        }

        const onOptionClick = () => {
            props.onOrderClick(props.orderID)
        }

        return(
            <div className={`${s.column} ${s.pointCell}`}>
                <Select
                    value={stringifyPoint(currentPoint)}
                    className={s.select}
                    onChange={value => onChange("point", value)}
                >
                    {
                        (() => {
                            let optionsJSX = []
                            for (let i = 0; i < pointsList.length; i++){
                                let className = ''
                                if (pointsList[i] === currentPoint)
                                    className = s.selectedOption
                                optionsJSX.push(
                                    <Select.Option
                                        className={className}
                                        value={i}
                                        ref={selectMenuRef}
                                        onClick={onOptionClick}
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
})