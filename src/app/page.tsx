"use client";
import { listReducer } from "@/reducers/listReducer";
import { ChangeEvent, useReducer, useState } from "react";

export default function Home() {
  const [list, dispatch] = useReducer(listReducer, []);
  const [addField, setAddField] = useState("");
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState<number>(-1); // Inicializado com -1 ou outro valor que represente "nenhum item selecionado"

  const handleAddClick = () => {
    dispatch({ type: "add", payload: { text: "Novo item" } });
  };

  const handleAddButton = () => {
    if (addField.trim() === "") return false;
    dispatch({ type: "add", payload: { text: addField } });
    setAddField("");
  };

  const handleEditButton = (id: number, newText: string) => {
    setEditingItem(id);
    dispatch({ type: "editText", payload: { id: id, newText: newText } });
  };

  const handleRemoveButton = (id: number) => {
    setItemIdToDelete(id);
    setShowModal(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    dispatch({
      type: "editText",
      payload: { id: id, newText: e.target.value },
    });
  };

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    id: number
  ) => {
    if (event.key === "Enter") {
      setEditingItem(null);
    }
  };

  const handleConfirmDelete = () => {
    // Implemente a lógica para remover o item com o id fornecido
    // Após a remoção, feche o modal
    dispatch({ type: "remove", payload: { id: itemIdToDelete } });
    setShowModal(false);
    setItemIdToDelete(-1); // Resetar o itemIdToDelete após a remoção
  };

  const handleCancelDelete = () => {
    // Feche o modal sem remover o item
    setShowModal(false);
    setItemIdToDelete(-1); // Resetar o itemIdToDelete sem remoção
  };

  const handleDoneCheckBox = (id: number) => {
    dispatch({ type: "toggleDone", payload: { id: id } });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl text-center mt-4">Lista de Tarefas</h1>
      <div className="max-w-2xl mx-auto  flex border bg-gray-900 border-gray-400 p-4 my-4">
        <input
          className="flex-1 rounded-md border border-white p-3 bg-transparent text-white outline-none"
          type="text"
          placeholder="Digite um item"
          value={addField}
          onChange={(e) => setAddField(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddButton()}
        />
        <button className="p-4" onClick={handleAddButton}>
          Adicionar
        </button>
      </div>
      <ul className="max-w-2xl mx-auto">
        {list.map((item) => (
          <li className="flex p-3 my-3 border-b border-gray-700" key={item.id}>
            <input
              type="checkbox"
              className="w-6 h-6 mr-4"
              defaultChecked={item.done}
              onClick={() => handleDoneCheckBox(item.id)}
            />
            {editingItem === item.id ? (
              <input
                className="flex-1 text-lg text-black"
                type="text"
                value={item.text}
                onChange={(e) => handleInputChange(e, item.id)}
                onKeyDown={(e) => handleInputKeyDown(e, item.id)}
              />
            ) : (
              <p className="flex-1 text-lg">{item.text}</p>
            )}
            <button
              className="mx-4 text-white hover:text-gray-500"
              onClick={() => {
                if (editingItem === item.id) {
                  const fakeEvent = { key: "Enter" };
                  handleInputKeyDown(
                    fakeEvent as React.KeyboardEvent<HTMLInputElement>,
                    item.id
                  );
                } else {
                  handleEditButton(item.id, item.text);
                }
              }}
            >
              {editingItem === item.id ? "[salvar]" : "[editar]"}
            </button>
            <button
              className="mx-4 text-white hover:text-gray-500"
              onClick={() => handleRemoveButton(item.id)}
            >
              [excluir]
            </button>
          </li>
        ))}
      </ul>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
          <div className="bg-white p-8 rounded-lg z-50">
            <p className="text-black text-2xl">
              Tem certeza que deseja excluir?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-4"
                onClick={handleConfirmDelete}
              >
                Sim
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                onClick={handleCancelDelete}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
