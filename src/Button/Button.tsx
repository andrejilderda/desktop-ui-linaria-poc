import clsx from "clsx";
import { css } from "@linaria/core";
import { colors as colorTokens } from "./../tokens/windows/colors";

type FlattenedObjKeys<
  T extends Record<string, unknown>,
  Prefix extends string = "--dui-",
  Key = keyof T
> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ? `${Prefix}${Key}-${FlattenedObjKeys<T[Key], "">}`
    : `${Key}`
  : never;

type CSSVars = FlattenedObjKeys<
  (typeof colorTokens)["base"] & (typeof colorTokens)["light"]
>;
export const getVar = (key: CSSVars) => `var(${key})`;

// type ButtonVariants = RecipeVariant<typeof styles.buttonRecipe, 'variant'>;

export interface ButtonProps {
  children: string;
  variant?: "primary" | "accent";
  disabled?: boolean;
  onClick?: () => void;
  className?: string | string[];
}

const button = css`
  all: unset;
  cursor: default;
  font-family: "vars.typography.fonts.system";
  line-height: var(--line-height);
  padding: var(--padding);
  text-align: center;
  user-select: none;
  border-color: var(--border);
  background-color: var(--fill);
  color: var(--text);
  font-size: var(--font-size);
  outline-color: var(--focus-outline);

  &[disabled] {
    background-color: var(--fill-disabled, --fill);
    border-color: var(--border-disabled, --border);
    color: var(--text-disabled, --text);
  }

  &:not([disabled]) {
    box-shadow: inset 0px var(--elevation-y) 0px 0px var(--elevation-stroke),
      inset 0px 0px 0px 1px var(--stroke);
  }

  // hover
  &:hover:not([disabled]) {
    background-color: var(--fill-hover, --fill);
    color: var(--text-hover, --text);
  }

  // active
  &:active:not([disabled]) {
    background-color: var(--fill-active, --fill);
    color: var(--text-active, --text);
    box-shadow: inset 0px var(--elevation-y) 0px 0px
        var(--elevation-stroke-active, --elevation-stroke),
      inset 0px 0px 0px 1px var(--stroke-active, --stroke);
  }

  .windows & {
    --font-size: 14px;
    --elevation-y: -1px;
    --line-height: 20px;
    --padding: 6px 20px;
    border-radius: 4px;

    --stroke-disabled: transparent;
    --elevation-stroke-active: transparent;
    --focus-outline: ${getVar("--dui-stroke_color-focus_stroke-outer")};

    // fill
    --fill: ${getVar("--dui-fill_color-control-default")};
    --fill-hover: ${getVar("--dui-fill_color-control-secondary")};
    --fill-disabled: ${getVar("--dui-fill_color-accent-disabled")};
    --fill-active: ${getVar("--dui-fill_color-control-tertiary")};

    // stroke
    --stroke: ${getVar("--dui-stroke_color-control_stroke-default")};
    --stroke-active: ${getVar("--dui-stroke_color-control_stroke-default")};

    // elevationStroke
    --elevation-stroke: ${getVar(
      "--dui-stroke_color-control_stroke-secondary"
    )};

    // text
    --text: ${getVar("--dui-fill_color-text-primary")};
    --text-hover: ${getVar("--dui-fill_color-text-primary")};
    --text-active: ${getVar("--dui-fill_color-text-secondary")};
    --text-disabled: ${getVar("--dui-fill_color-text-disabled")};

    &.accent {
      --fill: ${getVar("--dui-fill_color-accent-default")};
      --fill-hover: ${getVar("--dui-fill_color-accent-secondary")};
      --fill-active: ${getVar("--dui-fill_color-accent-tertiary")};
      --fill-disabled: ${getVar("--dui-fill_color-accent-disabled")};
      --stroke: ${getVar(
        "--dui-stroke_color-control_stroke-on_accent_default"
      )};
      --elevation-stroke: ${getVar(
        "--dui-stroke_color-control_stroke-on_accent_secondary"
      )};

      // text
      --text: ${getVar("--dui-fill_color-text_on_accent-primary")};
      --text-hover: ${getVar("--dui-fill_color-text_on_accent-primary")};
      --text-active: ${getVar("--dui-fill_color-text_on_accent-secondary")};
      --text-disabled: ${getVar("--dui-fill_color-text_on_accent-disabled")};
    }

    &:focus-visible {
      outline: 2px solid var(--focus-outline);
      outline-offset: 1px;
    }
  }
`;

export const Button = ({
  children,
  variant,
  className,
  ...props
}: ButtonProps) => {
  return (
    <div className="windows">
      <button {...props} className={clsx(button, variant, className)}>
        {children}
      </button>
    </div>
  );
};
