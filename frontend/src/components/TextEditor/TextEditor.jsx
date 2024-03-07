import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((module) => module.Editor),
    {
        ssr: false,
    }
);

function TextEditor() {
    return (
        <div>
            <h1>Text Editor</h1>
            <Editor/>
        </div>
    )
}


export default TextEditor;