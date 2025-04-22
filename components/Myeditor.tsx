'use client'

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import ListItem from '@tiptap/extension-list-item'

const extensions = [
  StarterKit.configure({
    bulletList: { keepMarks: true },
    orderedList: { keepMarks: true },
  }),
  TextStyle,
  Color,
  Highlight,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
]

export default function MyEditor() {
  const editor = useEditor({
    extensions,
    content: '<p>  </p>',
  })

  if (!editor) return null

  return (
    <div className="max-w-full p-4 bg-white rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold">Terms & Conditions</h2>

      <div className="flex flex-wrap gap-2 border-b pb-3">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive('bold'))}>Bold</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive('italic'))}>Italic</button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={btn(editor.isActive('strike'))}>Strike</button>
        <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={btn(editor.isActive('highlight'))}>Highlight</button>

        {[1, 2, 3].map(lvl => (
          <button
            key={lvl}
            onClick={() => editor.chain().focus().toggleHeading({ level: lvl }).run()}
            className={btn(editor.isActive('heading', { level: lvl }))}
          >
            H{lvl}
          </button>
        ))}

        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive('bulletList'))}>• List</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive('orderedList'))}>1. List</button>

        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={btn(editor.isActive('codeBlock'))}>Code</button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editor.isActive('blockquote'))}>Quote</button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btn()}>―</button>

        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={btn()}>⬅</button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={btn()}>⬍</button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={btn()}>➡</button>
        <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={btn()}>↔</button>

        <button onClick={() => editor.chain().focus().setColor('#f43f5e').run()} className={btn(editor.isActive('textStyle', { color: '#f43f5e' })) + ' text-pink-600'}>A</button>
        <button onClick={() => editor.chain().focus().setColor('#10b981').run()} className={btn(editor.isActive('textStyle', { color: '#10b981' })) + ' text-green-600'}>A</button>

        <button onClick={() => editor.chain().focus().undo().run()} className={btn()}>↺ Undo</button>
        <button onClick={() => editor.chain().focus().redo().run()} className={btn()}>↻ Redo</button>

        <button onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className="px-2 py-1 text-sm border rounded hover:bg-gray-100">Clear</button>
      </div>

      <div className="min-h-[200px] border rounded p-3">
        <EditorContent editor={editor} className=''/>
      </div>
    </div>
  )
}

function btn(active = false) {
  return `px-2 py-1 text-sm rounded border ${active ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`
}
