import Vue from 'vue'
import QuillEditor, { Quill } from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-module'
import { ImageDrop } from 'quill-image-drop-module'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)

Vue.use(QuillEditor, {
  modules: {
    toolbar: [
      [{ 'size': ['small', false, 'large'] }],
      ['bold', 'italic'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }],
      ['card-color']
    ],
    history: {
      delay: 1000,
      maxStack: 50,
      userOnly: false
    },
    imageDrop: true,
    imageResize: {
      displayStyles: {
        backgroundColor: 'black',
        border: 'none',
        color: 'white'
      },
      modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
    }
  }
})
