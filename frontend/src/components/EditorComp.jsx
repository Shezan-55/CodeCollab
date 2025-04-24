import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

const EditorComp = ({socketRef,roomId, onCodeChange}) => {
  const editorRef = useRef(null);

  useEffect(() => {
    async function init() {

      editorRef.current =  Codemirror.fromTextArea(editorRef.current, {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        
      });

      editorRef.current.setSize("100%", "100vh");
      editorRef.current.on('change',(instance, changes)=>{
        const {origin}=changes
        const {from} =changes
        const code =instance.getValue()
        onCodeChange(code)
        if(origin !=='setValue')
        {
          socketRef.current.emit('code_change',{
            roomId,
            code,
            from
          })
        }
      })


     

    }



    init();
  }, []);


  
  useEffect(()=>{

    if(socketRef.current)
    {
      socketRef.current.on('code_change',({code,from})=>{
        if(code !== null)
        {
          
          editorRef.current.setValue(code)
              
          // Get the line and position from editor and update cursor using that 
          const line = from?.line;
          const ch = from?.ch; 
          
          if (line !== undefined) {
            editorRef.current.setCursor({ line: line, ch: ch+1, sticky: 'before' });
          }

          
        }
      })
    }

    //celeaning function
    return()=>{
      socketRef.current.off('code_change')
    }

  },[socketRef.current])


  return <textarea id="realtimeEditor" ref={editorRef}></textarea>;
};

export default EditorComp;
