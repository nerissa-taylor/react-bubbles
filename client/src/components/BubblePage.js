import React, { useState, useEffect } from "react";
import axiosWithAuth from './axiosWithAuth';
import axios from 'axios';
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property



  useEffect(() => {
    axiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then(res => {
        setColorList({ data })
          .catch(err => console.log(err))
      }, []);



    return (
      <div className="colors-wrap">
        <p>colors</p>
        <ul>
          {colors.map(color => (
            <li key={color.color} onClick={() => colorList(color)}>
              <span>
                <span className="add" onClick={() => colorList(color)}>
                  +
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
        <ColorList colors={colorList} updateColors={setColorList} />
        <Bubbles colors={colorList} />

      </div>

    )


  },



}

export default BubblePage;
