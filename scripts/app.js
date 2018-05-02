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
      return app.rangeOfIntegers(24).map(n => {
        // These variables are available in the return object
        let datetime = moment(this.startTime).add(n, 'hours')
        let durationInMinutes = this.segmentDurationInMinutes
        return {
          value: n,
          military: ('00' + n).slice(-2), // padded left 0
          durationInMinutes,
          datetime,
          segments: app.rangeOfIntegers(4).map((n, index) => {
            return {
              index: index,
              startTime: moment(datetime).add(n * durationInMinutes, "minutes"),
              durationInMinutes: durationInMinutes,
            }
          }),
          segmentsPerHour: function () {
            60 / this.segmentDurationInMinutes
          },
        }
      })
    },
    tasks: function () {
      return this.taskNames.map((taskName, n) => {
        return {
          index: n,
          number: ('00' + n).slice(-2),
          name: taskName,
        }
      })
    },

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

Vue.component('time-bubble', {
  props: {
    segment: Object,
  },
  template: '<input class="timeBubble" type="radio" v-bind:title="shortTime" >',
  // template: '<span>{{ segment.startTime }}, {{ segment.durationInMinutes}}</span>',
  computed: {
    shortTime: function () { return moment(this.segment.startTime).format('L LT') },
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
