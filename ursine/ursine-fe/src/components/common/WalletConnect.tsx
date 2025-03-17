"use client";

import { ConnectButton } from "thirdweb/react";
import { client } from "../../app/client";
import styled from "@emotion/styled";

const StyledConnectButtonWrapper = styled.div`
  .connect-button {
    background: var(--button-berry);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
  }

  .connect-button:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export function WalletConnect() {
  return (
    <StyledConnectButtonWrapper>
      <ConnectButton
        theme="dark"
        client={client}
      />
    </StyledConnectButtonWrapper>
  );
} 