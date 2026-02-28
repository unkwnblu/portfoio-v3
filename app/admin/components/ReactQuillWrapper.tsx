import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// This wrapper intercepts the ref mechanism to prevent ReactQuill from attempting to use
// ReactDOM.findDOMNode, which was entirely removed in React 19, causing a crash.
const QuillWrapper = forwardRef<ReactQuill, ReactQuillProps>((props, ref) => {
    const quillRef = useRef<ReactQuill>(null);

    // Forward the internal ref out safely without triggering findDOMNode lifecycle hooks natively
    useEffect(() => {
        if (typeof ref === 'function') {
            ref(quillRef.current);
        } else if (ref) {
            (ref as React.MutableRefObject<ReactQuill | null>).current = quillRef.current;
        }
    }, [ref]);

    return <ReactQuill ref={quillRef} {...props} />;
});

QuillWrapper.displayName = 'QuillWrapper';

export default QuillWrapper;
