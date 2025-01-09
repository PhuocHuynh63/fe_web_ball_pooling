import styled from "styled-components";
import { style } from "../../themes";

interface ButtonProps {
    padding?: string;
    margin?: string;
    height?: string;
    width?: string;
    color?: string;
    backgroundColor?: string;
    border_radius?: string;
    content?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    border?: string;
    fontWeight?: string;
    fontSize?: string;
    hover?: boolean;
}

export const Button = styled.button<ButtonProps>`
  text-align: center;
  padding: ${(props) => props.padding || "5px"};
  margin: ${(props) => props.margin || "5px"};
  height: ${(props) => props.height || "35px"};
  width: ${(props) => props.width || "80px"};
  color: ${(props) => props.color || "white"};
  background-color: ${(props) => props.backgroundColor || "#ed2a26"};
  border-radius: ${(props) => props.border_radius || "7px"};
  border: ${(props) => props.border || "none"};
  font-weight: ${(props) => props.fontWeight || "600"};
  font-size: ${(props) => props.fontSize};
  cursor: pointer;

  &:hover {
    transition: all 0.3s;
    background-color:  ${(props) => props.backgroundColor || style.colors.red.bg_hover};;
  }

  &:disabled {
    color: #a9a9a9;
    background-color: #d3d3d3;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: ${(props) =>
        props.width || "60px"}; // Adjust width for smaller screens
    height: ${(props) => props.height || "30px"};
    font-size: 14px; // Smaller font size for better fit
  }

  @media (max-width: 480px) {
    width: ${(props) => props.width || "50px"};
    height: ${(props) => props.height || "28px"};
    font-size: 12px;
    padding: 4px; // Less padding on very small screens
  }
`;
