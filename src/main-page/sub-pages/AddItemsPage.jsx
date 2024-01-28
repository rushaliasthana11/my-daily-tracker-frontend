import React, { useEffect, useState , ReactDOM} from "react";
import Dropdown from "../components/Dropdown";

function AddItemsPage() {

    useEffect(() => {
        const fetchOnLoadAddItem = async() => {
            try {
            const response = await fetch("http://localhost:8080/daily-tracker/getAddItemOnLoadData");
            const loadData = await response.json();
            setItemCategory(loadData.categories);
            setTimeOfDay(loadData.timeOfDays);
            setDropDownValue(loadData.categories[0]);
            }catch(e) {
                console.log(e);
            }
        }
        fetchOnLoadAddItem();
    }, []);

    const [itemCategory, setItemCategory] = useState([]);
    const [timeOfDay, setTimeOfDay] = useState([]);
    const [dropdownValue, setDropDownValue] = useState("");
    const [timeOfDaysSelected, settimeOfDaysSelected] = useState([]);


    const handleTimeOfDaySelected = (event) => {
        const checkBoxSelectedVal = event.target.value;
        if(event.target.checked) {
            settimeOfDaysSelected([...timeOfDaysSelected, checkBoxSelectedVal]);
        } else{
            settimeOfDaysSelected(timeOfDaysSelected.filter((itemSelected)=> itemSelected !== checkBoxSelectedVal));
        }
    }

    const addItem = async(event) => {
        event.preventDefault();
        const itemName =   event.target.itemName.value;
        const priority =  event.target.priority.value;
        const category = dropdownValue;
        const timeOfDays = timeOfDaysSelected;
        const data = {
            "itemName" : itemName,
            "timeOfDay" : timeOfDays,
            "priority" : priority,
            "category" :  category
        };
        try {
        const response = await fetch('http://localhost:8080/daily-tracker/addUpdateItem', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const responseData = await response.json();
          if(responseData.success === true)
          {
            alert("Item Added Successfully");
          } else {
            alert("Item Not Added");
          }
        } catch(e) {
            alert("Exception:" + e);
        }
        window.location.reload(false);
    }

    return <div className="row">
            <div className="col-4"></div>
            <div className="col-4 bg-light rounded-10 add-item-box">
            <h3>Add Item</h3>
            <form className="text-left" onSubmit={addItem}>
                <p>Item Name:</p>
                <input type="text" name="itemName" className="form-control" placeholder="Enter Item Name"></input>
                <p>Item Type:</p>
                <Dropdown name="itemCategories" buttonname="Item Categories" item= {itemCategory} buttonId="itemCategoryDropdown" dropDownValFunc={setDropDownValue} />
                <p>Priority:</p>
                <input type="number"  name="priority" className="form-control" placeholder="Enter Priority"></input>
                <p>Time of Day:</p>
                {timeOfDay.map((item, index) =>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id={"inlineCheckbox" + index} onChange={handleTimeOfDaySelected} value={item} />
                    <label class="form-check-label" for={"inlineCheckbox"+index}>{item}</label>
                </div>
                )}
                <button type="submit" className="btn btn-primary">Add Item</button>
            </form>
            </div>
            <div className="col-4"></div>
        </div>

}

export default AddItemsPage;