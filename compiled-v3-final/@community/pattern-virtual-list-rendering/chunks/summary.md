# VirtualListRendering [pattern] v1.0.0
Virtualized list rendering technique: only mount DOM nodes for visible rows plus a small overscan buffer, using scrollTop, itemHeight, and containerHeight to compute the visible window. Recommended libraries: @tanstack/react-virtual (lightweight) or react-window for fixed-size lists.
domain: frontend-design
