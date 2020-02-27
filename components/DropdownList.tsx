import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";

export type SelectItem = { id: number; name: string };
class DropdownList extends React.Component<
  {
    value: SelectItem | null;
    title: string;
    data: SelectItem[];
    onChange: (value: SelectItem) => void;
  },
  {}
> {
  render() {
    let { value } = this.props;
    return (
      <UncontrolledDropdown>
        <DropdownToggle caret>
          {value === null ? "Seleccionar" : value.name}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>{this.props.title}</DropdownItem>
          {this.props.data.map((x, idx) => (
            <DropdownItem
              key={idx}
              onClick={() =>
                (value == null || value.id !== x.id) && this.props.onChange(x)
              }
            >
              {x.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}
export default DropdownList;
