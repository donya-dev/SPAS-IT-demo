import React from "react";
import "./searchANDfilter.css";

const Search = () => {
  return (
    <div>
      <table className="styled-table">
        <tbody>
          <tr>
            <td>
              <select className="dropdown">
                <option value="" disabled selected>
                  Year
                </option>
                <option>2023/24</option>
                <option>2022/23</option>
                <option>2021/22</option>
              </select>
            </td>
            <td>
              <select className="dropdown">
                <option value="" disabled selected>
                  Department
                </option>
                <option value="CS"></option>
                <option>GIS</option>
                <option>MMT</option>
              </select>
            </td>
            <td>
              <select className="dropdown">
                <option value="" disabled selected>
                  Type
                </option>
                <option>Web</option>
                <option>AI</option>
                <option>Mobile</option>
              </select>
            </td>
            <td>
              <button className="button-style-search">Search Now</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Search;
