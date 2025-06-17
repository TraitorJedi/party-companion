import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function PlayerSidebar({ state, dispatch, open, onClose }) {
  return (
    <div
      className={`
        fixed inset-y-0 left-0 bg-gray-800 text-white w-64
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:w-32
      `}
    >
      <button
        className="md:hidden absolute top-2 right-2 p-2"
        onClick={onClose}
      >
        ✕
      </button>
      <h2 className="text-lg font-bold mb-2 p-2">Players</h2>
      <DragDropContext
        onDragEnd={(res) => {
          if (!res.destination) return;
          const arr = Array.from(state.players);
          const [moved] = arr.splice(res.source.index, 1);
          arr.splice(res.destination.index, 0, moved);
          dispatch({ type: "REORDER_PLAYERS", players: arr });
        }}
      >
        <Droppable droppableId="players">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="p-2 space-y-1 h-full overflow-auto"
            >
              {state.players.map((name, idx) => (
                <Draggable key={name} draggableId={name} index={idx}>
                  {(p) => (
                    <li
                      ref={p.innerRef}
                      {...p.draggableProps}
                      {...p.dragHandleProps}
                      className="bg-gray-700 rounded p-1 flex justify-between"
                    >
                      <span>{name}</span>
                      <span>{state.scores[name]}</span>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button
        onClick={() => dispatch({ type: "START_ROUND" })}
        className="mt-4 bg-green-500 w-full p-2 rounded text-center"
      >
        Start Round
      </button>
    </div>
  );
}