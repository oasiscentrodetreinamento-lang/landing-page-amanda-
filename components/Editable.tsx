import React, { useState, useRef } from 'react';
import { useContent } from '../contexts/ContentContext';
import { SiteContent } from '../types';
import { Edit2, Image as ImageIcon, Check, X, Save, Upload, AlertTriangle } from 'lucide-react';

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
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // @ts-ignore
  const value = content[section][field];

  const handleStartEdit = (e: React.MouseEvent) => {
    if (!isAdmin) return;
    e.preventDefault();
    setTempValue(value);
    setErrorMsg('');
    setIsEditing(true);
  };

  const handleSave = () => {
    updateContent(section, field, tempValue);
    setIsEditing(false);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Limite de tamanho (aprox 800KB) para não estourar o LocalStorage
      // Strings Base64 são 33% maiores que o arquivo original
      if (file.size > 800 * 1024) {
        setErrorMsg('A imagem é muito grande! Use imagens menores que 800KB para não pesar o site.');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setTempValue(reader.result);
          setErrorMsg('');
        }
      };
      reader.readAsDataURL(file);
    }
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
             <div className="bg-white p-4 rounded-xl w-[90%] max-w-sm shadow-2xl animate-fade-in-up cursor-default" onClick={(e) => e.stopPropagation()}>
               <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Editar Imagem</label>
                 <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
               </div>
               
               <div className="space-y-4">
                 {/* Opção 1: Upload */}
                 <div>
                   <input 
                     type="file" 
                     ref={fileInputRef}
                     className="hidden" 
                     accept="image/*"
                     onChange={handleFileChange}
                   />
                   <button 
                     onClick={handleFileClick}
                     className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300 hover:border-amanda-accent"
                   >
                     <Upload size={16} />
                     Upload do Computador
                   </button>
                   <p className="text-[10px] text-gray-400 mt-1 text-center">
                      Recomendado: 800x1200px (PNG Transparente) • Máx 800kb
                   </p>
                 </div>

                 <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-2 text-gray-300 text-xs">OU URL EXTERNA</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                 </div>

                 {/* Opção 2: URL */}
                 <div>
                   <input 
                     type="text" 
                     value={tempValue}
                     onChange={(e) => setTempValue(e.target.value)}
                     className="w-full border border-gray-300 rounded p-2 text-sm text-black focus:ring-2 focus:ring-amanda-accent focus:border-transparent outline-none"
                     placeholder="https://..."
                   />
                 </div>

                 {/* Preview Area */}
                 {tempValue && (
                   <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                     <img src={tempValue} className="w-full h-full object-cover opacity-50" alt="Preview" />
                     <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-600 bg-white/50">PREVIEW</div>
                   </div>
                 )}

                 {errorMsg && (
                   <div className="flex items-start gap-2 text-red-500 text-xs bg-red-50 p-2 rounded">
                     <AlertTriangle size={12} className="mt-0.5 shrink-0" />
                     <span>{errorMsg}</span>
                   </div>
                 )}

                 <div className="flex gap-2 justify-end pt-2">
                   <button onClick={handleSave} className="flex items-center gap-2 bg-amanda-accent text-white text-sm px-4 py-2 rounded-lg font-bold hover:bg-rose-600 transition-colors w-full justify-center shadow-lg shadow-rose-200">
                     <Save size={16} /> Salvar Alteração
                   </button>
                 </div>
               </div>
             </div>
           )}
        </div>
      )}
    </div>
  );
};