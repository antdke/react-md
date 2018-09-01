import * as React from "react";
import cn from "classnames";
import { Collapse } from "@react-md/transition";
import { List, IListProps, ListElement } from "@react-md/list";

export interface ITreeGroupProps extends IListProps {
  /**
   * An optional configurable enter duration. This defaults to the `Collapse`'s enter duration
   * of `250ms`.
   *
   * @docgen
   */
  enterDuration?: number;

  /**
   * An optional configurable leave duration. This defaults to the `Collapse`'s leave duration
   * of `200ms`.
   *
   * @docgen
   */
  leaveDuration?: number;

  /**
   * Boolean if the group should be removed from the DOM when the group is not expanded.
   *
   * @docgen
   */
  isEmptyCollapsed?: boolean;

  /**
   * Boolean if the group is currently expanded.
   *
   * @docgen
   */
  expanded: boolean;
}

export interface ITreeGroupDefaultProps {
  isEmptyCollapsed: boolean;
}

export type TreeGroupWithDefaultProps = ITreeGroupProps & ITreeGroupDefaultProps;

/**
 * The `TreeGroup` component is used to render a tree item's nested items whenever the `expanded` prop
 * is `true`. It uses the `Collapse` component behind the scenes to animate in-and-out of view and will
 * fully unrender when the `expanded` prop is `false`.
 */
const TreeGroup: React.SFC<ITreeGroupProps> = providedProps => {
  const {
    style,
    className,
    expanded,
    children,
    isEmptyCollapsed,
    enterDuration,
    leaveDuration,
    ...props
  } = providedProps as TreeGroupWithDefaultProps;

  return (
    <Collapse
      style={style}
      className={cn("rmd-tree-group", className)}
      collapsed={!expanded}
      isEmptyCollapsed={isEmptyCollapsed}
      enterDuration={enterDuration}
      leaveDuration={leaveDuration}
    >
      {({ refCallback, ...collapseProps }) => (
        <List {...props} role="group" {...collapseProps} ref={refCallback}>
          {children}
        </List>
      )}
    </Collapse>
  );
};

TreeGroup.defaultProps = {
  isEmptyCollapsed: true,
} as ITreeGroupDefaultProps;

export default TreeGroup;