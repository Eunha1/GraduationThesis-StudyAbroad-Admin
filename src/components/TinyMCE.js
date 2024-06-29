import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef } from 'react';

function TinyMCE({ initialValue, handleData }) {
  const editorRef = useRef(initialValue);
  const init = {
    height: 300,
    statusbar: false,
    selector: 'textarea',
    plugins:
      'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
    toolbar:
      'undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl',
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
    image_title: true,
    automatic_uploads: true,
    file_picker_types: 'image',
    file_picker_callback: (cb, value, meta) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          const id = 'blobid' + new Date().getTime();
          const blobCache = editorRef.current.editorUpload.blobCache;
          const base64 = reader.result.split(',')[1];
          const blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);
          cb(blobInfo.blobUri(), { title: file.name });
        });
        reader.readAsDataURL(file);
      });
      input.click();
    },
  };
  useEffect(() => {
    handleData(initialValue);
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Editor
        initialValue={initialValue}
        apiKey="7pbp0q1x388w9uijeicyqsx8mau0qlgow813jazv7o1zbpcu"
        onInit={(event, editor) => (editorRef.current = editor)}
        init={init}
        onSubmit={() => handleData(editorRef.current.getContent())}
      />
    </div>
  );
}

export default TinyMCE;
