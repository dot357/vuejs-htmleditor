<template>
  <section class="main">
    <div class="editor">
      <Tiptap @text-input="someEvent($event)" />
    </div>
    <div class="output">
      <div class="options">
        <button
          class="view"
          @click="show.output = false"
          :class="{ active: !show.output }"
        >
          Preview
        </button>
        <button
          class="view"
          @click="show.output = true"
          :class="{ active: show.output }"
        >
          Output
        </button>
      </div>
      <Transition>
        
        <textarea v-if="show.output" @select="copyText()" :value="output" disabled> </textarea>
      </Transition>
      <Transition>
        <div v-if="!show.output" v-html="output"></div>
      </Transition>
    </div>
  </section>
</template>

<script>
import Tiptap from "./components/Tiptap.vue";
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      dataOutput: null,
      show: {
        output: false,
      },
    };
  },
  components: {
    Tiptap,

  },
  methods: {
    someEvent($event) {
      this.dataOutput = $event;
    },
    copyText(){
      const value = window.getSelection().toString()
      setTimeout(() => {
        window.getSelection().removeAllRanges()
      },500)
      navigator.clipboard.writeText(value);
      const toast = useToast();
      toast.success("Text coppied", {
        timeout: 2000
      });

    }
  },
  computed: {
    output: {
      get() {
        return this.dataOutput;
      },
      set() {
        this.dataOutput = this.someEvent;
        return this.dataOutput;
      },
    },
  },
};
</script>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  
}
.v-enter-active{
  transition-delay: 0.23s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.main {
  width: 100vw;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  overflow-x: hidden;
}

.main .editor {
  width: 100%;
  max-width: 50%;
  height: 100%;
  border-right: 3px solid;
   min-height: 100vh;
  height: auto;
}

.main .output {
  width: 100%;
  max-width: 50%;
  
  padding: 1rem;
   min-height: 100vh;
  height: auto;
}

.main .output p {
  word-break: break-all !important;
  white-space: normal !important;
}

.output .options {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 25px;
  padding: 1rem 0;
  background: white;
  position: sticky;
  top: 0;
}
textarea,textarea:disabled{
  width: 100%;
  height: 100%;
  min-height: 50vh;
  outline: none;
  border: none;
  color: black;
  background: white;
  font-family: 'Barlow', sans-serif;
  font-size: 1rem;
  resize: none;

}



.view {
  border: 1px solid black;
  border-radius: 4px;
  width: 100%;
}
.view:hover {
  transition: opacity 0.15s ease;
  opacity: 0.8;
}

button.active {
  background: black;
  color: white;
}


@media only screen and (max-width: 760px) {
.main{
  flex-direction: column;
}

.main .editor{
  width: 100%;
  max-width: 100%;
}

}
</style>
