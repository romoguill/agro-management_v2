import './global.css';

export const metadata = {
  title: 'Agro Management',
  description: 'Manage your farming business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
