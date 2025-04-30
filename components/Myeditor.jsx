'use client'
import React, { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import ListItem from '@tiptap/extension-list-item'
import Link from 'next/link'
import axios from 'axios'
import commonGetApis from '@/commonapi/Commonapi'

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
  const [data, setData] = useState("")
  const editor = useEditor({
    extensions,
    content: '',
  })

  const fetchTandC = async () => {
    try {
      const res = await commonGetApis("get_terms_conditions");
      setData(res?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };
  
  console.log("neersdaer",data)

  useEffect(() => {
    fetchTandC();
  }, []);
  
  const handleAddPage = async () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('usertoken');
  
    const formdata = new URLSearchParams();
    const editorContent = editor.getHTML(); 
    formdata.append("text", editorContent);
    // formdata.append("id", "2"); 
  
    try {
      const res = await axios.post("http://192.168.2.181:3000/admin/terms_and_condition", formdata, {
        headers: {
          Authorizations: token || '',
          language: "en",
          refresh_token: refreshToken || '',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log("Response:", res.data);
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  }
    console.log("neerr",data)
  
  if (!editor) return null;

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col px-2">
          <h1 className="text-3xl font-bold">Pages</h1>
          <p className='text-gray-500 mt-2'><Link href={`/admin/dashboard`}>Dashboard</Link> <span className='ml-2.5'>{`>`}</span><span className='text-black ml-2.5'>Pages</span> </p>
          <h2 className="text-xl font-semibold mt-4">Terms & Conditions</h2>
        </div>
        <div>
          <button className="px-3 font-bold py-2 bg-amber-300 ml-5 w-auto h-13 " onClick={handleAddPage}>Add Pages</button>
        </div>
      </div>
      <div className="max-w-full p-2 bg-white rounded-lg shadow space-y-4">
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
          <EditorContent editor={editor} className='' />
        </div>
      </div>
      <div className='bg-white flex flex-col mt-5 justify-center'>
          {/* {
            data?.map((curElem,idx) => {
              const {Terms_and_Conditions,terms_and_condition_id} = curElem;
              return (
                <div key={idx} className='flex flex-row justify-start items-center'>
                <h1 className='mt-3'><span className='mr-5'>({idx+1})</span>{Terms_and_Conditions}</h1>
                </div>
              )
            })
          } */}
      </div>
    </div>
  )
}

function btn(active = false) {
  return `px-2 py-1 text-sm rounded border ${active ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`
}
