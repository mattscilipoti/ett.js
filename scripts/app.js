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
        segments: [0, 0.25, 0.5, 0.75],
      }
    }
  )
}

app.taskGroupMajorTasks = new Vue({
  el: '#taskGroupMajorTasks',
  data: {
    purpose: 'Major Tasks',
    hours: app.hoursInADay(),
    taskNames: ['test1', 'test2', 'test3'],
  },
  computed: {
    tasks: function () {
      return this.taskNames.map((taskName, n) => {
        return {
          index: ('00' + n).slice(-2),
          name: taskName,
        }
      })
    }
  },
})
