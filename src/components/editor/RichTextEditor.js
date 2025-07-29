import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { createEditor, Transforms, Editor, Element as SlateElement, Text, Range } from 'slate';
import { Slate, Editable, withReact, useFocused, useSelected } from 'slate-react';
import isUrl from 'is-url';
import { css } from '@emotion/css';

// Basit emoji listesi
const EMOJIS = ['😀','😂','😅','😍','👍','🙏','🎉','🔥'];

const RichTextEditor = ({ onChange }) => {
  const editor = useMemo(() => withImages(withLinks(withReact(createEditor()))), []);
  const [value, setValue] = useState(initialValue);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleChange = (newValue) => {
    setValue(newValue);
    onChange && onChange(newValue);
  };

  // Format toggle fonksiyonları
  const toggleMark = (format) => {
    const isActive = isMarkActive(format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };
  const isMarkActive = (format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const toggleBlock = (format) => {
    const isActive = isBlockActive(format);
    const isList = ['numbered-list', 'bulleted-list'].includes(format);

    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        ['numbered-list', 'bulleted-list'].includes(n.type),
      split: true,
    });

    const newType = isActive ? 'paragraph' : isList ? 'list-item' : format;

    Transforms.setNodes(editor, { type: newType });

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };

  const isBlockActive = (format) => {
    const [match] = Editor.nodes(editor, {
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    });
    return !!match;
  };

  // Klavye kısayolları
  const onKeyDown = (event) => {
    if (!event.ctrlKey) return;

    switch (event.key) {
      case 'b': event.preventDefault(); toggleMark('bold'); break;
      case 'i': event.preventDefault(); toggleMark('italic'); break;
      case 'u': event.preventDefault(); toggleMark('underline'); break;
      case '`': event.preventDefault(); toggleMark('code'); break;
      default: break;
    }
  };

  // Emoji ekle
  const insertEmoji = (emoji) => {
    Transforms.insertText(editor, emoji);
    setShowEmojiPicker(false);
  };

  // Resim ekleme fonksiyonları
  const insertImage = (url) => {
    if (!url) return;
    const text = { text: '' };
    const image = { type: 'image', url, children: [text] };
    Transforms.insertNodes(editor, image);
  };

  // Link ekleme fonksiyonları
  const insertLink = (url) => {
    if (!url) return;
    if (isLinkActive()) {
      unwrapLink();
    }
    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);

    const link = {
      type: 'link',
      url,
      children: isCollapsed ? [{ text: url }] : [],
    };

    if (isCollapsed) {
      Transforms.insertNodes(editor, link);
    } else {
      Transforms.wrapNodes(editor, link, { split: true });
      Transforms.collapse(editor, { edge: 'end' });
    }
  };

  const isLinkActive = () => {
    const [link] = Editor.nodes(editor, { match: n => n.type === 'link' });
    return !!link;
  };

  const unwrapLink = () => {
    Transforms.unwrapNodes(editor, { match: n => n.type === 'link' });
  };

  // Render fonksiyonları
  const renderElement = useCallback(props => {
    const { attributes, children, element } = props;
    switch (element.type) {
      case 'block-quote':
        return <blockquote {...attributes} className="pl-4 border-l-4 italic border-gray-300 text-gray-600">{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes} className="list-disc pl-5">{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes} className="text-2xl font-bold">{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes} className="text-xl font-semibold">{children}</h2>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes} className="list-decimal pl-5">{children}</ol>;
      case 'code':
        return <pre {...attributes} className="bg-gray-100 p-2 rounded"><code>{children}</code></pre>;
      case 'image':
        return <ImageElement {...props} />;
      case 'link':
        return <a {...attributes} href={element.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{children}</a>;
      default:
        return <p {...attributes}>{children}</p>;
    }
  }, []);

  const renderLeaf = useCallback(props => {
    let { children } = props;
    if (props.leaf.bold) children = <strong>{children}</strong>;
    if (props.leaf.code) children = <code className="bg-gray-200 rounded px-1">{children}</code>;
    if (props.leaf.italic) children = <em>{children}</em>;
    if (props.leaf.underline) children = <u>{children}</u>;
    if (props.leaf.strikethrough) children = <del>{children}</del>;
    return <span {...props.attributes}>{children}</span>;
  }, []);

  return (
    <div className="border rounded-lg p-4">
      {/* Toolbar */}
      <div className="mb-2 flex flex-wrap gap-1">
        <MarkButton format="bold" editor={editor} />
        <MarkButton format="italic" editor={editor} />
        <MarkButton format="underline" editor={editor} />
        <MarkButton format="strikethrough" editor={editor} />
        <BlockButton format="heading-one" editor={editor}>H1</BlockButton>
        <BlockButton format="heading-two" editor={editor}>H2</BlockButton>
        <BlockButton format="block-quote" editor={editor}>&ldquo;</BlockButton>
        <BlockButton format="numbered-list" editor={editor}>OL</BlockButton>
        <BlockButton format="bulleted-list" editor={editor}>UL</BlockButton>
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="px-2 py-1 border rounded"
          title="Emoji Ekle"
        >😊</button>
        <button
          onClick={() => {
            const url = prompt('Resim URL girin:');
            if (url && isUrl(url)) insertImage(url);
            else alert('Geçerli bir URL girin');
          }}
          className="px-2 py-1 border rounded"
          title="Resim Ekle"
        >🖼️</button>
        <button
          onClick={() => {
            const url = prompt('Link URL girin:');
            if (url && isUrl(url)) insertLink(url);
            else alert('Geçerli bir URL girin');
          }}
          className="px-2 py-1 border rounded"
          title="Link Ekle"
        >🔗</button>
      </div>

      {/* Emoji picker */}
      {showEmojiPicker && (
        <div className="mb-2 border p-2 rounded bg-white shadow max-w-xs flex flex-wrap gap-1">
          {EMOJIS.map(e => (
            <button
              key={e}
              onClick={() => insertEmoji(e)}
              className="text-xl p-1 hover:bg-gray-200 rounded"
            >
              {e}
            </button>
          ))}
        </div>
      )}

      <Slate editor={editor} value={value} onChange={handleChange}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Mesajınızı buraya yazın..."
          spellCheck
          autoFocus
          onKeyDown={onKeyDown}
        />
      </Slate>
    </div>
  );
};

