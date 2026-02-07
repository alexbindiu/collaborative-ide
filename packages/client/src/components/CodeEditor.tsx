import { useEffect, useState } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import * as Monaco from 'monaco-editor';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';

export const CodeEditor = () => {
  const [editor, setEditor] = useState<Monaco.editor.IStandaloneCodeEditor | null>(null);

  const [value, setValue] = useState<string>(
    "// Type your code here...\nconsole.log('Hello World');",
  );

  const handleEditorDidMount: OnMount = (editorInstance) => {
    setEditor(editorInstance);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setValue(value);
      // TODO hook in Yjs for collaboration
    }
  };

  useEffect(() => {
    if (!editor) return;

    const doc = new Y.Doc();

    const provider = new WebsocketProvider('ws://localhost:3000', 'collab/architecture-test', doc);

    const type = doc.getText('monaco');

    const binding = new MonacoBinding(
      type,
      editor.getModel()!,
      new Set([editor]),
      provider.awareness,
    );

    console.log('🔗 Yjs Connected');

    return () => {
      console.log('🔌 Disconnecting Yjs...');
      binding.destroy();
      provider.destroy();
      doc.destroy();
    };
  }, [editor]);

  return (
    <div className="h-full w-full bg-[#1e1e1e] rounded-lg overflow-hidden shadow-2xl border border-gray-700">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        defaultValue={value}
        theme="vs-dark"
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
        }}
      />
    </div>
  );
};
