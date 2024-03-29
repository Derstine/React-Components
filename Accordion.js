import React, { useState, useRef, useEffect } from "react";

export function Accordion({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === AccordionSegment) {
          return React.cloneElement(child, {
            segmentIndex: index + 1,
            activeIndex,
            setActiveIndex
          });
        }
        return child;
      })}
    </div>
  );
}

export function AccordionSegment({ children, segmentIndex, activeIndex, setActiveIndex }) {

  return (
    <div className="flex flex-col cursor-pointer" onClick={() => (segmentIndex !== activeIndex) ? setActiveIndex(segmentIndex) : setActiveIndex(0)}    >
      <div className="m-auto w-11/12 p-5 items-center max-w-5xl">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Heading) {
            return React.cloneElement(child, {
              active: segmentIndex === activeIndex
            });
          }
          if (React.isValidElement(child) && child.type === Panel) {
            return React.cloneElement(child, {
              active: segmentIndex === activeIndex
            });
          }
          return child;
        })}
      </div>
      <hr />
    </div>

  );
}

export function Heading({ children, active }) {
  return (
    <div
      className="flex items-center cursor-pointer"
    >
      <div className="flex-grow">
        <div className="text-left text-xl">{children}</div>
      </div>
      <p className="text-right text-xl pl-4">{active ? '-' : '+'}</p>
    </div>
  );
}

export function Panel({ children, active }) {
  const panelRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useEffect(() => {
    if (active && panelRef.current) {
      const panelHeight = panelRef.current.scrollHeight;
      setMaxHeight(`${panelHeight}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [active]);

  return (
    <div
      className={`overflow-hidden transition-all duration-700 ease-in-out`}
      style={{ maxHeight }}
      ref={panelRef}
    >
      {children}
    </div>
  );
}
