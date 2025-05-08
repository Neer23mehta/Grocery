'use client'
import { Dialog, DialogContent } from '@mui/material';
import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

const Trash = () => {
  const [input, setInput] = useState();
  const [text, setText] = useState(false);
  const [content, setCotent] = useState(false);
  const [data, setData] = useState(false);

  const handleNewContent = () => {
    setCotent(!content)
  }

  const handletextAdd = () => {
    setText(!text)
    if(!input){
      setText(false)
    }
  }

  const handleNewInput = () => {
    setData(!data)
  }
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-row items-center justify-center mt-10'>
        <input type='text' required placeholder='Add-Text' value={input} onChange={(e) => setInput(e.target.value.trim())} className='px-5 py-2 border border-black' />
        <button className='text-3xl ml-5 border border-black rounded-md w-8 text-center' onClick={handletextAdd}>+</button>
      </div>
      <ul className='flex flex-col justify-center items-center'>
        {
          text ? (
            <div className='flex flex-row text-xl space-x-3.5 justify-center items-center'>
            <p className='mt-5 flex flex-row space-x-3.5 items-center'>
              {input} <span className={`${input ? "contents":"hidden"} ml-2.5`} onClick={handleNewInput}> + </span> <span className={`${input ? "contents":"hidden"} ml-7`}onClick={handleNewContent}><MdEdit/></span><span className={`${input ? "contents":"hidden"}`} onClick={(e) => setInput("")}><RiDeleteBin5Fill /></span>
            </p>
            </div>
          ):null
        }
      </ul>
      <Dialog open={content} onClose={() => handleNewContent(false)}>
      <input type='text' required placeholder='Add-Text' value={input} onChange={(e) => setInput(e.target.value.trim())} className='px-5 py-2 border border-black' />
      </Dialog>

      <Dialog>
        <DialogContent>
          <div>
            
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Trash