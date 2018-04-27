'use strict';

var app = {
  isLoading: { main: true },
  spinner: document.querySelector('.loader'),
};

app.rangeOfIntegers = function (upperBand, lowerBand = 0) {
  return Array.apply(null, Array(upperBand - lowerBand)).map(function (_, i) { return i - lowerBand; })
}

app.hoursInADay = function () {
  return app.rangeOfIntegers(24).map(
    n => {
      return {
        value: n,
        military: ('00' + n).slice(-2), // padded left 0
        // military: n.toLocaleString('en', { minimumIntegerDigits: 2, minimumFractionDigits: 0, useGrouping: false })
      }
    }
  )
}

var taskGroupMajorTasks = new Vue({
  el: '#taskGroupMajorTasks',
  data: {
    purpose: 'Three Major Tasks for Today',
    hours: app.hoursInADay()
  }
})
