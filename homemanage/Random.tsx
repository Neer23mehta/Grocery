"use client";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import Input from "../homemanage/Input";
import { FiPlus } from "react-icons/fi";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import { TextField } from "@mui/material";
import { Style } from "./Styles";

const MAX_LEVEL = 4;

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const renderNodes = (
  nodes: TreeNode[],
  path: number[] = [],
  onAdd: (path: number[]) => void,
  onEdit: (path: number[], name: string) => void,
  onDelete: (path: number[]) => void
) => {
  return nodes.map((node, index) => {
    const currentPath = [...path, index];
    const level = currentPath.length;

    return (
      <div key={currentPath.join("-")} className="list-decimal">
          {/* <hr className="left-0 w-4 h-0.5 bg-gray-200"></hr>  */}
          <DraggableNode
            node={node}
            currentPath={currentPath}
            level={level}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
          />
      </div>
    );
  });
};

const DraggableNode = ({
  node,
  currentPath,
  level,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const id = currentPath.join("-");
  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
  } = useDraggable({ id });

  const { setNodeRef: setDropRef, isOver } = useDroppable({ id });

  const combinedRef = (el) => {
    setDragRef(el);
    setDropRef(el);
  };

  const style = transform
    ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      zIndex: 50,
    }
    : {};

  return (
    <div className="relative ml-4">
      {/* Vertical line to parent */}
      {level > 1 && (
        <div
          className="absolute left-0 top-0 bottom-0 border-l-2 border-gray-500 list-decimal"
          style={{
            height: "100%",
            marginLeft: `${(level - 1) * 16}px`,
          }}
        />
      )}

      {/* Horizontal line to parent */}
      {level > 1 && (
        <div
          className="absolute top-4 left-0 border-t-2 border-gray-500 list-decimal"
          style={{
            width: "16px",
            marginLeft: `${(level - 1) * 16}px`,
          }}
        />
      )}

      <div
        ref={combinedRef}
        style={style}
        {...listeners}
        {...attributes}
        className={`relative my-3 ml-${level * 4} transition-all duration-200`}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-200 to-blue-100 border border-blue-300 shadow hover:shadow-md transition">
          <p className="font-semibold text-gray-800 text-lg">{node.name}</p>
          <div className="flex items-center gap-2">
            {level < MAX_LEVEL && (
              <button
                onClick={() => onAdd(currentPath)}
                className="text-green-600 border border-green-700 rounded-full p-1 hover:scale-110 transition"
                title="Add Child"
              >
                <FiPlus />
              </button>
            )}
            <button
              onClick={() => onEdit(currentPath, node.name)}
              className="text-yellow-600 border border-yellow-700 rounded-full p-1 hover:scale-110 transition"
              title="Edit"
            >
              <CiEdit />
            </button>
            <button
              onClick={() => onDelete(currentPath)}
              className="text-red-600 border border-red-700 rounded-full p-1 hover:scale-110 transition"
              title="Delete"
            >
              <RiDeleteBinLine />
            </button>
          </div>
        </div>
      </div>

      {node.children?.length > 0 && (
        <div className="ml-6 mt-2 border-l-2 border-gray-300 pl-4">
          {renderNodes(node.children, currentPath, onAdd, onEdit, onDelete)}
        </div>
      )}
    </div>
  );
};

const DropZone = () => {
  const { setNodeRef, isOver } = useDroppable({ id: "drop-zone" });

  return (
    <div
      ref={setNodeRef}
      className={`fixed top-6 right-8 z-50 w-[100px] h-[45px] rounded-lg text-2xl font-bold flex items-center justify-center shadow transition-all duration-150 ${isOver
          ? "bg-red-600 text-white scale-110"
          : "bg-red-400 text-white hover:scale-105"
        }`}
    >
      <RiDeleteBinLine />
    </div>
  );
};

