import clsx from "clsx";
import React from "react";
import "../../styles/Container.sass";

type ContainerProps = {
  children: React.ReactNode;
  paddings?: boolean;
};

const Container = ({ children, paddings }: ContainerProps) => {
  return <div className={clsx("container", paddings ? "paddings" : "")}>{children}</div>;
};

export default Container;
