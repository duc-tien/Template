export function HandleData(arrayData, name) {
    const newArrayData = arrayData.map((change) => {
        if (change.value === 'TRUE') {
            return (
                {
                    value: 1,
                    timestamp: change.timestamp.slice(0, 19)
                }
            )
        }
        else if (change.value === 'FALSE') {
            return (
                {
                    value: 0,
                    timestamp: change.timestamp.slice(0, 19)
                }
            )
        }
        else if (name === "Micro820_Analog_1"){
            return(
                {
                    value: ((change.value * 10)/4013).toFixed(2),
                    timestamp: change.timestamp.slice(0,19)
                }
            )
        }
        else {

                return (
                    {
                        value: Number(change.value).toFixed(2),
                        timestamp: change.timestamp.slice(0, 19)
                    }
                )
            
        }

    })

    return ({ data: newArrayData.filter(item => item.value < 1000 && item.value > -1000), Tagname: name })
}

export function changeDomain(arrayData) {
    const newData = arrayData.map((pre) => {
            const listData = Number(pre.value)
            return listData
    })
    const filterData = newData.filter(item => item <1000)
    let xAxisInterval = Math.round(newData.length / 6);
    let maxValue = filterData.reduce((a, b) => Math.max(a, b), -Infinity);
    let minValue = filterData.reduce((a, b) => Math.min(a, b), Infinity)
    return({maxDot: maxValue, minDot: minValue})
}

