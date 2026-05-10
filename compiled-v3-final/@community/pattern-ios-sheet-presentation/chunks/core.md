# IosSheetPresentation [pattern] v1.0.0
Present a .sheet or .fullScreenCover for a self-contained, discrete task; use .presentationDetents([.medium, .large]) for resizable partial-height sheets; always provide a cancel (cancellationAction) and confirm (confirmationAction) toolbar button.
domain: frontend-design

## Label
iOS Sheet Presentation for Scoped Tasks

## Problem
Full navigation pushes for short, bounded tasks (compose, filter, detail settings) feel heavy and break the sense of the user's current context.

## Solution
Attach .sheet(isPresented:) to the triggering view. Inside the sheet, embed a NavigationStack with a toolbar containing Cancel (dismisses) and Done/Send (confirms). For half-sheet content, add .presentationDetents([.medium, .large]) to allow user resize. Never disable swipe-to-dismiss unless unsaved changes exist — and even then, present a .confirmationDialog.
