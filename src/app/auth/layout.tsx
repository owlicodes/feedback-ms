export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="mx-auto w-[500px]">{children}</div>
    </div>
  );
}
