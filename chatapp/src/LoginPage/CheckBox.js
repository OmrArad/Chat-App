import React from "react";

function CheckBox({ title, id, defaultChecked }) {
    return (
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id={id} defaultChecked={defaultChecked}></input>
            <label className="form-check-label" htmlFor="flexCheckChecked">
                {title}
            </label>
        </div>
    );
}

export default CheckBox;