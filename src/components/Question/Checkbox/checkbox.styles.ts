import { css, styled } from "styled-components";

export const Label = styled.div<{ simple: boolean; id: string }>`
  ${({ theme, simple, id }) => {
    const commonStyles = css`
      display: flex;
      cursor: pointer;
    `;
    const normal = css`
      ${commonStyles}
      align-items: center;
      background-color: ${simple ? "transparent" : theme.shade.b};
      border-radius: ${theme.spacing.xxs};
      padding: ${theme.spacing.md};
      margin: 0px 0px 10px 0px;
    `;
    const legal = css`
      ${commonStyles}
    `;
    return id === "terms" || id === "privacy" ? legal : normal;
  }}
`;

export const StyledCheckbox = styled.input<{ id: string; checked: boolean }>`
  ${({ id, checked }) => {
    const commonStyles = css`
      background-color: ${checked ? "red" : "transparent"};
      margin: 0px 10px 0px 0px;
      height: 20px;
      width: 20px;
    `;
    const legalStyles = css`
      margin-bottom: 24px;
    `;
    return id === "terms" || id === "privacy"
      ? css`
          ${commonStyles}
          ${legalStyles}
        `
      : commonStyles;
  }}
`;

export const StyledLabel = styled.label<{ simple: boolean }>`
  ${({ theme, simple }) => css`
    font-size: ${simple ? theme.fontsize.body : theme.fontsize.label};
    line-height: ${simple ? "16px" : "24px"};
    font-weight: ${theme.fontweight.medium};
    width: 100%;
  `}
`;

export const OverflowContainer = styled.div<{ overflowEnabled?: boolean }>`
  ${({ theme, overflowEnabled }) => css`
    @media screen and (min-width: ${theme.device.desktop}) {
      ${overflowEnabled ? `height: 320px;` : ""}
      overflow: ${overflowEnabled ? "auto" : "visible"};
    }
    @media screen and (max-width: ${theme.device.desktop}) {
      margin-bottom: 100px;
    }
  `}
`;

export const StyledDivider = styled.div`
  ${({ theme }) => css`
    margin: 24px 0;
    background-color: ${theme.shade.d};
    border-color: ${theme.secondary.divider};
    color: ${theme.secondary.divider};
    height: 1px;
    border: 0;
  `}
`;

export const BlueBoldLink = styled.a`
  ${({ theme }) => css`
    color: ${theme.secondary.i};
    font-weight: ${theme.fontweight.heavy};
  `}
`;
