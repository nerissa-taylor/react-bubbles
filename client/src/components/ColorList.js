import React, { useState, useEffect } from "react";
import axios from "axios";


const initialColor = {
  color: "",
  code: { hex: "" }
};


function ColorList(props) {

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const { match, colors, MatchProfile } = props;


  useEffect(() => {

    const updateColors = colors.find(BubblePage => `${colors.id}` === props.colors.id
    );
    if (updateColors) {
      console.log(updateColors);
      setEditing(updateColors);
    }
  }, [props, colors]);

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
      .put(`${colors.id}`, colors)
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
      .delete('/colors/:id/1')
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

        this props.colors && colors.map(color => (
          <li key={colors.colors} onClick={() => editColor(colors)}>
          <span>Edit
            <span className="delete" onClick={() => deleteColor(colors)}>
              x
              </span>{" Delete"}
            {colors.colors}
          </span>

          <div className="color-box" styles={`{ backgroundColor: ${colors.color} }`}
          />Edit
        </li>
        )},}
      </ul>
      {
        editing && (
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
                value={colorToEdit.colors}
              />
            </label>
            <div className="button-row">
              <button type="submit">save</button>
              <button onClick={() => setEditing(false)}>cancel</button>
            </div>
          </form>
        )
      }
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div >
  );
}

export default ColorList;
