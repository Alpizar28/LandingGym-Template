'use client';

import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Save } from 'lucide-react';
import sectionsData from '@/config/sections.schema.json';
import brandConfig from '@/config/brand.config.json';

// Helper component for sortable items
function SortableItem(props: { id: string; name: string; isActive: boolean; onToggle: (id: string) => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center justify-between p-4 mb-2 bg-white dark:bg-zinc-800 rounded-lg border ${props.isActive ? 'border-primary/50' : 'border-gray-200 dark:border-zinc-700 opacity-60'}`}
        >
            <div className="flex items-center gap-4">
                <button {...attributes} {...listeners} className="cursor-move text-gray-400 hover:text-gray-600">
                    <GripVertical size={20} />
                </button>
                <div>
                    <h3 className="font-medium">{props.name}</h3>
                    <p className="text-xs text-gray-500 capitalize">{props.id}</p>
                </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={props.isActive}
                    onChange={() => props.onToggle(props.id)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
        </div>
    );
}

export default function SectionsPage() {
    // Merge active sections with inactive ones to show full list
    // We prioritize active sections order, then append inactive ones
    const initialItems = [
        ...brandConfig.activeSections,
        ...sectionsData.sections
            .filter(s => !brandConfig.activeSections.includes(s.id))
            .map(s => s.id)
    ];

    const [items, setItems] = useState(initialItems);
    const [activeSet, setActiveSet] = useState(new Set(brandConfig.activeSections));

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id as string);
                const newIndex = items.indexOf(over.id as string);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    function handleToggle(id: string) {
        const newSet = new Set(activeSet);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setActiveSet(newSet);
    }

    function handleSave() {
        // Construct new configuration
        const newActiveSections = items.filter(id => activeSet.has(id));
        console.log('Saving configuration:', newActiveSections);
        // Here we would post to an API to save the config file
        alert('Configuration saved! (Check console)');
    }

    const getSectionName = (id: string) => {
        return sectionsData.sections.find(s => s.id === id)?.name || id;
    };

    return (
        <div className="max-w-3xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold">Manage Sections</h2>
                    <p className="text-gray-500">Drag to reorder, toggle to enable/disable.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="bg-primary text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-opacity-90"
                >
                    <Save size={20} />
                    Save Changes
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-2">
                        {items.map((id) => (
                            <SortableItem
                                key={id}
                                id={id}
                                name={getSectionName(id)}
                                isActive={activeSet.has(id)}
                                onToggle={handleToggle}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
