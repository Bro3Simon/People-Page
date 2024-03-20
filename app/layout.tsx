import { ThemeRegistry } from "app/ThemeRegistry";
import { Children } from "app/types/commonProps";

import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    'A sample "People" page with integrated search and filtering capabilities, highlighting my proficiency in implementing these standard features using React, Next and GraphQL. Special emphasis was placed on ensuring accessibility and optimizing performance for an enhanced user experience.',
  title: "People Page",
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
