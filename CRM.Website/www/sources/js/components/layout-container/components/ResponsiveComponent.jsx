import React, { useState, useEffect } from "react";

const ResponsiveComponent = (props) => {
  const defaultLeftWidth = 422;
  const actualLeftRow = document.getElementById("left-row-container")
    ? document.getElementById("left-row-container").offsetWidth
    : defaultLeftWidth;
  const actualRightWidth = props.isShowingLeftPanel
    ? window.innerWidth - actualLeftRow
    : window.innerWidth;
  const [windowWidth, setWindowWidth] = useState(actualRightWidth);

  const handleResize = () => {
    const actualRightWidth = props.isShowingLeftPanel
      ? window.innerWidth -
        document.getElementById("left-row-container").offsetWidth
      : window.innerWidth;
    setWindowWidth(actualRightWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getClassNameBaseOnWidth = () => {
    let className = "";
    switch (true) {
      case windowWidth >= 1680:
        className = "extra-large-desktops";
        break;
      case windowWidth >= 1440 && windowWidth < 1680:
        className = "large-desktops";
        break;
      case windowWidth >= 1200 && windowWidth < 1440:
        className = "medium-desktops";
        break;
      default:
        className = "small-desktops";
        break;
    }
    return className;
  };
  const className = getClassNameBaseOnWidth();
  return (
    <div className={className}>
          <div className={(props.isShowingLeftPanel && props.username !== null) ? 'show-left-panel' : ''}>{props.children}</div>
    </div>
    );
};

export default ResponsiveComponent;
