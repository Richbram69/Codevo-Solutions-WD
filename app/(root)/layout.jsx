import { StreamVideoProvider } from "@/providers/StreamClientProvider";
import React from "react";
export const metadata = {
  title: "Zoom",
  description: "Video Calling App",
  icons: {
    icon: '/icons/logo.svg',
  }
};

const RootLayout = ({ children }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
