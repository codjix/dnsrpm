"use client";
import { useWindowScroll } from "@mantine/hooks";
import { Affix as MAffix, Transition, ActionIcon } from "@mantine/core";
import { Icon } from "@iconify/react";

const Affix = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <MAffix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <ActionIcon size="xl" variant="default" style={transitionStyles} onClick={() => scrollTo({ y: 0 })}>
              <Icon width={20} icon="tabler:arrow-up" />
            </ActionIcon>
          )}
        </Transition>
      </MAffix>
    </>
  );
};

export default Affix;
