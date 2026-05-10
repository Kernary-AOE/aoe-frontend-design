# FileUploadDropzone [pattern] v1.0.0
A bordered drop region that accepts files via drag-drop, click-to-browse, or paste. Shows per-file progress, validates type/size before upload, and surfaces errors inline.
domain: frontend-design

## Facts

## Label
File Upload Dropzone

## Problem
A bare `<input type='file'>` is hard to discover and gives no feedback during upload. Users need a large, obvious target plus per-file progress and the ability to retry or remove failed files.

## Solution
A large dashed-border region containing icon + 'Drag files here, or browse'. Clicking opens the native picker; dragging files highlights the zone; on drop, files validate and queue with progress bars.

## Structure
```
    <section aria-labelledby="upload-title">
      <h2 id="upload-title">Upload attachments</h2>

      <label
        class="dropzone"
        data-state="idle"
        for="file-input"
      >
        <svg aria-hidden="true"><!-- cloud-up icon --></svg>
        <span class="cta">Drag files here, or click to browse</span>
        <span class="hint">PNG, JPG, PDF up to 25 MB</span>
        <input
          id="file-input"
          type="file"
          multiple
          accept=".png,.jpg,.jpeg,.pdf"
          class="sr-only"
        />
      </label>

      <ul role="list" class="upload-queue" aria-label="Upload queue">
        <li data-state="uploading">
          <span class="name">design-system.pdf</span>
          <progress value="42" max="100" aria-label="design-system.pdf, 42 percent">42%</progress>
          <button aria-label="Cancel design-system.pdf">Cancel</button>
        </li>
        <li data-state="error">
          <span class="name">huge-video.mov</span>
          <span class="err" role="alert">Too large (180 MB / 25 MB max)</span>
          <button aria-label="Remove huge-video.mov">Remove</button>
        </li>
        <li data-state="done">
          <span class="name">logo.png</span>
          <span class="ok" aria-label="Uploaded">Uploaded</span>
          <button aria-label="Remove logo.png">Remove</button>
        </li>
      </ul>
    </section>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- On dragover/dragenter, set `data-state='hover'` and prevent default to allow drop.
- On drop, validate type (against accept) and size before starting upload — reject invalid with inline error.
- Each file gets a queue row with name, progress bar, and Cancel button.
- Failed uploads show error + Retry; allow remove to clear the row.
- Support paste (Cmd+V image) on the page to add to queue when dropzone is focused.
- Click the dropzone label opens native picker (label wraps the input).
- Disable form submit while any upload is in progress.

## A11y
- The clickable region must wrap or be a `<label>` linked to the file input — do not use a div with onclick.
- Each progress bar uses `<progress>` with `aria-label` including the filename and percent.
- Errors per file use `role='alert'` so they announce when set.
- Cancel/Remove buttons need names that include the filename: 'Cancel design-system.pdf'.
- Dropzone state changes (hover/error) must not rely on color alone — change icon or text too.

## Examples
- @community/example-figma-image-upload
- @community/example-notion-attach
- @community/example-uploadthing-demo

## Label
File Upload Dropzone

## Problem
A bare `<input type='file'>` is hard to discover and gives no feedback during upload. Users need a large, obvious target plus per-file progress and the ability to retry or remove failed files.

## Solution
A large dashed-border region containing icon + 'Drag files here, or browse'. Clicking opens the native picker; dragging files highlights the zone; on drop, files validate and queue with progress bars.

## Structure
```
    <section aria-labelledby="upload-title">
      <h2 id="upload-title">Upload attachments</h2>

      <label
        class="dropzone"
        data-state="idle"
        for="file-input"
      >
        <svg aria-hidden="true"><!-- cloud-up icon --></svg>
        <span class="cta">Drag files here, or click to browse</span>
        <span class="hint">PNG, JPG, PDF up to 25 MB</span>
        <input
          id="file-input"
          type="file"
          multiple
          accept=".png,.jpg,.jpeg,.pdf"
          class="sr-only"
        />
      </label>

      <ul role="list" class="upload-queue" aria-label="Upload queue">
        <li data-state="uploading">
          <span class="name">design-system.pdf</span>
          <progress value="42" max="100" aria-label="design-system.pdf, 42 percent">42%</progress>
          <button aria-label="Cancel design-system.pdf">Cancel</button>
        </li>
        <li data-state="error">
          <span class="name">huge-video.mov</span>
          <span class="err" role="alert">Too large (180 MB / 25 MB max)</span>
          <button aria-label="Remove huge-video.mov">Remove</button>
        </li>
        <li data-state="done">
          <span class="name">logo.png</span>
          <span class="ok" aria-label="Uploaded">Uploaded</span>
          <button aria-label="Remove logo.png">Remove</button>
        </li>
      </ul>
    </section>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- On dragover/dragenter, set `data-state='hover'` and prevent default to allow drop.
- On drop, validate type (against accept) and size before starting upload — reject invalid with inline error.
- Each file gets a queue row with name, progress bar, and Cancel button.
- Failed uploads show error + Retry; allow remove to clear the row.
- Support paste (Cmd+V image) on the page to add to queue when dropzone is focused.
- Click the dropzone label opens native picker (label wraps the input).
- Disable form submit while any upload is in progress.

## A11y
- The clickable region must wrap or be a `<label>` linked to the file input — do not use a div with onclick.
- Each progress bar uses `<progress>` with `aria-label` including the filename and percent.
- Errors per file use `role='alert'` so they announce when set.
- Cancel/Remove buttons need names that include the filename: 'Cancel design-system.pdf'.
- Dropzone state changes (hover/error) must not rely on color alone — change icon or text too.

## Compatible
- @community/pattern-inline-validation
- @community/pattern-toast-stack
