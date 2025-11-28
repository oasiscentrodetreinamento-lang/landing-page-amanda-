import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../contexts/ContentContext';
import { SiteContent } from '../types';
import { Edit2, Image as ImageIcon, Check, X, Save } from 'lucide-react';

interface EditableTextProps {
  section: keyof SiteContent;
  field: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({ section, field, tag: Tag = 'p', className = '' }) => {
  const { content, updateContent, isAdmin } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState('');
  
  // @ts-ignore
  const value = content[section][field];

  const handleStartEdit = (e: React.MouseEvent) => {
    if (!isAdmin) return;
    e.stopPropagation();
    setTempValue(value);
    setIsEditing(true);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateContent(section, field, tempValue);
    setIsEditing(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="relative inline-block w-full min-w-[200px] z-50">
        <div className="flex flex-col gap-2 bg-white p-2 rounded-lg shadow-xl border-2 border-amanda-accent animate-fade-in">
           {Tag === 'p' || Tag === 'h1' || Tag === 'h2' ? (
             <textarea
               value={tempValue}
               onChange={(e) => setTempValue(e.target.value)}
               className="w-full p-2 text-gray-800 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-amanda-accent text-sm"
               rows={4}
               autoFocus
             />
           ) : (
             <input
               type="text"
               value={tempValue}
               onChange={(e) => setTempValue(e.target.value)}
               className="w-full p-2 text-gray-800 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-amanda-accent text-sm"
               autoFocus
             />
           )}
           <div className="flex justify-end gap-2">
             <button onClick={handleCancel} className="flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs font-bold hover:bg-gray-300">
               <X size={14} /> Cancelar
             </button>
             <button onClick={handleSave} className="flex items-center gap-1 px-3 py-1 bg-amanda-accent text-white rounded text-xs font-bold hover:bg-rose-600">
               <Check size={14} /> Salvar
             </button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative group inline-block ${isAdmin ? 'cursor-pointer' : ''}`} onClick={handleStartEdit}>
      <Tag className={`${className} ${isAdmin ? 'hover:outline-dashed hover:outline-2 hover:outline-amanda-accent/50 hover:bg-amanda-accent/5 rounded px-1 -mx-1 transition-all' : ''}`}>
        {value}
      </Tag>
      {isAdmin && (
        <span className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 bg-amanda-accent text-white p-1.5 rounded-full shadow-md transition-opacity z-10 pointer-events-none transform scale-75">
          <Edit2 size={12} />
        </span>
      )}
    </div>
  );
};

interface EditableImageProps {
  section: keyof SiteContent;
  field: string;
  className?: string;
  alt: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({ section, field, className, alt }) => {
  const { content, updateContent, isAdmin } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState('');

  // @ts-ignore
  const value = content[section][field];

  const handleStartEdit = (e: React.MouseEvent) => {
    if (!isAdmin) return;
    e.preventDefault();
    setTempValue(value);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateContent(section, field, tempValue);
    setIsEditing(false);
  };

  return (
    <div className="relative group w-full h-full">
      <img src={value} alt={alt} className={className} />
      
      {isAdmin && (
        <div className={`absolute inset-0 bg-black/60 transition-opacity flex flex-col items-center justify-center ${isEditing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
           {!isEditing ? (
             <button 
               onClick={handleStartEdit}
               className="bg-white text-amanda-dark px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-amanda-light hover:scale-105 transition-all shadow-lg text-sm"
             >
               <ImageIcon size={16} /> Alterar Imagem
             </button>
           ) : (
             <div className="bg-white p-4 rounded-xl w-[90%] max-w-sm shadow-2xl animate-fade-in-up">
               <div className="flex justify-between items-center mb-2">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">URL da Nova Imagem</label>
                 <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
               </div>
               <input 
                 type="text" 
                 value={tempValue}
                 onChange={(e) => setTempValue(e.target.value)}
                 className="w-full border border-gray-300 rounded p-2 text-sm mb-3 text-black focus:ring-2 focus:ring-amanda-accent focus:border-transparent outline-none"
                 placeholder="https://exemplo.com/imagem.jpg"
                 autoFocus
               />
               <div className="flex gap-2 justify-end">
                 <button onClick={handleSave} className="flex items-center gap-2 bg-amanda-accent text-white text-sm px-4 py-2 rounded font-bold hover:bg-rose-600 transition-colors w-full justify-center">
                   <Save size={16} /> Salvar Alteração
                 </button>
               </div>
             </div>
           )}
        </div>
      )}
    </div>
  );
};
