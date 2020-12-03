<template>
  <main id="todolist">
    <h1>
      Todo List
      <span>Get things done, one item at a time.</span>
    </h1>

    <template v-if="todo.length">
      <transition-group name="todolist" tag="ul">
        <li
          v-for="item in todoByStatus"
          :key="item.id"
          :class="item.done ? 'done' : ''"
        >
          <span class="label">{{ item.label }}</span>
          <div class="actions">
            <button
              class="btn-picto"
              type="button"
              :aria-label="item.done ? 'Undone' : 'Done'"
              :title="item.done ? 'Undone' : 'Done'"
              @click="markAsDoneOrUndone(item)"
            >
              <i aria-hidden="true" class="material-icons">{{
                item.done ? 'check_box' : 'check_box_outline_blank'
              }}</i>
            </button>
            <button
              class="btn-picto"
              type="button"
              aria-label="Delete"
              title="Delete"
              @click="deleteItemFromList(item)"
            >
              <i aria-hidden="true" class="material-icons">delete</i>
            </button>
          </div>
        </li>
      </transition-group>
      <togglebutton
        label="Move done items at the end?"
        name="todosort"
        @clicked="clickontoogle"
      />
    </template>
    <p v-else class="emptylist">Your todo list is empty.</p>

    <form name="newform" @submit.prevent="addItem">
      <label for="newitem">Add to the todo list</label>
      <input id="newitem" v-model="newitem" type="text" name="newitem" />
      <button type="submit">Add item</button>
    </form>
  </main>
</template>
<script>
import togglebutton from '~/components/togglebutton.vue'
export default {
  components: {
    togglebutton,
  },
  data() {
    return {
      newitem: '',
      sortByStatus: false,
      todo: [
        { id: 1, label: 'Learn VueJs', done: true },
        { id: 2, label: 'Code a todo list', done: false },
        { id: 3, label: 'Learn something else', done: false },
      ],
    }
  },
  computed: {
    todoByStatus() {
      if (!this.sortByStatus) {
        return this.todo
      }

      let sortedArray = []
      const doneArray = this.todo.filter(function (item) {
        return item.done
      })
      const notDoneArray = this.todo.filter(function (item) {
        return !item.done
      })

      sortedArray = [...notDoneArray, ...doneArray]
      return sortedArray
    },
  },
  methods: {
    addItem() {
      this.todo.push({
        id: Math.floor(Math.random() * 9999) + 10,
        label: this.newitem,
        done: false,
      })
      this.newitem = ''
    },
    markAsDoneOrUndone(item) {
      item.done = !item.done
    },
    deleteItemFromList(item) {
      const index = this.todo.indexOf(item)
      this.todo.splice(index, 1)
    },
    clickontoogle(active) {
      this.sortByStatus = active
    },
  },
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  background: #f7f1f1;
  font-size: 1.1rem;
  font-family: 'Quicksand', sans-serif;
  height: 100%;
}
@keyframes strikeitem {
  to {
    width: calc(100% + 1rem);
  }
}

#todolist {
  margin: 4rem auto;
  padding: 2rem 3rem 3rem;
  max-width: 500px;
  background: #ff6666;
  color: #fff;
  box-shadow: -20px -20px 0px 0px rgba(100, 100, 100, 0.1);
}
#todolist h1 {
  /*text-align:center;*/
  font-weight: normal;
  font-size: 2.6rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
#todolist h1 span {
  display: block;
  font-size: 0.8rem;
  margin-bottom: 0.7rem;
  margin-left: 3px;
  margin-top: 0.2rem;
}

#todolist .emptylist {
  margin-top: 2.6rem;
  text-align: center;
  letter-spacing: 0.05em;
  font-style: italic;
  opacity: 0.8;
}
#todolist ul {
  margin-top: 2.6rem;
  list-style: none;
}
#todolist .todolist-move {
  transition: transform 1s;
}
#todolist li {
  display: flex;
  margin: 0 -3rem 4px;
  padding: 1.1rem 3rem;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
}

#todolist .actions {
  flex-shrink: 0;
  padding-left: 0.7em;
}
#todolist .label {
  position: relative;
  transition: opacity 0.2s linear;
}
#todolist .done .label {
  opacity: 0.6;
}
#todolist .done .label:before {
  content: '';
  position: absolute;
  top: 50%;
  left: -0.5rem;
  display: block;
  width: 0%;
  height: 1px;
  background: #fff;
  animation: strikeitem 0.3s ease-out 0s forwards;
}
#todolist .btn-picto {
  border: none;
  background: none;
  -webkit-appearance: none;
  cursor: pointer;
  color: #fff;
}

/* FORM */
form {
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
}
form label {
  min-width: 100%;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}
form input {
  flex-grow: 1;
  border: none;
  background: #f7f1f1;
  padding: 0 1.5em;
  font-size: initial;
}
form button {
  padding: 0 1.3rem;
  border: none;
  background: #ff6666;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-left: 5px;
  cursor: pointer;
  transition: background 0.2s ease-out;
}
form button:hover {
  background: #ff5e5e;
}
form input,
form button {
  font-family: 'Quicksand', sans-serif;
  height: 3rem;
}

/* TOOGLE COMPONENT */
.togglebutton-wrapper {
  margin-top: 1em;
}
.togglebutton-wrapper label {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.togglebutton-wrapper input {
  position: absolute;
  left: -9999px;
}
.togglebutton-wrapper .togglebutton-label {
  font-size: 0.8rem;
  letter-spacing: 0.1em;
}
.togglebutton-wrapper .tooglebutton-box {
  position: relative;
  display: block;
  margin-left: 0.6em;
  width: 38px;
  height: 22px;
  background: white;
  /*border:1px solid black;*/
  border-radius: 999px;
  cursor: pointer;
}
.togglebutton-wrapper .tooglebutton-box:before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  display: block;
  width: 18px;
  height: 18px;
  /*border:1px solid #FF6666;*/
  border-radius: 50%;
  background: #ff6666;
  opacity: 0.7;
  transition: all 0.2s ease-in-out;
}
.togglebutton-wrapper.togglebutton-focus .tooglebutton-box {
  box-shadow: 0px 0px 0px 3px rgba(0, 0, 0, 0.1);
}
.togglebutton-wrapper.togglebutton-checked .tooglebutton-box:before {
  left: calc(100% - 4px - 16px);
  opacity: 1;
}
</style>
