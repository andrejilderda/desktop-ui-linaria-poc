import { css } from "@linaria/core";
import { flatto } from "@alizeait/flatto";
import { colors as colorTokens } from "./tokens/windows/colors";
import { Button } from "./Button/Button";

const reduceObj = (
  obj: Record<string, any>,
  cb: (key: string, value: string) => Record<string, string>
) =>
  Object.keys(obj).reduce(
    (acc, key) => Object.assign(acc, cb(key, obj[key])),
    {}
  );

const toCSSVar = (key: string, value: string) => ({
  [`--dui-${key}`]: value,
});

const flat = (obj: Record<string, any>) =>
  flatto(obj, "-") as unknown as Record<string, string>;

const colors = {
  base: css`
    ${reduceObj(flat(colorTokens.base), toCSSVar)}
  `,
  light: css`
    ${reduceObj(flat(colorTokens.light), toCSSVar)}
  `,
  dark: css`
    ${reduceObj(flat(colorTokens.dark), toCSSVar)}
  `,
};

const header = css`
  text-transform: uppercase;
`;

function App() {
  return (
    <div className={`${colors.base} ${colors.light} windows`}>
      <h1 className={header}>Hello world</h1>
      <Button variant="accent">Label</Button>
    </div>
  );
}

export default App;
