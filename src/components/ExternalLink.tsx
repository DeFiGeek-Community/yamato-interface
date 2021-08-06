import { HTMLProps, useCallback } from 'react';
import { ExternalLink as LinkIconFeather } from 'react-feather';
import styled from 'styled-components';

// A button that triggers some onClick result, but looks like a link.
export const LinkStyledButton = styled.button<{ disabled?: boolean }>`
  border: none;
  text-decoration: none;
  background: none;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme, disabled }) => (disabled ? theme.text2 : theme.primary1)};
  font-weight: 500;
  :hover {
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }
  :focus {
    outline: none;
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }
  :active {
    text-decoration: none;
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  /* color: ${({ theme }) => theme.primary1}; */
  font-weight: 500;
  :hover {
    text-decoration: underline;
  }
  :focus {
    outline: none;
    text-decoration: underline;
  }
  :active {
    text-decoration: none;
  }
`;

const LinkIconWrapper = styled.a`
  text-decoration: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;
  :hover {
    text-decoration: none;
    opacity: 0.7;
  }
  :focus {
    outline: none;
    text-decoration: none;
  }
  :active {
    text-decoration: none;
  }
`;

export const LinkIcon = styled(LinkIconFeather)`
  height: 16px;
  width: 18px;
  margin-left: 10px;
  stroke: ${({ theme }) => theme.blue1};
`;

/**
 * Outbound link that handles firing google analytics events
 */
export function ExternalLink({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & {
  href: string;
}) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      // don't prevent default, don't redirect if it's a new tab
      if (target === '_blank' || event.ctrlKey || event.metaKey) {
        // ReactGA.outboundLink({ label: href }, () => {
        //   console.debug('Fired outbound link event', href);
        // });
      } else {
        event.preventDefault();
        // send a ReactGA event and then trigger a location change
        // ReactGA.outboundLink({ label: href }, () => {
        //   window.location.href = href;
        // });
      }
    },
    [href, target]
  );
  return (
    <StyledLink
      target={target}
      rel={rel}
      href={href}
      onClick={handleClick}
      {...rest}
    />
  );
}

export function ExternalLinkIcon({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & {
  href: string;
}) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      // don't prevent default, don't redirect if it's a new tab
      if (target === '_blank' || event.ctrlKey || event.metaKey) {
        // ReactGA.outboundLink({ label: href }, () => {
        //   console.debug('Fired outbound link event', href);
        // });
      } else {
        event.preventDefault();
        // send a ReactGA event and then trigger a location change
        // ReactGA.outboundLink({ label: href }, () => {
        //   window.location.href = href;
        // });
      }
    },
    [href, target]
  );
  return (
    <LinkIconWrapper
      target={target}
      rel={rel}
      href={href}
      onClick={handleClick}
      {...rest}
    >
      <LinkIcon />
    </LinkIconWrapper>
  );
}
