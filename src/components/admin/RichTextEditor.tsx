"use client";

import { FaBold, FaItalic, FaListUl, FaLink, FaImage } from "react-icons/fa6";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    required?: boolean;
}

export default function RichTextEditor({
    value,
    onChange,
    label,
    required,
}: RichTextEditorProps) {
    const insertFormat = (tag: string) => {
        // Simple wrapper for now, can be upgraded to real WYSIWYG later
        const textarea = document.getElementById("editor-textarea") as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const selection = text.substring(start, end);
        const after = text.substring(end);

        let newText = "";
        if (tag === "b") newText = `${before}**${selection}**${after}`;
        if (tag === "i") newText = `${before}_${selection}_${after}`;
        if (tag === "ul") newText = `${before}\n- ${selection}${after}`;
        if (tag === "link") newText = `${before}[${selection}](url)${after}`;
        if (tag === "img") newText = `${before}![alt](url)${after}`;

        onChange(newText);
    };

    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-slate-300">
                    {label} {required && <span className="text-red-400">*</span>}
                </label>
            )}
            <div className="border border-slate-600 rounded-xl overflow-hidden bg-white/5">
                {/* Toolbar */}
                <div className="flex items-center gap-1 p-2 bg-slate-800 border-b border-slate-700">
                    <button
                        type="button"
                        onClick={() => insertFormat("b")}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                        title="Bold"
                    >
                        <FaBold />
                    </button>
                    <button
                        type="button"
                        onClick={() => insertFormat("i")}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                        title="Italic"
                    >
                        <FaItalic />
                    </button>
                    <div className="w-px h-6 bg-slate-700 mx-1" />
                    <button
                        type="button"
                        onClick={() => insertFormat("ul")}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                        title="List"
                    >
                        <FaListUl />
                    </button>
                    <button
                        type="button"
                        onClick={() => insertFormat("link")}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                        title="Link"
                    >
                        <FaLink />
                    </button>
                    <button
                        type="button"
                        onClick={() => insertFormat("img")}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                        title="Image"
                    >
                        <FaImage />
                    </button>
                </div>

                {/* Text Area */}
                <textarea
                    id="editor-textarea"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={15}
                    className="w-full p-4 bg-transparent text-white placeholder:text-slate-600 outline-none resize-y font-mono text-sm leading-relaxed"
                    required={required}
                    placeholder="এখানে লিখুন (Markdown supported)..."
                />
            </div>
            <p className="text-xs text-slate-500">
                * Markdown ফরম্যাট সমর্থিত। ছবি যোগ করতে Cloudinary URL ব্যবহার করুন।
            </p>
        </div>
    );
}
