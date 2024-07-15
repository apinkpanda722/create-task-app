import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css.ts";

export const container = style({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    rowGap: 15,
    minHeight: "max-content",
    padding: vars.spacing.big2,
    backgroundColor: vars.color.mainDarker
})

export const title = style({
    color: vars.color.brightText,
    fontSize: vars.fontSizing.T2,
    marginRight: vars.spacing.big1,
})

export const addButton = style({
    color: vars.color.brightText,
    fontSize: vars.fontSizing.T2,
    cursor: "pointer",
    marginLeft: vars.spacing.big1,
    ":hover": {
        opacity: 0.8,
    }
})

export const boardItem = style({
    
})

export const boardItemActive = style({

})

export const addSection = style({

})

export const smallTitle = style({

})