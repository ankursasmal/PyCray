import './styles.css';
import { DesignSystemProvider, fonts } from '@repo/design-system';
import type { ReactNode } from 'react';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <body>
      <DesignSystemProvider>
        {children}
      </DesignSystemProvider>
    </body>
  </html>
);

export default RootLayout;
