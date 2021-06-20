import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import styled from "styled-components";

const BtnGroup = ({ callBackFunc, val }) => (
  <StyledBtnGroup size="small" aria-label="contained primary button group">
    <Button>Delete</Button>
    <Button>Update</Button>
    <Button>Add to group</Button>
  </StyledBtnGroup>
);

const StyledBtnGroup = styled(ButtonGroup)`
  button {
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    color: #fff;
    outline: none;
    font-size: 0.8rem;

    &:hover {
      background: linear-gradient(45deg, #ff8e53 30%, #fe6b8b 90%) !important;
      font-size: 0.8rem;
    }
  }
`;

export default BtnGroup;
