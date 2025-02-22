import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: React.ReactElement;
  activeClassName: string;
  href: string;
}

export function ActiveLink({ children, activeClassName, ...props }: ActiveLinkProps) {
  const { asPath } = useRouter();
  const className = asPath === props.href ? activeClassName : '';

  return <Link {...props}>{cloneElement(children, { className })}</Link>;
}
