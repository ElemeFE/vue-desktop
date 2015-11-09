<style type="sass">
  .datepicker {
    font-size: 12px;
    width: 260px;
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
    background: #33bcff;
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

  .datepicker td:hover {
    background-color: #33bcff;
    color: #fff;
  }

  .datepicker td.current {
    background: #0089dc;
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
</style>

<template>
  <div class="datepicker">
    <div class="datepicker-header">
      <button @click="prev" class="datepicker-prevbtn d-icon icon-datepicker-left-arrow"></button>
      <label @click="handleLabelClick">{{ label }}</label>
      <button @click="next" class="datepicker-nextbtn d-icon icon-datepicker-right-arrow"></button>
    </div>
    <div class="datepicker-body">
      <table :class="{ hidden: currentView !== 'date' }" @click="handleDateTableClick">
        <tbody>
          <tr>
            <th>{{ $t('datepicker.weeks.mon') }}</th>
            <th>{{ $t('datepicker.weeks.tue') }}</th>
            <th>{{ $t('datepicker.weeks.wed') }}</th>
            <th>{{ $t('datepicker.weeks.thu') }}</th>
            <th>{{ $t('datepicker.weeks.fri') }}</th>
            <th>{{ $t('datepicker.weeks.sat') }}</th>
            <th>{{ $t('datepicker.weeks.sun') }}</th>
          </tr>
          <tr v-for="row in 6">
            <td v-for="column in 7" class="{{ cells[row * 7 + column].type }}" :class="{ current: cells[row * 7 + column].type === 'normal' && monthDate == cells[row * 7 + column].text }">{{ cells[row * 7 + column].text }}</td>
          </tr>
        </tbody>
      </table>

      <table @click="handleYearTableClick" class="datepicker-yeartable" :class="{ hidden: currentView !== 'year' }">
        <tbody>
          <tr>
            <td @click="prevTenYear" class="d-icon icon-datepicker-left-arrow"></td>
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
            <td @click="nextTenYear" class="d-icon icon-datepicker-right-arrow"></td>
          </tr>
        </tbody>
      </table>

      <table @click="handleMonthTableClick" class="datepicker-monthtable" :class="{ hidden: currentView !== 'month' }">
        <tbody>
          <tr>
            <td :class="{ current: month === 1 }">{{ $t('datepicker.months.jan') }}</td>
            <td :class="{ current: month === 2 }">{{ $t('datepicker.months.feb') }}</td>
            <td :class="{ current: month === 3 }">{{ $t('datepicker.months.mar') }}</td>
          </tr>
          <tr>
            <td :class="{ current: month === 4 }">{{ $t('datepicker.months.apr') }}</td>
            <td :class="{ current: month === 5 }">{{ $t('datepicker.months.may') }}</td>
            <td :class="{ current: month === 6 }">{{ $t('datepicker.months.jun') }}</td>
          </tr>
          <tr>
            <td :class="{ current: month === 7 }">{{ $t('datepicker.months.jul') }}</td>
            <td :class="{ current: month === 8 }">{{ $t('datepicker.months.aug') }}</td>
            <td :class="{ current: month === 9 }">{{ $t('datepicker.months.sep') }}</td>
          </tr>
          <tr>
            <td :class="{ current: month === 10 }">{{ $t('datepicker.months.oct') }}</td>
            <td :class="{ current: month === 11 }">{{ $t('datepicker.months.nov') }}</td>
            <td :class="{ current: month === 12 }">{{ $t('datepicker.months.dec') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="datepicker-footer" :class="{ hidden: currentView !== 'date' }">
      <button class="datepicker-todaybtn" @click="changeToToday">{{ $t('datepicker.today') }}</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  var getDayCountOfMonth = function (year, month) {
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

  var getFirstDayOfMonth = function (date) {
    var temp = new Date(date.getTime());
    temp.setDate(1);
    return temp.getDay();
  };

  export default {
    methods: {
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

      handleMonthTableClick(event) {
        var target = event.target;
        if (target.tagName === 'TD') {
          var column = target.cellIndex;
          var row = target.parentNode.rowIndex;
          var month = row * 3 + column;

          this.date.setMonth(month);
          this.currentView = 'date';
          this.resetDate();
        }
      },

      handleDateTableClick(event) {
        var target = event.target;
        if (target.tagName === 'TD') {
          var month = this.date.getMonth();
          var text = target.textContent || target.innerText;
          var className = target.className;

          if (className.indexOf('prev') !== -1) {
            if (month === 0) {
              month = 11;
            } else {
              month = month - 1;
            }
            this.date.setMonth(month);
          } else if (className.indexOf('next') !== -1) {
            if (month === 11) {
              month = 0;
            } else {
              month = month + 1;
            }
            this.date.setMonth(month);
          }
          this.date.setDate(parseInt(text, 10));
          this.resetDate();
          this.$emit('pick', { date: this.date });
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

    props: {
      currentView: {
        default: 'date'
      },

      date: {
        default() {
          return new Date()
        }
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
            var cell = {
              row: i,
              column: j,
              type: 'normal'
            };
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
        var date = this.date;
        var year = date.getFullYear();
        return Math.floor(year / 10) * 10;
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