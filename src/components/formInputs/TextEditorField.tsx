import React, { lazy, Suspense } from 'react';
import { useField, useFormikContext } from "formik";
import "react-quill/dist/quill.snow.css";
import { ITextEditorFieldProps } from '../../types/Interfaces';

const QuillWrapper = lazy(() => import('react-quill'));

export const TextEditorField = ({ ...props } : ITextEditorFieldProps) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuillWrapper
        className={props.className}
        theme="snow"
        value={field.value}
        onChange={(value) => setFieldValue(field.name, value)}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            ["link", "image", "video", "formula"],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
          ],
        }}
      />
    </Suspense>
  );
};