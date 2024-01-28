import React,{ReactDOM, useState} from "react";

function Dropdown(dropDownProp) {

    const handleSelect= (e) => {
        dropDownProp.dropDownValFunc(e.target.value);
    }

    return <select class="form-control" onChange={handleSelect}>
         {dropDownProp.item.map(DropdownItem)}
    </select>


    function DropdownItem(props) {
        return <option name="dropdownItem" value={props} href="#">{props}</option>
    }
    
}

export default Dropdown;