const Random = () => {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState<TreeNode[]>([]);
  const [currentPath, setCurrentPath] = useState<number[]>([]);
  const [initialValue, setInitialValue] = useState("");
  const [search, setSearch] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleClose = () => {
    setOpen(false);
    setCurrentPath([]);
    setInitialValue("");
  };

  const setNodeByPath = (path: number[], newName: string) => {
    const updated = [...inputs];
    let node: { children?: TreeNode[] } = { children: updated };
    for (let i = 0; i < path.length - 1; i++) {
      node = node.children![path[i]];
    }
    node.children![path[path.length - 1]].name = newName;
    setInputs(updated);
  };

  const addNodeByPath = (path: number[], newName: string) => {
    const updated = [...inputs];
    let node: { children?: TreeNode[] } = { children: updated };
    for (let i = 0; i < path.length; i++) {
      node = node.children![path[i]];
    }
    if (!node.children) node.children = [];
    node.children.push({ name: newName, children: [] });
    setInputs(updated);
  };

  const handleSubmit = (value: string) => {
    if (currentPath.length === 0) {
      setInputs([...inputs, { name: value, children: [] }]);
    } else {
      const isEdit = currentPath.at(-1) !== "new";
      if (isEdit) {
        setNodeByPath(currentPath, value);
      } else {
        addNodeByPath(currentPath.slice(0, -1), value);
      }
    }
    handleClose();
  };

  const openAdd = (path: number[]) => {
    setInitialValue("");
    setCurrentPath([...path, "new" as any]);
    setOpen(true);
  };

  const openEdit = (path: number[], name: string) => {
    setInitialValue(name);
    setCurrentPath(path);
    setOpen(true);
  };

  const deleteNodeByPath = (path: number[]) => {
    const updated = [...inputs];
    let node: { children?: TreeNode[] } = { children: updated };
    for (let i = 0; i < path.length - 1; i++) {
      node = node.children![path[i]];
    }
    node.children!.splice(path[path.length - 1], 1);
    setInputs(updated);
  };

  const filterNodes = (nodes: TreeNode[], search: string): TreeNode[] => {
    return nodes
      .map((node) => {
        const matchesParent = node.name.toLowerCase().includes(search.toLowerCase());
        const filteredChildren = node.children
          ? filterNodes(node.children, search)
          : [];
        if (matchesParent || filteredChildren.length > 0) {
          return { ...node, children: filteredChildren };
        }
        return null;
      })
      .filter((node): node is TreeNode => node !== null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const sourcePath = active.id.toString().split("-").map(Number);
    const targetPath =
      over.id === "drop-zone"
        ? null
        : over.id.toString().split("-").map(Number);

    if (!targetPath) {
      const updated = [...inputs];
      let node: { children?: TreeNode[] } = { children: updated };
      for (let i = 0; i < sourcePath.length - 1; i++) {
        node = node.children![sourcePath[i]];
      }
      node.children!.splice(sourcePath[sourcePath.length - 1], 1);
      setInputs(updated);
      return;
    }

    setInputs((prev) => {
      const updated = JSON.parse(JSON.stringify(prev)) as TreeNode[];
      const getNode = (path: number[]): TreeNode => {
        let node: { children?: TreeNode[] } = { children: updated };
        for (let i = 0; i < path.length; i++) {
          node = node.children![path[i]];
        }
        return node as TreeNode;
      };

      const nodeA = getNode(sourcePath);
      const nodeB = getNode(targetPath);
      [nodeA.name, nodeB.name] = [nodeB.name, nodeA.name];
      return updated;
    });
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 py-10 px-6 relative">
        <DropZone />

        <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
          <TextField
            label="Search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            sx={Style}
            size="small"
            className="flex-1 mr-4"
          />
          <button
            onClick={() => {
              setOpen(true);
              setCurrentPath([]);
              setInitialValue("");
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold shadow hover:bg-blue-700 transition whitespace-nowrap"
          >
            + Add Name
          </button>
        </div>

        {open && (
          <Input
            open={open}
            handleClose={handleClose}
            onSubmit={handleSubmit}
            initialValue={initialValue}
          />
        )}

        <div className="mx-auto max-w-4xl">
          {renderNodes(
            filterNodes(inputs, search),
            [],
            openAdd,
            openEdit,
            deleteNodeByPath
          )}
        </div>
      </div>
    </DndContext>
  );
};

export default Random;
