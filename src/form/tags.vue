<template>
  <div class="d-tags">
    <span class="d-tags-input" @click="activateInput" :class="{ 'active': showItem }">
      <span class="d-tags-placeholder" v-if="chosenTags.length === 0 && inputValue.length === 0">{{ placeholder }}</span>
      
      <ul class="d-tags-chosen" v-el:chosen>
        <li v-for="chosenTag in chosenTags" :class="{ 'highlight': $index === chosenTags.length - 1  && deleteInput}">
          <span>{{ chosenTag }}</span>
          <div class="d-tags-delete d-icon d-icon-close" @click="handleDelete($event, chosenTag)"></div>
        </li>
        <li>
          <input type="text" v-el:input @keydown.8="keyDelete" @keydown.enter="keyEnter" @keydown.up="keyUp($event)" @keydown.down="keyDown($event)" @keydown="handleKeydown($event)" v-model="inputValue">
        </li>
      </ul>
    </span>

    <ul v-if="showItem" class="d-tags-list" transition="list">
      <li class="not-found" v-if="filteredTags.length === 0">未找到该项</li>
      <li v-for="tag in filteredTags" @click="handleSelect(tag)" @mouseenter="handleMouseEnter(tag)" :class="{ 'active': activeTag === tag }">{{ tag }}</li>
    </ul>
  </div>
</template>

<style>
  .d-tags {
    width: 100%;
    position: relative;
  }

  .d-tags-input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    border: solid 1px #e5e6e7;
    padding: 0 10px 5px;
    background-color: #fff;
    cursor: text;
    position: relative;
    transition: .2s;
  }

  .d-tags-input.active {
    border-color: #1ab394;
  }

  .d-tags-placeholder {
    display: inline-block;
    color: #aaa;
    font-size: 14px;
    margin-top: 5px;
    height: 18px;
    line-height: 18px;
    position: absolute;
  }
  
  .d-tags-chosen {
    list-style: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    float: left;
  }

  .d-tags-chosen li.highlight {
    border: solid 1px #1ab394;
    color: #1ab394;
    background-color: #fff;
  }

  .d-tags-chosen li.highlight span {
    display: inline-block;
    margin-top: -1px;
  }

  .d-tags-input:after,
  .d-tags-chosen:after {
    content: '';
    height: 0;
    display: block;
    clear: both;
  }
  
  .d-tags-chosen li {
    float: left;
    display: inline-block;
    background-color: #f3f3f3;
    color: #666;
    font-size: 14px;
    padding: 0 8px;
    margin-right: 5px;
    margin-top: 5px;
    border-radius: 3px;
    box-sizing: border-box;
    border: solid 1px #f3f3f3;
    height: 18px;
  }

  .d-tags-chosen li:last-child {
    background-color: #fff;
    padding: 0;
    border: none;
  }

  .d-tags-chosen li input {
    height: 18px;
    line-height: 18px;
    padding: 0;
    outline: none;
    border: none;
    -webkit-appearance: none;
    font-size: 14px;
    max-width: 150px;
    width: 50px;
  }

  .d-tags-chosen li .d-tags-delete {
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
    font-size: 12px;
  }

  .d-tags-chosen li .d-tags-delete:before {
    height: 14px;
    line-height: 14px;
  }

  .d-tags-list {
    list-style: none;
    padding: 0;
    box-sizing: border-box;
    border: solid 1px #ccc;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
  }

  .d-tags-list li {
    display: block;
    font-size: 14px;
    height: 25px;
    line-height: 25px;
    padding: 0 20px;
    background-color: #fff;
    color: #666;
  }

  .d-tags-list li.active {
    background-color: #428bca;
    color: #fff;
  }

  .list-transition {
    transition: .2s;
  }

  .list-enter,
  .list-leave {
    opacity: 0;
  }

</style>

<script type="text/ecmascript-6">
  export default {
    props: {
      placeholder: {
        type: String,
        default: ''
      },

      value: {
        type: Array,
        default: function() {
          return [];
        }
      }
    },

    data() {
      return {
        showItem: false,
        chosenTags: [],
        filteredTags: [],
        deleteInput: false,
        inputValue: '',
        activeTag: null
      };
    },

    watch: {
      chosenTags(newVal) {
        this.$emit('select', newVal);
        this.$els.input.style.display = 'none';
        setTimeout(() => {
          this.inputValue = '';
          this.$els.input.style.display = 'inline-block';
          this.$els.input.focus();
        }, 200);
      },

      inputValue(newVal) {
        if (newVal.length > 0) {
          this.showItem = true;
        }
        this.filteredTags = this.value.filter((tag) => this.showTag(tag));
        this.activeTag = this.filteredTags[0];
      },

      showItem(newVal) {
        if (newVal) {
          document.addEventListener('click', this.windowClick, true);
        } else {
          document.removeEventListener('click', this.windowClick, true);
        }
      }
    },

    components: {

    },

    methods: {
      windowClick(event) {
        if (event.target !== this.$el && (event.target !== this.$els.input) && (event.target !== this.$els.chosen)) {
          this.showItem = false;
        }
      },

      showTag(tag) {
        return tag.indexOf(this.inputValue) !== -1;
      },

      activateInput() {
        this.showItem = !this.showItem;
        this.activeTag = this.filteredTags[0];
        this.$els.input.focus();
      },

      handleSelect(tag) {
        var index = this.chosenTags.indexOf(tag);
        if (index === -1) {
          this.chosenTags.push(tag);
        } else {
          this.chosenTags.splice(index, 1);
        }
        this.showItem = false;
        this.deleteInput = false;
      },

      handleMouseEnter(tag) {
        this.activeTag = tag;
      },

      handleDelete(event, tag) {
        event.stopPropagation();
        var index = this.chosenTags.indexOf(tag);
        if (index !== -1) {
          this.chosenTags.splice(index, 1);
        }
      },

      handleKeydown(event) {
        if (event.which !== 8) {
          this.deleteInput = false;
        }
        this.$els.input.style.width = this.$els.input.value.length * 8 + 50 + 'px';
      },

      isChosen(tag) {
        return this.chosenTags.indexOf(tag) !== -1;
      },

      keyDelete() {
        if (this.chosenTags.length > 0) {
          if (this.$els.input.value === '') {
            if (this.deleteInput) {
              this.chosenTags.pop();
            }
            this.deleteInput = !this.deleteInput;
          } else {
            this.deleteInput = false;
          }
        }
      },

      keyEnter() {
        if (this.filteredTags.length === 0) {
          this.inputValue = '';
        } else if (this.showItem) {
          var index = this.chosenTags.indexOf(this.activeTag);
          if (index === -1) {
            this.chosenTags.push(this.activeTag);
          } else {
            this.chosenTags.splice(index, 1);
          }
          this.showItem = false;
        } else {
          this.showItem = true;
        }
      },

      keyUp(event) {
        event.preventDefault();
        if (this.filteredTags.length > 1) {
          var index = this.filteredTags.indexOf(this.activeTag);
          if (index === 0) {
            this.activeTag = this.filteredTags[this.filteredTags.length - 1];
          } else {
            index--;
            this.activeTag = this.filteredTags[index];
          }
        }
      },

      keyDown(event) {
        event.preventDefault();
        if (this.filteredTags.length > 1) {
          var index = this.filteredTags.indexOf(this.activeTag);
          if (index === this.filteredTags.length - 1) {
            this.activeTag = this.filteredTags[0];
          } else {
            index++;
            this.activeTag = this.filteredTags[index];
          }
        }
      }
    },

    ready() {
      this.filteredTags = this.value;
      this.activeTag = this.filteredTags[0];
    }
  };
</script>