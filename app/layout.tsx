import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});

export const metadata: Metadata = {
  title: 'Note Hub',
  description: 'Application for creating and managing notes',

  openGraph: {
      title: 'Note Hub',
      description: 'Application for creating and managing notes',
      // url: 'https://08-zustand.vercel.app/',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub styling card',
        },
      ],
      type: 'website',
    },
};


export default function RootLayout({
  children,  
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
            <main>
              {children}
              {modal}  
            </main>                        
          <Footer />
        </TanStackProvider>  
      </body>
    </html>
  );
}
