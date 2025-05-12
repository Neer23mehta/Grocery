'use client';
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './Shortableitem';
import { v4 as uuidv4 } from 'uuid';

const TreeNode = ({ item, onEdit, onDelete, onAdd }) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(item.id, inputValue.trim());
      setInputValue('');
      setShowInput(false);
    }
  };

  return (
    <div className="p-2 mb-2 border rounded-md bg-white shadow-md">
      <div className="flex justify-between items-center space-x-2">
        <span>{item.value}</span>
        <div className="flex space-x-1">
          <button onClick={() => setShowInput(!showInput)} className="bg-green-500 px-2 text-white rounded">+</button>
          <button onClick={() => onEdit(item.id)} className="bg-blue-500 px-2 text-white rounded">✎</button>
          <button onClick={() => onDelete(item.id)} className="bg-red-500 px-2 text-white rounded">🗑</button>
        </div>
      </div>

      {showInput && (
        <div className="mt-2 flex space-x-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd();
            }}
            className="border px-2 py-1 rounded w-full"
            placeholder="Enter new node name"
          />
          <button onClick={handleAdd} className="bg-amber-400 px-2 rounded text-white">Add</button>
        </div>
      )}
    </div>
  );
};

const Random = () => {
  const [items, setItems] = useState([
    { id: uuidv4(), value: 'Root Node' }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      setItems((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleAdd = (id, value) => {
    const newItem = { id: uuidv4(), value };
    setItems((prev) => [...prev, newItem]);
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    const label = prompt('Enter new label');
    if (label) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, value: label } : item
        )
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              <TreeNode item={item} onAdd={handleAdd} onDelete={handleDelete} onEdit={handleEdit} />
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Random;
