import React, { useEffect, memo } from 'react'
import Quill from 'quill'

function Editor(props) {
    let editor

    useEffect(() => {
        editor = new Quill('.' + props.className, props.quillOptions)
        editor.on('text-change', function () {
            props.setEditor({
                instance: editor,
                text: editor.getText()
            })
        })

    }, [])


    return (
        <div className={props.className}></div>
    )
}

export default memo(Editor)