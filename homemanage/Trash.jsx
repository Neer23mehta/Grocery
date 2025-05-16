'use client';
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoSearchSharp } from 'react-icons/io5';
import { Droppable } from '../homemanage/Droppable';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import { Draggable } from "../homemanage/Draggable";
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
// import Moveable from 'react-moveable';

const key = 'INPUTS';
const Depth = 4;

const Tree = ({ depth, branch, add, del, edit, swap }) => {
  const [inputOpen, setInputOpen] = useState(false);
  // const { isOver, setNodeRef } = useDroppable({
  //   id: branch.id,
  // })
  const moveableRef = useRef(null);
  const targetRef = useRef(null);
  const swapy = useRef(null)
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: branch.id,
  });
  // const containerRef = useRef(null);

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return; // If dropped on the same item, do nothing

    const updatedData = swapNodes(datas, active.id, over.id); // Swap the nodes in the data

    setDatas(updatedData); // Update the state with the new data structure
  };

  const validationSchema = Yup.object().shape({
    inputValue: Yup.string().min(1).max(26).required('Name Must Require'),
  });

  // useEffect(() => {
  //   if (containerRef.current) {
  //     const swapyInstance = createSwapy(containerRef.current);

  //     swapyInstance.onSwap((event) => {
  //       console.log('Swap event:', event);
  //     });

  //     return () => {
  //       swapyInstance.destroy();
  //     };
  //   }
  // }, []);


  const formik = useFormik({
    initialValues: { inputValue: '' },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      add(branch.id, values.inputValue.trim());
      resetForm();
      setInputOpen(false);
    },
  });
 

  const style = transform
    ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    }
    : undefined;
  return (
    <div className="mt-2.5" >
      {/* <Draggable id={branch.id}> */}
      <div
        ref={setNodeRef} // Ensure setNodeRef is passed to the draggable node
        {...listeners}
        {...attributes}
        style={style} // Apply transformations for dragging
        className="flex flex-row w-fit justify-between border outline-none rounded-md px-2.5 py-2 accordion-item active tree"
      >
        <span
          className="mr-2 px-2 py-0.5 border-2 rounded-md border-y"
          onClick={() => {
            if (depth < Depth) {
              edit(branch.id, branch.value);
            }
          }}
        >
          {branch.value}
        </span>
        <div className="flex space-x-2">
          {depth < Depth && (
            <>
              <strong
                onClick={(e) => {
                  e.stopPropagation();
                  setInputOpen(true);
                }}
                className="text-2xl border-2 text-green-700 px-2 rounded-md cursor-pointer"
              >
                +
              </strong>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  edit(branch.id, branch.value.trim())
                }}
                className="text-xl text-blue-800 border-2 px-1 py-1.5 rounded-md cursor-pointer"
              >
                <MdEdit />
              </span>
            </>
          )}
          <span
            onClick={(e) => {
              e.stopPropagation();
              del(branch.id)
            }}
            className="text-xl text-red-800 border-2 px-1 py-1.5 rounded-md cursor-pointer"
          >
            <RiDeleteBin5Fill />
          </span>
          {/* <Moveable
          className='opacity-0'
          target={targetRef.current}
          ref={moveableRef}
          draggable={true}
          resizable={true}
          keepRatio={false}
          rotatable={true}
          scalable={true}
          onDrag={e => {
            e.target.style.transform = e.transform;
          }}
          onResize={e => {
            e.target.style.width = `${e.width}px`;
            e.target.style.height = `${e.height}px`;
          }}
          onRotate={e => {
            e.target.style.transform = e.transform;
          }}
          onScale={e => {
            e.target.style.transform = e.transform;
          }}
        /> */}
        </div>
      </div>

      {inputOpen && (
        <Dialog open={inputOpen} onClose={() => setInputOpen(false)}>
          <form onSubmit={formik.handleSubmit}>
            <DialogContent>
              <h1 className="text-lg mb-2">Enter New Branch-Name</h1>
              <input
                name="inputValue"
                value={formik.values.inputValue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-500 px-2 py-1 rounded-md w-full"
                placeholder="New Branch"
              />
              {formik.touched.inputValue && formik.errors.inputValue && (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.inputValue}
                </div>
              )}
            </DialogContent>
            <div className="flex justify-center items-center">
              <DialogActions className="flex justify-center">
                <button
                  type="submit"
                  className="bg-amber-400 px-4 py-2 rounded-md cursor-pointer"
                >
                  Add
                </button>
              </DialogActions>
            </div>
          </form>
        </Dialog>
      )}

      <ul className="ml-10 list-decimal marker:text-black">
        {branch.children.map((child, index) => (
          <li key={index} className="relative pl-5 border-l-3 border-gray-400">
            <hr className="absolute left-0 top-5 w-4 h-0.5 bg-gray-200"></hr>
            <Tree
              depth={depth + 1}
              branch={child}
              add={add}
              del={del}
              edit={edit}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const Trash = ({ id, children }) => {
  const [input, setInput] = useState('');
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [add, setAdd] = useState(false);
  const [parent, setParent] = useState(null);
  const { setNodeRef } = useDroppable({ id });

  useEffect(() => {
    const getData = localStorage.getItem(key);
    if (getData) {
      setDatas(JSON.parse(getData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(datas));
  }, [datas]);

  const handleData = (id, value) => {
    const newData = {
      id: uuidv4(),
      value,
      children: [],
    };

    if (!id) {
      setDatas([...datas, newData]);
    } else {
      const addToTree = (items) =>
        items.map((item) =>
          item.id === id
            ? { ...item, children: [...item.children, newData] }
            : { ...item, children: addToTree(item.children) }
        );
      setDatas(addToTree(datas));
    }
  };

  const handleDelete = (id) => {
    const deleteFromTree = (items) =>
      items
        .filter((item) => item.id !== id)
        .map((item) => ({
          ...item,
          children: deleteFromTree(item.children),
        }));
    setDatas(deleteFromTree(datas));
  };

  const handleEdit = (id, currentValue) => {
    setEditId(id);
    editFormik.setValues({ editValue: currentValue });
    setShowDialog(true);
  };

  // const swapNodes = (data, fromId, toId) => {
  //   const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

  //   const findNodeById = (nodes, id) => {
  //     for (let i = 0; i < nodes.length; i++) {
  //       if (nodes[i].id === id) return { node: nodes[i], parent: nodes };
  //       const result = findNodeById(nodes[i].children, id);
  //       if (result) return result;
  //     }
  //     return null;
  //   };

  //   const { node: fromNode, parent: fromParent } = findNodeById(data, fromId);
  //   const { node: toNode, parent: toParent } = findNodeById(data, toId);

  //   if (!fromNode || !toNode) return data;

  //   fromParent.children = fromParent.children.filter((child) => child.id !== fromId);
  //   toParent.children = toParent.children.filter((child) => child.id !== toId);

  //   fromParent.children.push(toNode);
  //   toParent.children.push(fromNode);

  //   return deepCopy(data);
  // };


 

  // Function to swap nodes
  const swapNodes = (data, fromId, toId) => {
    const deepCopy = (obj) => JSON.parse(JSON.stringify(obj)); // Deep copy to avoid mutation
  
    const findNodeById = (nodes, id) => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === id) return { node: nodes[i], parent: nodes };
        const result = findNodeById(nodes[i].children, id);
        if (result) return result;
      }
      return null;
    };
  
    const { node: fromNode, parent: fromParent } = findNodeById(data, fromId);
    const { node: toNode, parent: toParent } = findNodeById(data, toId);
  
    if (!fromNode || !toNode) return data; // Return unchanged if nodes not found
  
    // Remove nodes from their parents
    fromParent.children = fromParent.children.filter((child) => child.id !== fromId);
    toParent.children = toParent.children.filter((child) => child.id !== toId);
  
    // Insert nodes into their new positions
    fromParent.children.push(toNode);
    toParent.children.push(fromNode);
  
    return deepCopy(data); // Return the updated data
  };
  
  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
  
    const updatedData = swapNodes(datas, active.id, over.id);
    setDatas(updatedData); // Update the state with the new data structure
  }; 

  const handleNew = () => {
    setAdd(!add);
  };

  const editFormik = useFormik({
    initialValues: { editValue: '' },
    validationSchema: Yup.object({
      editValue: Yup.string().min(1).max(26).required('Name Must Require'),
    }),
    onSubmit: (values) => {
      const updateTree = (items) =>
        items.map((item) =>
          item.id === editId
            ? { ...item, value: values.editValue.trim() }
            : { ...item, children: updateTree(item.children) }
        );
      setDatas(updateTree(datas));
      setShowDialog(false);
    },
  });

  const handleSwap = (fromId, toId) => {
    const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

    const findAndSwap = (items) => {
      let fromNode = null;
      let toNode = null;

      const removeNodes = (arr) => {
        return arr.reduce((acc, item) => {
          if (item.id === fromId) {
            fromNode = item;
            return acc;
          } else if (item.id === toId) {
            toNode = item;
            return acc;
          } else {
            const children = removeNodes(item.children);
            return [...acc, { ...item, children }];
          }
        }, []);
      };

      const insertSwapped = (arr) =>
        arr.map((item) => {
          if (item.id === fromId) return toNode;
          if (item.id === toId) return fromNode;
          return { ...item, children: insertSwapped(item.children) };
        });

      const copied = deepCopy(datas);
      const removed = removeNodes(copied);

      const swapped = insertSwapped(removed);

      return swapped;
    };

    const updatedTree = findAndSwap(datas);
    setDatas(updatedTree);
  };

  return (
    <div className="">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex justify-end mr-5 mt-5" ref={setNodeRef}>
          {/* <Droppable id="droppable"> */}
          <span
            className="px-5 py-3 cursor-pointer border text-xl rounded-md font-bold bg-red-600 text-white text-center"
            onClick={() => setDatas([])}
          >
            Delete
          </span>
          {/* </Droppable> */}
        </div>

        <div className="py-5 flex flex-col w-full justify-center items-center">
          <div className="flex space-x-2 mb-4 flex-row">
            <div className="flex flex-row border rounded-md">
              <div className="flex flex-row items-center">
                <button className="ml-3">
                  <IoSearchSharp size={30} />
                </button>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value.trim())}
                  placeholder="Search"
                  className="px-5 py-3 outline-none text-2xl"
                />
              </div>
              <button
                onClick={handleNew}
                className="px-5 border text-2xl rounded-md font-bold bg-amber-400 text-center cursor-pointer"
              >
                Add-Node
              </button>
            </div>
          </div>

          <div className="flex justify-center items-start space-x-5 text-xl px-5 py-2 w-full">
            {datas
              ?.filter(
                (item) =>
                  search === '' ||
                  item.value.toLowerCase().includes(search.toLowerCase())
              )
              .map((item) => (
                <Tree
                  key={item.id}
                  branch={item}
                  depth={1}
                  add={handleData}
                  del={handleDelete}
                  edit={handleEdit}
                  swap={handleSwap}
                />
              ))}
          </div>
        </div>
      </DndContext>

      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <form onSubmit={editFormik.handleSubmit}>
          <DialogContent>
            <h1 className="text-lg mb-2 font-bold">Edit Branch Name</h1>
            <input
              name="editValue"
              value={editFormik.values.editValue}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
              className="border border-gray-500 px-2 py-1 rounded-md w-full"
              placeholder="Edit Name"
            />
            {editFormik.touched.editValue && editFormik.errors.editValue && (
              <div className="text-red-600 text-sm mt-1">
                {editFormik.errors.editValue}
              </div>
            )}
          </DialogContent>
          <div className="flex justify-center items-center">
            <DialogActions>
              <button
                type="submit"
                className="bg-amber-400 px-4 py-2 rounded-md cursor-pointer"
              >
                Save
              </button>
            </DialogActions>
          </div>
        </form>
      </Dialog>

      <Dialog open={add} onClose={() => setAdd(false)}>
        <DialogContent>
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center mb-5">
              <h1 className="font-bold text-xl">ADD FIRST NODE</h1>
            </div>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value.trim())}
              placeholder="Enter Name"
              className="px-5 py-3 outline-none text-2xl border border-gray-500 rounded-md w-full"
            />
            <button
              onClick={() => {
                if (input.trim()) {
                  handleData(null, input.trim());
                  setInput('');
                  setAdd(false);
                }
              }}
              className="px-5 border text-2xl cursor-pointer mt-5 py-2 rounded-md font-bold bg-amber-400 text-center"
            >
              Add
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Trash;
