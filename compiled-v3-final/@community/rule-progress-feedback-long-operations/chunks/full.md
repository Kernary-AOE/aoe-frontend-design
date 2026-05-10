# ProgressFeedbackLongOperations [rule] v1.0.0
Every operation that takes a noticeable amount of time must show an in-place loading indicator; multi-step operations must additionally display a count or percentage so users know how far they are.
> Any operation that takes ≥300ms from user action to completion must display a visible loading indicator adjacent to the affected UI element. For operations with countable steps (file upload, batch export, multi-file processing): show a progress description such as 'Uploading 2 of 5 files' or a numeric percentage. The indicator must appear before the first perceived delay — optimistically on the triggering action, not after a round-trip. On completion, replace the indicator with a success confirmation (checkmark, inline message, or toast) so users confirm the operation finished.
domain: frontend-design

## Applies To
- File upload (any size)
- Form save operations over a network
- Data export or report generation
- AI/LLM processing requests
- Any fetch that is not resolved in a single animation frame

## Counter Example
A button that freezes for 3 seconds with no visual change after click — user clicks again (duplicate request) or navigates away.

## Examples
-       {/* CORRECT — in-place indicator with count */}
      <button disabled={uploading} className="relative">
        {uploading ? (
          <>
            <Spinner size={14} className="mr-2" />
            Uploading {uploadedCount} of {totalFiles} files...
          </>
        ) : "Upload Files"}
      </button>
    

## Rationale
Silent waiting leaves users uncertain whether their action registered. This uncertainty causes duplicate submissions (re-clicking a button multiple times) and premature abandonment. The Doherty threshold is 400ms — beyond that, perceived wait time grows nonlinearly. Visible progress restores the user's sense of control and trust, and a progress description (2 of 5) leverages the goal-gradient effect: users commit harder as they see progress.

## Applies To
- File upload (any size)
- Form save operations over a network
- Data export or report generation
- AI/LLM processing requests
- Any fetch that is not resolved in a single animation frame

## Counter Example
A button that freezes for 3 seconds with no visual change after click — user clicks again (duplicate request) or navigates away.
