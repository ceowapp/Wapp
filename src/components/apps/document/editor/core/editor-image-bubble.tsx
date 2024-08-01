// src/components/apps/document/editor/core/editor-image-bubble.tsx
import { BubbleMenu, useCurrentEditor } from "@tiptap/react";
import { useMemo, useRef, useEffect, forwardRef } from "react";
import type { BubbleMenuProps } from "@tiptap/react";
import type { ReactNode } from "react";
import type { Instance, Props } from "tippy.js";

export interface EditorImageBubbleProps extends Omit<BubbleMenuProps, "editor"> {
  readonly children: ReactNode;
}

export const EditorImageBubble = forwardRef<HTMLDivElement, EditorImageBubbleProps>(
  ({ children, tippyOptions, ...rest }, ref) => {
    const { editor: currentEditor } = useCurrentEditor();
    const instanceRef = useRef<Instance<Props> | null>(null);

    useEffect(() => {
      if (!instanceRef.current || !tippyOptions?.placement) return;

      instanceRef.current.setProps({ placement: tippyOptions.placement });
      instanceRef.current.popperInstance?.update();
    }, [tippyOptions?.placement]);

    const bubbleMenuProps: Omit<BubbleMenuProps, "children"> = useMemo(() => {
      const shouldShow: BubbleMenuProps["shouldShow"] = ({ editor, state }) => {
        const { selection } = state;
        const { empty } = selection;
        return editor.isActive('image');
      };

      return {
        shouldShow,
        tippyOptions: {
          onCreate: (val) => {
            instanceRef.current = val;
          },
          moveTransition: "transform 0.15s ease-out",
          ...tippyOptions,
        },
        ...rest,
      };
    }, [rest, tippyOptions]);

    if (!currentEditor) return null;

    return (
      <div ref={ref}>
        <BubbleMenu editor={currentEditor} {...bubbleMenuProps}>
          {children}
        </BubbleMenu>
      </div>
    );
  }
);

EditorImageBubble.displayName = "EditorImageBubble";
export default EditorImageBubble;
