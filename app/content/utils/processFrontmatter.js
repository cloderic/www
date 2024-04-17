// This files uses CJS stuff only so that it is loadable from `next.config.js`

const { DateTime } = require('luxon');

function processFronmatter({
  date = null,
  last_update = null,
  ...otherProperties
}) {
  return {
    ...otherProperties,
    date:
      date != null
        ? DateTime.fromJSDate(date, {
            zone: 'UTC'
          })
        : undefined,
    last_update:
      last_update != null
        ? DateTime.fromJSDate(last_update, {
            zone: 'UTC'
          })
        : undefined
  };
}

module.exports = processFronmatter;
