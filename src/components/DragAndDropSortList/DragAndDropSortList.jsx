import "./style.css";
import { DragDropManager } from "@dnd-kit/dom";
import { Sortable } from "@dnd-kit/dom/sortable";
import { useState, useEffect } from "react";

import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import Icon from "../../components/Icon/Icon.jsx";
import { CSS } from "@dnd-kit/utilities";// ... tes imports

export default function DragAndDropSortList({ itemsDefault, type, onChangeItems }) {
  // On transforme les items pour qu'ils aient TOUS une clé unique interne
  // On utilise l'index initial ou un timestamp pour garantir l'unicité au montage
  const [items, setItems] = useState(() => 
    itemsDefault.map((item, idx) => ({ ...item, internalId: `${item.id}-${idx}-${Math.random()}` }))
  );

  // On synchronise si itemsDefault change
  useEffect(() => {
    setItems(itemsDefault.map((item, idx) => ({ ...item, internalId: `${item.id}-${idx}` })));
  }, [itemsDefault]);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setItems((prevItems) => {
      // ON CHERCHE PAR internalId MAINTENANT
      const oldIndex = prevItems.findIndex((item) => item.internalId === active.id);
      const newIndex = prevItems.findIndex((item) => item.internalId === over.id);

      const newItems = arrayMove(prevItems, oldIndex, newIndex);
      if (onChangeItems) onChangeItems(newItems);
      return newItems;
    });
  }

  return (
    <div className="dragAndDropSortList">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {/* On passe la liste des internalId à SortableContext */}
        <SortableContext 
          items={items.map(i => i.internalId)} 
          strategy={verticalListSortingStrategy}
        >
          {items.map((item, index) => (
            <SortableItem
              key={item.internalId} // CLÉ UNIQUE
              id={item.internalId}  // ID POUR DND-KIT
              index={index}
              element={item}
              removeItem={() => {
                const newItems = items.filter((_, i) => i !== index);
                setItems(newItems);
                if (onChangeItems) onChangeItems(newItems);
              }}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableItem({ id, index, element, removeItem }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,    padding: "12px 12px 12px 64px",
    border: "1px solid #ccc",
    marginBottom: "8px",
    background: "white",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div className="sortableItem" ref={setNodeRef} style={style} {...attributes}>
      <span className="index">{index + 1}</span>
      <span className="name" {...listeners} style={{ cursor: 'grab', flexGrow: 1 }}>
              {element.name}
      </span>
      
      <div onClick={(e) => {
        e.stopPropagation();
        removeItem();
      }} style={{ cursor: 'pointer' }}>
        <Icon name="close-red-background" />
      </div>
    </div>
  );
}