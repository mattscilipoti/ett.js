'use strict';

var app = {};


app.rangeOfIntegers = function (upperBand, lowerBand = 0) {
  return Array.apply(null, Array(upperBand - lowerBand)).map(function (_, i) { return i - lowerBand; })
}

Vue.component('task-table', {
  template: '#task-table-template',
  props: ['purpose', 'startTime'],

  data: function () {
    return {
      taskNames: ['test1', 'test2', 'test3'],
    }
  },
  computed: {
    hours: function () {
      return app.rangeOfIntegers(24).map(
        n => {
          return {
            value: n,
            military: ('00' + n).slice(-2), // padded left 0
            datetime: moment(this.startTime).add(n, 'hours'),
            segments: [0, 0.25, 0.5, 0.75],
          }
        }
      )
    },
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
  el: '#app',
  data: {
    isLoading: true,
    reportDate: moment().startOf('day'),
  },
  mounted() {
    this.$nextTick(() => {
      // Code that will run only after the
      // entire view has been re-rendered
      this.isLoading = false;
    })
  }
})
