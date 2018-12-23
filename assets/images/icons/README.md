Use [SVGR](https://www.smooth-code.com/open-source/svgr/docs/cli/) to create a component

`npx @svgr/cli --native -d assets/images/icons/ components/icons/ --replace-attr-values "#000000=currentColor" --icon`

- `fill="currentColor"` allows the icon to inherit `color` from `style`
