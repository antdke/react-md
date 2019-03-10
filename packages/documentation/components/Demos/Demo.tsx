import React, { FunctionComponent, ReactNode } from "react";
import { AppBar } from "@react-md/app-bar";
import { CodeSVGIcon } from "@react-md/material-icons";

import AppBarAction from "components/AppBarAction";
import Heading from "components/Heading";
import { Markdown } from "components/Markdown";
import GithubLink from "components/GithubLink";

import "./demo.scss";
import FullPageDemo from "./FullPageDemo";

export interface IDemoProps {
  id: string;
  name: string;
  description: string;
  fullPage?: boolean;

  /**
   * This should be the demo content to display.
   */
  children: ReactNode;
}

type WithDefaultProps = IDemoProps & Required<Pick<IDemoProps, "fullPage">>;

const Demo: FunctionComponent<IDemoProps> = props => {
  const {
    id,
    name,
    description,
    fullPage,
    children,
  } = props as WithDefaultProps;
  return (
    <section id={id} className="demo">
      <Heading level={2} id={`${id}-title`}>
        {name}
      </Heading>
      <Markdown id={`${id}-description`} className="demo__description">
        {description}
      </Markdown>
      <AppBar id={`${id}-preview-toolbar`} theme="clear">
        <AppBarAction
          id={`${id}-show-code`}
          first
          tooltip="Show the code for this example"
        >
          <CodeSVGIcon />
        </AppBarAction>
        <GithubLink id={`${id}-github`} />
      </AppBar>
      <div id={`${id}-preview`} className="demo__preview">
        {fullPage ? (
          <FullPageDemo id={`${id}-preview`}>{children}</FullPageDemo>
        ) : (
          children
        )}
      </div>
    </section>
  );
};

Demo.defaultProps = {
  fullPage: false,
};

export default Demo;