<style>
  .datepicker {
    font-size: 12px;
    width: 280px;
    border: 1px solid #ddd;
    background: #fff;
  }

  .datepicker .hidden {
    display: none;
  }

  .datepicker-header {
    position: relative;
    padding: 5px;
  }

  .datepicker-header > label {
    font-weight: 600;
    position: absolute;
    left: 40px;
    right: 40px;
    line-height: 22px;
    text-align: center;
    cursor: pointer;
  }

  .datepicker-header > label:hover {
    background: #428bca;
    color: #fff;
  }

  .datepicker-body {
    position: relative;
  }

  .datepicker-prevbtn,
  .datepicker-nextbtn {
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .datepicker-nextbtn {
    float: right;
  }

  .datepicker table {
    table-layout: fixed;
    width: 100%;
  }

  .datepicker th {
    border-bottom: 1px solid #eee;
    padding: 5px;
  }

  .datepicker td.nextmonth,
  .datepicker td.prevmonth {
    color: #999;
  }

  .datepicker td {
    text-align: center;
    padding: 6px 5px;
    cursor: pointer;
    color: #000;
  }

  .datepicker td:hover,
  .datepicker td.current {
    background-color: #428bca;
    color: #fff;
  }

  .datepicker.weekmode .datepicker-dayrow:hover,
  .datepicker.weekmode .datepicker-dayrow.current {
    background-color: #428bca;
  }

  .datepicker.weekmode .datepicker-dayrow:hover td,
  .datepicker.weekmode .datepicker-dayrow.current td {
    color: #fff;
  }

  .datepicker-footer {
    padding: 4px;
    text-align: right;
  }

  .datepicker-todaybtn {
    border: none;
    color: #0089dc;
    background: transparent;
    line-height: 24px;
    border-radius: 5px;
    cursor: pointer;
  }

  .datepicker-yeartable td {
    text-align: center;
    padding: 15px;
    cursor: pointer;
  }

  .datepicker-monthtable td {
    text-align: center;
    padding: 15px;
    cursor: pointer;
  }

  .datepicker-time-wrap {
    text-align: center;
  }

  .datepicker-timelabel {
    float: left;
    cursor: pointer;
    line-height: 30px;
    margin-left: 10px;
  }
</style>

<template>
  <div class="datepicker" :class="{ weekmode: selectionMode === 'week' }">
    <div class="datepicker-header" v-show="currentView !== 'time'">
      <button @click="prev" class="datepicker-prevbtn d-icon d-icon-arrow-left"></button>
      <label @click="handleLabelClick">{{ label }}</label>
      <button @click="next" class="datepicker-nextbtn d-icon d-icon-arrow-right"></button>
    </div>
    <div class="datepicker-body">
      <div :class="{ hidden: currentView !== 'time' }" class="datepicker-time-wrap" v-if="showTime">
        <d-time-picker v-ref:time-picker @pick="handleTimePick" @close="currentView = 'date'"></d-time-picker>
      </div>
      <table :class="{ hidden: currentView !== 'date' }" @click="handleDateTableClick" cellspacing="0">
        <tbody>
          <tr>
            <th>{{ $t('datepicker.weeks.sun') }}</th>
            <th>{{ $t('datepicker.weeks.mon') }}</th>
            <th>{{ $t('datepicker.weeks.tue') }}</th>
            <th>{{ $t('datepicker.weeks.wed') }}</th>
            <th>{{ $t('datepicker.weeks.thu') }}</th>
            <th>{{ $t('datepicker.weeks.fri') }}</th>
            <th>{{ $t('datepicker.weeks.sat') }}</th>
          </tr>
          <tr v-for="row in 6" class="datepicker-dayrow" :class="{ current: isWeekActive(cells[row * 7 + 1]) }">
            <td v-for="column in 7" class="{{ cells[row * 7 + column].type }} {{ selectionMode === 'day' && cells[row * 7 + column].type === 'normal' && monthDate == cells[row * 7 + column].text ? 'current' : '' }}">{{ cells[row * 7 + column].text }}</td>
          </tr>
        </tbody>
      </table>

      <table @click="handleYearTableClick" class="datepicker-yeartable" :class="{ hidden: currentView !== 'year' }">
        <tbody>
          <tr>
            <td @click="prevTenYear" class="d-icon d-icon-arrow-left"></td>
            <td :class="{ current: year === startYear }">{{startYear}}</td>
            <td :class="{ current: year === startYear }">{{startYear + 1}}</td>
          </tr>
          <tr>
            <td :class="{ current: year === startYear }">{{startYear + 2}}</td>
            <td :class="{ current: year === startYear }">{{startYear + 3}}</td>
            <td :class="{ current: year === startYear }">{{startYear + 4}}</td>
          </tr>
          <tr>
            <td :class="{ current: year === startYear }">{{startYear + 5}}</td>
            <td :class="{ current: year === startYear }">{{startYear + 6}}</td>
            <td :class="{ current: year === startYear }">{{startYear + 7}}</td>
          </tr>
          <tr>
            <td :class="{ current: year === startYear }">{{startYear + 8}}</td>
            <td :class="{ current: year === startYear }">{{startYear + 9}}</td>
            <td @click="nextTenYear" class="d-icon d-icon-arrow-right"></td>
          </tr>
        </tbody>
      </table>

      <table @click="handleMonthTableClick" class="datepicker-monthtable" :class="{ hidden: currentView !== 'month' }">
        <tbody>
          <tr>
            <td :class="{ current: isMonthActive(0) }">{{ $t('datepicker.months.jan') }}</td>
            <td :class="{ current: isMonthActive(1) }">{{ $t('datepicker.months.feb') }}</td>
            <td :class="{ current: isMonthActive(2) }">{{ $t('datepicker.months.mar') }}</td>
          </tr>
          <tr>
            <td :class="{ current: isMonthActive(3) }">{{ $t('datepicker.months.apr') }}</td>
            <td :class="{ current: isMonthActive(4) }">{{ $t('datepicker.months.may') }}</td>
            <td :class="{ current: isMonthActive(5) }">{{ $t('datepicker.months.jun') }}</td>
          </tr>
          <tr>
            <td :class="{ current: isMonthActive(6) }">{{ $t('datepicker.months.jul') }}</td>
            <td :class="{ current: isMonthActive(7) }">{{ $t('datepicker.months.aug') }}</td>
            <td :class="{ current: isMonthActive(8) }">{{ $t('datepicker.months.sep') }}</td>
          </tr>
          <tr>
            <td :class="{ current: isMonthActive(9) }">{{ $t('datepicker.months.oct') }}</td>
            <td :class="{ current: isMonthActive(10) }">{{ $t('datepicker.months.nov') }}</td>
            <td :class="{ current: isMonthActive(11) }">{{ $t('datepicker.months.dec') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="datepicker-footer" :class="{ hidden: currentView !== 'date' }">
      <span class="datepicker-timelabel" @click="currentView = 'time'" v-if="showTime">{{ timeText }}</span>
      <button class="datepicker-todaybtn" @click="changeToToday">{{ $t('datepicker.today') }}</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  var getDayCountOfMonth = function(year, month) {
    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return 30;
    }

    if (month === 1) {
      if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        return 29;
      } else {
        return 28;
      }
    }

    return 31;
  };

  var getFirstDayOfMonth = function(date) {
    var temp = new Date(date.getTime());
    temp.setDate(1);
    return temp.getDay();
  };

  var getWeekNumber = function(src) {
    var date = new Date(src.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  };

  // TODO add a common i18n
  const i18n = require('../locales/zh').default;

  export default {
    props: {
      currentView: {
        default: 'date'
      },

      date: {
        default() {
          return new Date()
        }
      },

      value: {},

      showTime: {
        type: Boolean
      },

      selectionMode: {
        type: String,
        default: 'day'
      }
    },

    watch: {
      currentView(val) {
        if (val === 'time') {
          this.$refs.timePicker.hours = this.hours;
          this.$refs.timePicker.minutes = this.minutes;
        }
      }
    },

    methods: {
      $t(path) {
        var array = path.split('.');
        var current = i18n;
        for (var i = 0, j = array.length; i < j; i++) {
          var property = array[i];
          var value = current[property];
          if (i === j - 1) return value;
          if (!value) return '';
          current = value;
        }
        return '';
      },

      isMonthActive(month) {
        var date = this.date;
        if (this.selectionMode !== 'month'){
          return month === date.getMonth();
        } else {
          return this.value === date.getFullYear() + '-' + month;
        }
      },

      isWeekActive(cell) {
        if (this.selectionMode !== 'week') return false;
        var newDate = new Date(this.date.getTime());

        var month = newDate.getMonth();
        var year = newDate.getFullYear();

        if (cell.type === 'prevmonth') {
          newDate.setMonth(month === 0 ? 11 : month - 1);
          newDate.setFullYear(month === 0 ? year - 1 : year);
        }

        if (cell.type === 'nextmonth') {
          newDate.setMonth(month === 11 ? 0 : month + 1);
          newDate.setFullYear(month === 11 ? year + 1 : year);
        }

        newDate.setDate(parseInt(cell.text));

        return year + 'w' + getWeekNumber(newDate) === this.value;
      },

      resetDate() {
        this.date = new Date(this.date);
      },

      showMonthPicker() {
        this.currentView = 'month';
      },

      showYearPicker() {
        this.currentView = 'year';
      },

      handleLabelClick() {
        if (this.currentView === 'date') {
          this.showMonthPicker();
        } else if (this.currentView === 'month') {
          this.showYearPicker();
        }
      },

      prevMonth() {
        var date = this.date;
        var year = date.getFullYear();
        var month = date.getMonth();

        var newYear = month === 0 ? year - 1 : year;
        var newMonth = month === 0 ? 11 : month - 1;

        date.setMonth(newMonth);
        date.setFullYear(newYear);
        this.resetDate();
      },

      nextMonth() {
        var date = this.date;
        var year = date.getFullYear();
        var month = date.getMonth();

        var newYear = month === 11 ? year + 1 : year;
        var newMonth = month === 11 ? 0 : month + 1;

        date.setMonth(newMonth);
        date.setFullYear(newYear);
        this.resetDate();
      },

      nextYear() {
        var date = this.date;
        date.setFullYear(date.getFullYear() + 1);
        this.resetDate();
      },

      prevYear() {
        var date = this.date;
        date.setFullYear(date.getFullYear() - 1);
        this.resetDate();
      },

      nextTenYear() {
        var date = this.date;
        date.setFullYear(date.getFullYear() + 10);
        this.resetDate();
      },

      prevTenYear() {
        var date = this.date;
        date.setFullYear(date.getFullYear() - 10);
        this.resetDate();
      },

      prev() {
        var currentView = this.currentView;
        if (currentView === 'date') {
          this.prevMonth();
        } else {
          this.prevYear();
        }
      },

      next() {
        var currentView = this.currentView;
        if (currentView === 'date') {
          this.nextMonth();
        } else {
          this.nextYear();
        }
      },

      handleTimePick(picker) {
        this.hours = picker.hours;
        this.minutes = picker.minutes;

        this.currentView = 'date';
        this.resetDate();
      },

      handleMonthTableClick(event) {
        var target = event.target;
        if (target.tagName !== 'TD') return;
        var column = target.cellIndex;
        var row = target.parentNode.rowIndex;
        var month = row * 3 + column;

        var selectionMode = this.selectionMode;
        if (selectionMode !== 'month') {
          this.date.setMonth(month);
          this.currentView = 'date';
          this.resetDate();
        } else {
          this.date.setMonth(month);
          this.resetDate();
          this.value = this.date.getFullYear() + '-' + month;
          this.$emit('pick', { year: this.date.getFullYear(), month: month });
        }
      },

      handleDateTableClick(event) {
        var target = event.target;
        if (target.tagName !== 'TD') return;

        var selectionMode = this.selectionMode;

        if (selectionMode === 'week') {
          target = target.parentNode.cells[1];
        }

        var year = this.date.getFullYear();
        var month = this.date.getMonth();
        var text = target.textContent || target.innerText;
        var className = target.className;

        if (className.indexOf('prev') !== -1) {
          if (month === 0) {
            year = year - 1;
            month = 11;
          } else {
            month = month - 1;
          }
          this.date.setFullYear(year);
          this.date.setMonth(month);
        } else if (className.indexOf('next') !== -1) {
          if (month === 11) {
            year = year + 1;
            month = 0;
          } else {
            month = month + 1;
          }
          this.date.setFullYear(year);
          this.date.setMonth(month);
        }

        if (selectionMode === 'day') {
          this.date.setDate(parseInt(text, 10));
          this.resetDate();
          this.$emit('pick', { date: this.date });
        } else if (selectionMode === 'week') {
          this.date.setDate(parseInt(text, 10));
          this.resetDate();

          var weekNumber = getWeekNumber(this.date);
          this.value = this.date.getFullYear() + 'w' + weekNumber;
          this.$emit('pick', { year: this.date.getFullYear(), week: weekNumber });
        }
      },

      handleYearTableClick(event) {
        var target = event.target;
        if (target.tagName === 'TD') {
          var column = target.cellIndex;
          var row = target.parentNode.rowIndex;
          var index = row * 3 + column;

          if (index === 0 || index === 11) return;

          var textYear = target.textContent || target.innerText;
          this.date.setFullYear(parseInt(textYear));
          this.currentView = 'month';

          this.resetDate();
        }
      },

      changeToToday() {
        this.date.setTime(+new Date());
        this.resetDate();
      }
    },

    components: {
      DTimePicker: require('./time-picker.vue')
    },

    compiled() {
      if (this.selectionMode === 'month') {
        this.currentView = 'month';
      }
    },

    computed: {
      cells() {
        var date = this.date;
        var day = getFirstDayOfMonth(date);
        var maxDay = getDayCountOfMonth(date.getFullYear(), date.getMonth());
        var lastMonthDay = getDayCountOfMonth(date.getFullYear(), (date.getMonth() === 0 ? 11 : date.getMonth() - 1));

        day = (day === 0 ? 7 : day);

        var cells = [];
        var count = 1;
        var firstDayPosition;

        for (var i = 0; i < 6; i++) {
          for (var j = 0; j < 7; j++) {
            var cell = { row: i, column: j, type: 'normal' };
            if (i === 0) {
              if (j >= day) {
                cell.text = count++;
                if (count === 2) {
                  firstDayPosition = i * 7 + j;
                }
              } else {
                cell.text = lastMonthDay - (day - j % 7) + 1;
                cell.type = 'prevmonth';
              }
            } else {
              if (count <= maxDay) {
                cell.text = count++;
                if (count === 2) {
                  firstDayPosition = i * 7 + j;
                }
              } else {
                cell.text = count++ - maxDay;
                cell.type = 'nextmonth';
              }
            }
            cells.push(cell);
          }
        }

        cells.firstDayPosition = firstDayPosition;

        return cells;
      },

      monthDate(){
        return this.date.getDate();
      },

      startYear() {
        return Math.floor(this.date.getFullYear() / 10) * 10;
      },

      resetView() {
        if (this.selectionMode !== 'month') {
          this.currentView = 'date';
        } else {
          this.currentView = 'month';
        }
      },

      hours: {
        get() {
          return this.date.getHours();
        },
        set(hours) {
          this.date.setHours(hours);
        }
      },

      minutes: {
        get() {
          return this.date.getMinutes();
        },
        set(minutes) {
          this.date.setMinutes(minutes);
        }
      },

      timeText() {
        var hours = this.hours;
        var minutes = this.minutes;
        return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
      },

      label() {
        var date = this.date;
        var currentView = this.currentView;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;

        if (currentView === 'date') {
          return year + ' / ' + month;
        }

        return year;
      }
    }
  };
</script>
