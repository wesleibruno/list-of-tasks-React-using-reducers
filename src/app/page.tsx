"use client";

import { listReducer } from "@/reducers/listReducer";
import { useReducer, useState } from "react";

export default function Home() {
  const [list, dispatch] = useReducer(listReducer, []);
  const [addField, setAddField] = useState("");

  const handleAdddButton = () => {
    if (addField.trim() === "") return false;
    dispatch({ type: "add", payload: { text: addField } });
    setAddField("");
  };

  const handleDoneCheckBox = (id: number) => {
    dispatch({ type: "toggleDone", payload: { id } });
  };

  const handleEditText = (id: number) => {
    const item = list.find((i) => i.id === id);
    if (!item) return false

    const newText = window.prompt('Editar Tarefa', item.text)
    if (!newText || newText.trim() === "") return false
    dispatch({ type: "editText", payload: { id, newText } });
  };

  const handleRemoveItem = (id: number) => {
    if(!window.confirm("Tem certeza que deseja remover esta tarefa?")) return false
    dispatch({ type: "remove", payload: { id } });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-4xl my-4">Lista de Tarefas</h1>
      <div className="max-w-2xl mx-auto flex rounded-md bg-gray-900 border border-gray-400 p-4 my-4">
        <input
          type="text"
          className="flex-1 rounded-md border border-white p-3 bg-transparent text-white"
          placeholder="Digite um item"
          value={addField}
          onChange={(e) => setAddField(e.target.value)}
        />
        <button onClick={handleAdddButton} className="p-4">
          Adicionar
        </button>
      </div>
      <ul className="max-w-2xl mx-auto">
        {list.map((item) => (
          <li
            key={item.id}
            className="flex items-center p-3 my-3 border-b border-gray-900"
          >
            <input
              type="checkbox"
              className="w-8 h-8 mr-6"
              defaultChecked={item.done}
              onClick={() => handleDoneCheckBox(item.id)}
              placeholder="Descrição da tarefa"
            />
            <p className="flex-1 text-lg truncate">{item.text}</p>
            <button
              className="mx-4 bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleEditText(item.id)}
            >
              Editar
            </button>
            <button
              className="mx-4 bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
