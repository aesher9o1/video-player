import React, { useEffect, memo } from 'react'
import Quill from 'quill'

function Editor(props) {
    let editor

    useEffect(() => {
        editor = new Quill('#' + props.id, props.quillOptions)
        editor.on('text-change', function () {
            props.setEditor({
                instance: editor,
                text: editor.root.innerHTML
            })
        })

    }, [])


    return (
        <div id={props.id}></div>
    )
}

export default memo(Editor)