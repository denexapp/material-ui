import * as React from 'react';
import { Box as SystemBox, BoxProps as SystemBoxProps, createBox } from '@mui/system';
import { expectType } from '@mui/types';
import Box, { BoxProps as MaterialBoxProps } from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';

function ThemeValuesCanBeSpread() {
  <Box
    sx={(theme) => ({
      ...theme.typography.body1,
      color: theme.palette.primary.main,
    })}
  />;
  <Box
    sx={(theme) => ({
      ...theme.mixins.toolbar,
      color: theme.palette.primary.main,
    })}
  />;
  <Box
    sx={(theme) => ({
      ...theme.mixins.toolbar,
      color: 'primary.main',
    })}
  />;
}

// Compatibility with Material UI's Box
const defaultTheme = createTheme({});
const CustomBox = createBox({ defaultTheme });
expectType<typeof Box, typeof CustomBox>(CustomBox);

expectType<typeof SystemBox, typeof CustomBox>(CustomBox);

function ColorTest() {
  <Box
    sx={(theme) => ({
      color: theme.vars.palette.common.black,
      backgroundColor: theme.vars.palette.background.default,
    })}
  />;
}

function ComponentTest() {
  return <span />;
}

expectType<SystemBoxProps['component'], MaterialBoxProps['component']>('span');
expectType<SystemBoxProps['component'], MaterialBoxProps['component']>(ComponentTest);

function RefInferenceCompatibilityTest() {
  <Box
    ref={(node) => {
      expectType<HTMLDivElement | null, typeof node>(node);
    }}
  />;

  <Box
    component="button"
    ref={(node) => {
      expectType<HTMLButtonElement | null, typeof node>(node);
    }}
  />;
}

const ForwardedMaterialDiv = React.forwardRef<HTMLDivElement, { test?: string }>(
  function ForwardedMaterialDiv(props, ref) {
    return <div ref={ref} {...props} />;
  },
);

<Box
  component={ForwardedMaterialDiv}
  test="ok"
  ref={(node) => {
    expectType<HTMLDivElement | null, typeof node>(node);
  }}
/>;
