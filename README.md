## Vue Desktop

A UI library for building admin panel website.

## Install

```Bash
npm install vue vue-i18n vue-desktop
```

## Usage

### All components

Import all components provided by vue-desktop:

```JavaScript
require('vue-desktop')
```

Or

```JavaScript
import components from 'vue-desktop'
```

### Import one component

Replace src to lib in source code.

```JavaScript
export default {
  components: {
    GridColumn: require('vue-desktop/lib/data/grid-column.vue'),
    Grid: require('vue-desktop/lib/data/grid.vue')
  }
};
```

```HTML
<grid>
  <grid-column label="test1"></grid-column>
  <grid-column label="test2"></grid-column>
  <grid-column label="test3"></grid-column>
</grid>
```

## Dev

```Bash
make dev
```

## Examples

After npm run dev, visit http://localhost:8080/examples.

## License
MIT.