import * as react from "react";

/******************************************
 * Simple input manager.
 * @param {string} name
 * @returns {object}
 *   {string} value
 *   {function} onChange
 *   {name} name
 */

const useInput = (name, defaultValue) => {
  const [value, setValue] = react.useState(defaultValue);

  const onChange = ({ target: { value } }) => setValue(value);
  return { value, onChange, name };
};

export default useInput;