// Image render
const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes} contentEditable={false} className="my-2">
      <img
        src={element.url}
        alt=""
        className={`rounded max-w-full ${selected && focused ? 'ring ring-blue-400 ring-2' : ''}`}
      />
      {children}
    </div>
  );
};

// Higher order function to add image support
const withImages = editor => {
  const { insertData, isVoid } = editor;

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = data => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          const url = reader.result;
          insertImage(editor, url);
        });
        reader.readAsDataURL(file);
      }
    } else if (isUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertImage = (editor, url) => {
  const text = { text: '' };
  const image = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
};

// Higher order function to add link support
const withLinks = editor => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.insertText = text => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = data => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const isLinkActive = editor => {
  const [link] = Editor.nodes(editor, { match: n => n.type === 'link' });
  return !!link;
};

const unwrapLink = editor => {
  Transforms.unwrapNodes(editor, { match: n => n.type === 'link' });
};

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

// Toolbar buton bileşenleri
const MarkButton = ({ format, editor }) => {
  const isActive = isMarkActive(editor, format);

  return (
    <button
      onMouseDown={e => {
        e.preventDefault();
        toggleMark(editor, format);
      }}
      className={`px-2 py-1 border rounded ${isActive ? 'bg-gray-300' : ''}`}
      title={format}
    >
      {format === 'bold' ? 'B' :
       format === 'italic' ? 'I' :
       format === 'underline' ? 'U' :
       format === 'strikethrough' ? 'S' : format}
    </button>
  );
};

const BlockButton = ({ format, editor, children }) => {
  const isActive = isBlockActive(editor, format);

  return (
    <button
      onMouseDown={e => {
        e.preventDefault();
        toggleBlock(editor, format);
      }}
      className={`px-2 py-1 border rounded ${isActive ? 'bg-gray-300' : ''}`}
      title={format}
    >
      {children}
    </button>
  );
};

// Yardımcı fonksiyonlar
const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });
  return !!match;
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = ['numbered-list', 'bulleted-list'].includes(format);

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      ['numbered-list', 'bulleted-list'].includes(n.type),
    split: true,
  });

  const newType = isActive ? 'paragraph' : isList ? 'list-item' : format;

  Transforms.setNodes(editor, { type: newType });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

// Başlangıç değeri
const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'Mesajınızı buraya yazın...' }],
  },
];

export default RichTextEditor;
