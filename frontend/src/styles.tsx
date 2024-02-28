import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OutlinedInput, TextField } from "@mui/material";
import styled from "styled-components";

//ABSTRACTED COMPONENTS
interface Margin {
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
}

interface Size {
  height?: string;
  width?: string;
}

interface Overflow {
  overflow?: string;
}

// COMPONENTS
interface FlexAtributes extends Margin, Size, Overflow {
  direction?: string;
  wrap?: string;
  justifyContent?: string;
  backgroundColor?: string;
  card?: boolean;
  dark?: boolean;
}

interface TextProps extends Margin {
  fontSize?: string;
  color?: string;
  height?: string;
  width?: string;
  textAlign?: string;
}

interface TextFieldProps extends Margin, Size {}

export const DisplayFlex = styled.div<FlexAtributes>`
  display: flex;
  ${(props) =>
    props.direction && `flex-direction: ${props.direction}!important;`}
  ${(props) => props.wrap && `flex-wrap: ${props.wrap}!important;`}
    ${(props) =>
    props.justifyContent &&
    `justify-content: ${props.justifyContent}!important;`}
    ${(props) => props.height && `height: ${props.height}!important;`}
    ${(props) => props.width && `width: ${props.width}!important;`}
    /* Margin */
    ${(props) => props.marginTop && `margin-top: ${props.marginTop}!important;`}
    ${(props) =>
    props.marginBottom && `margin-bottom: ${props.marginBottom}!important;`}
    ${(props) =>
    props.marginLeft && `margin-left: ${props.marginLeft}!important;`}
    ${(props) =>
    props.marginRight && `margin-right: ${props.marginRight}!important;`}

    ${(props) => props.overflow && `overflow: ${props.overflow}!important;`}
    ${(props) =>
    props.backgroundColor && `background-color: ${props.backgroundColor};`}
    
    ${(props) =>
    props.card &&
    `
        background-color: #fff;
        box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.20);
    `}

    ${(props) =>
    props.dark &&
    `
        background-color: rgb(35 35 35)!important;
        color: #fff!important;
    `}
`;

export const IconFA = styled(FontAwesomeIcon)<TextProps>`
  ${(props) => props.fontSize && `font-size: ${props.fontSize}!important;`}
  ${(props) => props.color && `color: ${props.color}!important;`}
    ${(props) => props.height && `height: ${props.height}!important;`}
    ${(props) => props.width && `width: ${props.width}!important;`}
    ${(props) => props.textAlign && `text-align: ${props.textAlign}!important;`}
    /* Margin */
    ${(props) => props.marginTop && `margin-top: ${props.marginTop}!important;`}
    ${(props) =>
    props.marginBottom && `margin-bottom: ${props.marginBottom}!important;`}
    ${(props) =>
    props.marginLeft && `margin-left: ${props.marginLeft}!important;`}
    ${(props) =>
    props.marginRight && `margin-right: ${props.marginRight}!important;`}
    ${(props) => props.margin && `margin: ${props.margin};`}
`;

export const Text = styled.p<TextProps>`
  ${(props) => props.fontSize && `font-size: ${props.fontSize}!important;`}
  ${(props) => props.color && `color: ${props.color}!important;`}
    ${(props) => props.height && `height: ${props.height}!important;`}
    ${(props) => props.width && `width: ${props.width}!important;`}
    ${(props) => props.textAlign && `text-align: ${props.textAlign}!important;`}
    /* Margin */
    ${(props) => props.marginTop && `margin-top: ${props.marginTop}!important;`}
    ${(props) =>
    props.marginBottom && `margin-bottom: ${props.marginBottom}!important;`}
    ${(props) =>
    props.marginLeft && `margin-left: ${props.marginLeft}!important;`}
    ${(props) =>
    props.marginRight && `margin-right: ${props.marginRight}!important;`}
    ${(props) => props.margin && `margin: ${props.margin};`}
`;

export const Image = styled.img<FlexAtributes>`
  ${(props) => props.height && `height: ${props.height}!important;`}
  ${(props) => props.width && `width: ${props.width}!important;`}
    /* Margin */
    ${(props) => props.marginTop && `margin-top: ${props.marginTop}!important;`}
    ${(props) =>
    props.marginBottom && `margin-bottom: ${props.marginBottom}!important;`}
    ${(props) =>
    props.marginLeft && `margin-left: ${props.marginLeft}!important;`}
    ${(props) =>
    props.marginRight && `margin-right: ${props.marginRight}!important;`}
    ${(props) => props.margin && `margin: ${props.margin};`}
`;

export const TextFieldStyled = styled(TextField)<TextFieldProps>`
  /* Margin */
  ${(props) => props.marginTop && `margin-top: ${props.marginTop}!important;`}
  ${(props) =>
    props.marginBottom && `margin-bottom: ${props.marginBottom}!important;`}
    ${(props) =>
    props.marginLeft && `margin-left: ${props.marginLeft}!important;`}
    ${(props) =>
    props.marginRight && `margin-right: ${props.marginRight}!important;`}
    ${(props) => props.margin && `margin: ${props.margin};`}
    /* Size */
    ${(props) => props.height && `height: ${props.height}!important;`}
    ${(props) => props.width && `width: ${props.width}!important;`}
`;

export const OutlinedFieldStyled = styled(OutlinedInput)<TextFieldProps>`
  /* Margin */
  ${(props) => props.marginTop && `margin-top: ${props.marginTop}!important;`}
  ${(props) =>
    props.marginBottom && `margin-bottom: ${props.marginBottom}!important;`}
    ${(props) =>
    props.marginLeft && `margin-left: ${props.marginLeft}!important;`}
    ${(props) =>
    props.marginRight && `margin-right: ${props.marginRight}!important;`}
    ${(props) => props.margin && `margin: ${props.margin};`}
    /* Size */
    ${(props) => props.height && `height: ${props.height}!important;`}
    ${(props) => props.width && `width: ${props.width}!important;`}
`;

export const AppContainer = styled.div`
  font-family: "Roboto";
`;
