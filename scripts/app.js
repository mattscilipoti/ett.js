'use strict';

var app = {};


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

Vue.component('task-table', {
  template: '#task-table-template',
  props: ['purpose'],
  data: function () {
    return {
      hours: app.hoursInADay(),
      taskNames: ['test1', 'test2', 'test3'],
    }
  },
  computed: {
    tasks: function () {
      return this.taskNames.map((taskName, n) => {
        return {
          index: n,
          number: ('00' + n).slice(-2),
          name: taskName,
        }
      })
    }
  },
  methods: {
    addTask: function () {
      this.taskNames.push('new Task');
    },
    removeTask: function (index) {
      this.taskNames.splice(index, 1);
    }
  }
})

app.vm = new Vue({
  el: 'main',
  data: {
    isLoading: true,
  },
  mounted() {
    this.$nextTick(() => {
      // Code that will run only after the
      // entire view has been re-rendered
      this.isLoading = false;
    })
  }
})
