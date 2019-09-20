import React, { useState, useEffect } from "react";
import axios from "axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, match, params, props }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);


  useEffect(() => {
    const id = match.params.id;
    const updateColors = colors.find(color => `${colors.id}` === id);
    if (updateColors) {
      console.log(updateColors);
      setEditing(updateColors);
    }
  }, [match, colors]);

  const changeHandler = event => {
    event.persist();
    let value = event.target.value;
    if (event.target.name === 'colors') {
      value = (value);
    }

    setColorToEdit({
      ...colors,
      [event.target.name]: value
    });
  };


  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = event => {
    event.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axios
      .put(`http://localhost:5000/${params.colors.id}`, colors)
      .then(res => {
        props.colorToEdit(res.data);
        props.history.push(`/color-list/${colors.id}`);
        setColorToEdit(initialColor);
      })
      .catch(err => console.log(err.response));
  };





  const deleteColor = event => {
    // make a delete request to delete this color

    event.preventDefault();
    axios
      .delete(`http://localhost:5000/colors/${colors.id}`)
      .then(res => {
        props.colorToEdit(res.data);
        props.history.push('/color-list');
      })
      .catch(err => console.log(err.response));
  };


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
