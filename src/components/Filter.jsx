import {Checkbox, Slider} from "@mui/material";


function Filter(x) {
    return(
        <div className="filter">
            <div className={"element label"}>{x.element}: </div>
            <div className={"element"}>
                <Checkbox
                    defaultChecked
                    onChange={x.changeChecked}/>
            </div>
            <Slider
                classes={{root: 'slider element'}}
                value={x.value}
                onChange={x.changeValue}
                step={x.step}
                valueLabelDisplay="auto"
                disabled={x.checked}
                min={x.min}
                max={x.max}
            />
        </div>
    )
}

export default Filter;