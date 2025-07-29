import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Transforms, Editor, Element as SlateElement } from 'slate'
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import { withHistory } from 'slate-history'
import isUrl from 'is-url'
import isHotkey from 'is-hotkey'
import { Button, Icon, Toolbar } from './components' // Kendi toolbar bileşenlerin

// 🔧 Plugin: Resim destekli editor
const withImages = editor => {
  const { insertData, isVoid } = editor

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        insertImage(editor, reader.result)
      })
      reader.readAsDataURL(file)
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

// 🔧 Util: Resim ekle
const insertImage = (editor, url) => {
  const text = { text: ' ' }
  const image = {
    type: 'image',
    url,
    children: [text],
  }
  Transforms.insertNodes(editor, image)
}

// 🔧 Util: Geçerli resim URL mi?
const isImageUrl = url => {
  if (!url || !isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(ext.toLowerCase())
}

// 🔘 Button: Resim ekle
const InsertImageButton = () => {
  const editor = useSlate()
  return (
    <Button
      onMouseDown={event => {
        event.preventDefault()
        const url = window.prompt('Resim URL girin:')
        if (!url) return
        insertImage(editor, url)
      }}
    >
      <Icon>image</Icon>
    </Button>
  )
}

// 📷 Element: Image render bileşeni
const Image = ({ attributes, element, children }) => {
  return (
    <div {...attributes} contentEditable={false} className="my-4">
      <img
        src={element.url}
        alt="Inserted"
        className="rounded-lg shadow-md max-w-full h-72"
      />
      {children}
    </div>
  );
};
// 🧱 Element türlerini işle
const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align || 'left' }

  switch (element.type) {
    case 'image':
      return (
        <Image attributes={attributes} element={element} children={children} />
      )
    case 'heading-one':
      return <h1 style={style} {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 style={style} {...attributes}>{children}</h2>
    case 'block-quote':
      return <blockquote style={style} {...attributes}>{children}</blockquote>
    case 'numbered-list':
      return (
        <ol className="list-decimal ml-6" style={style} {...attributes}>
          {children}
        </ol>
      )
    case 'bulleted-list':
      return (
        <ul className="list-disc ml-6" style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'list-item':
      return <li style={style} {...attributes}>{children}</li>
    case 'paragraph':
    default:
      return <p style={style} {...attributes}>{children}</p>
  }
}


// 🧱 Leaf türlerini işle (bold/italic vs.)
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) children = <strong>{children}</strong>
  if (leaf.code) children = <code>{children}</code>
  if (leaf.italic) children = <em>{children}</em>
  if (leaf.underline) children = <u>{children}</u>

  return <span {...attributes}>{children}</span>
}

// 🧠 Hotkey tanımları
const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

// 📝 Başlangıç değeri
const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'Resim eklemek için yukarıdan ikonuna tıklayın.' }],
  },
  {
    type: 'bulleted-list',
    children: [
      {
        type: 'list-item',
        children: [{ text: 'Liste öğesi 1' }],
      },
      {
        type: 'list-item',
        children: [{ text: 'Liste öğesi 2' }],
      },
    ],
  },
]

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()

  // Belirtilen blok format aktif mi kontrolü
  const isActive = isBlockActive(editor, format)

  return (
    <Button
      active={isActive}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

// Aktif blok tipini kontrol et
const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n =>
      SlateElement.isElement(n) &&
      (['left', 'center', 'right', 'justify'].includes(format)
        ? n.align === format
        : n.type === format),
  })
  return !!match
}


// Blok tipi toggle işlemi (liste ve hizalamalar dahil)
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isAlign = ['left', 'center', 'right', 'justify'].includes(format)
  const isList = ['numbered-list', 'bulleted-list'].includes(format)

  if (isAlign) {
    Transforms.setNodes(
      editor,
      { align: isActive ? undefined : format },
      { match: n => SlateElement.isElement(n) && Editor.isBlock(editor, n) }
    )
    return
  }

  if (isList) {
    // Önce var olan liste sarıcısını çıkar (ol/ul)
    Transforms.unwrapNodes(editor, {
      match: n =>
        SlateElement.isElement(n) &&
        ['numbered-list', 'bulleted-list'].includes(n.type),
      split: true,
    })

    // Liste zaten aktifse, paragraph olarak geri al
    if (isActive) {
      Transforms.setNodes(editor, { type: 'paragraph' }, {
        match: n => SlateElement.isElement(n) && n.type === 'list-item',
      })
      return
    }

    // Blokları list-item yap
    Transforms.setNodes(editor, { type: 'list-item' }, {
      match: n => SlateElement.isElement(n) && Editor.isBlock(editor, n),
    })

    // list-item'ları ol/ul ile sar
    Transforms.wrapNodes(
      editor,
      { type: format, children: [] },
      {
        match: n =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === 'list-item',
        split: true,
      }
    )


    return
  }

  // Diğer blok türleri (başlık, alıntı, paragraf vs.)
  Transforms.setNodes(
    editor,
    { type: isActive ? 'paragraph' : format, align: undefined },
    { match: n => SlateElement.isElement(n) && Editor.isBlock(editor, n) }
  )
}



const RichTextExample = ({ onChange }) => {
  const editor = useMemo(() => withImages(withHistory(withReact(createEditor()))), [])
  const [value, setValue] = useState(initialValue);

  // value değiştiğinde dışarı bildir
  const handleChange = newValue => {
    setValue(newValue)
    if (onChange) {
      onChange(newValue) // JSON formatında veriyi yolla
    }
  }

  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  return (
    <Slate editor={editor} value={value} onChange={handleChange}>
      <Toolbar>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />

        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />

        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" />

        <InsertImageButton />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Metin girin..."
        spellCheck
        autoFocus
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
    </Slate>
  )
}

// 🧩 Mark ekleme/çıkarma
const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)
  if (isActive) Editor.removeMark(editor, format)
  else Editor.addMark(editor, format, true)
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

// 🔘 Format butonu
const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

export default RichTextExample
