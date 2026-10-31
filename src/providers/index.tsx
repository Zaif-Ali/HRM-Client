import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { useTheme } from 'next-themes';
import { ThemeProvider } from './theme-provider';
import TenStackQueryDevelopmentTools from '@/utils/development-tools/TenStackQueryDevelopmentTools';

// Provider Props
type ProviderProps = { children: React.ReactNode };

// client for queries
const queryClient = new QueryClient();

function ThemeColor() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const color = resolvedTheme === 'dark' ? '#09090b' : '#f7f7f8';
    const metas = document.querySelectorAll('meta[name="theme-color"]');
    const meta = metas[0] ?? document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    meta.setAttribute('content', color);
    meta.removeAttribute('media');
    if (!meta.parentElement) document.head.appendChild(meta);
    metas.forEach((node) => {
      if (node !== meta) node.remove();
    });
  }, [resolvedTheme]);

  return null;
}

function ThemedToaster() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      richColors
    />
  );
}

const Provider = (props: ProviderProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeColor />
          <ThemedToaster />
          {props.children}
          <TenStackQueryDevelopmentTools />
        </QueryClientProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
};

export default Provider;