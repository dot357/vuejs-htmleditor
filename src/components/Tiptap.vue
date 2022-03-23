<template>
  <div class="tiptap">
   
    <div class="controls">
        <div class="topLayer">
          <button class="control-element" @click="editor.commands.toggleBold()"><strong>Bold</strong></button>
          <button class="control-element" @click="editor.commands.toggleItalic()"><em>Italic</em></button>
          <button class="control-element" @click="editor.commands.insertContent('<p>Paragrapgh added</p>')">Paragraph</button>
          <button class="control-element" @click="editor.commands.insertContent('<br />')">Line break</button>
        </div>
        <div class="bottomLayer">
          <button class="control-element" @click="editor.commands.insertContent('###BODY###')">###BODY###</button>
          <button class="control-element" @click="editor.commands.insertContent('###ENGINE###')" >###ENGINE###</button>
          <button class="control-element" @click="editor.commands.insertContent('###PLUG###')" >###PLUG###</button>
        </div>
        
    </div>
    <editor-content
      @input="this.$emit('text-input', editor.getHTML())"
      @mouseleave="this.$emit('text-input', editor.getHTML())"
      @mouseenter="this.$emit('text-input', editor.getHTML())"
      :editor="editor" 
    />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from '@tiptap/extension-text-align'
import '../../titapGeneralStyling.css'

export default {
  data() {
    return {
      editor: null
    };
  },
  components: {
    EditorContent,
  },
  mounted() {
    this.editor = new Editor({
      content: `<p>You can enter your content here. Developed by <strong><a href="https:github.com/dot357">dot357</a></strong> 🎉</p>`,
      extensions: [StarterKit,TextAlign],
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
  watch: {
    // Note: only simple paths. Expressions are not supported.
    editor(value) {
      console.log(value.getHTML());
      this.$emit("text-input", value.getHTML());
    },
  },
};
</script>

<style scoped>
.tiptap {

  padding: 2rem 1rem;
 
}



.controls{
    display: flex;
    flex-direction: column;

    gap: 7px;
    align-items: flex-start;
    margin-bottom: 15px;
}

.topLayer,.bottomLayer{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 7px;
  

}


.control-element {
  border: 1px solid black;
  border-radius: 4px;
  min-width:25px;
  max-width: 195px;
}

.control-element:hover{
    transition: all 0.15s ease;
    background: black;
    color: white;
}

</style>
