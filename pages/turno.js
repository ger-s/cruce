import faker from "faker";
import _ from "lodash";
import React from "react";
import { Dropdown } from "semantic-ui-react";
import Link from "next/link";

const addressDefinitions = faker.definitions.address;
const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
  key: addressDefinitions.state_abbr[index],
  text: state,
  value: addressDefinitions.state_abbr[index],
}));

function turno() {
  return (
    <div className="ui container"
    style={{
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
      marginTop: "10%",
      marginBottom: "24%",}}>
          <div>

        <h1 style={{marginBottom: "30%"}}>Sucursal</h1>
        <div>

       
      <Dropdown placeholder="Sucursal" search selection  options={stateOptions} />
    
    
        </div>
          </div>
    </div>
  );
}

export default turno;
