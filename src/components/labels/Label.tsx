import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  grey,
  red,
  blue,
  teal,
  pink,
  lightBlue,
  yellow,
  orange,
  green
} from "@material-ui/core/colors";
export interface LabelProps {
  bgColor?: string;
  color?: string;
  value: string;
  li?: boolean;
  onClick?: (e: any) => void;
  deletable?: boolean;
  new?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      fontSize: "1rem",
      width: "100%",
      height: "2rem",
      boxShadow: "none",
      marginRight: "0.5rem"
    },
    li: {
      padding: "1rem",
      margin: "2px",
      width: "7rem",
      display: 'inline-flex',
      alignItems: 'center'
    }
  })
);

export default function Label(props: LabelProps) {
  const { bgColor, li, color, value, onClick } = props;
  const classes = useStyles();
  const cls = clsx(classes.li, classes.button, "cursor","inline-flex", "items-center")
  return li ? (
    <li
      style={{ backgroundColor: bgColor, color }}
      className={cls}
      onClick={(e: any) => onClick && onClick(e)}
    >
      {value}
    </li>
  ) : (
    <div
      style={{ backgroundColor: bgColor, color }}
      className={classes.button}
      onClick={(e: any) => onClick && onClick(e)}
    >
      {value}
    </div>
  );
}

Label.defaultProps = {
  bgColor: grey[300],
  color: "#000"
};