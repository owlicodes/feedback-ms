export const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">{children}</h2>
    </div>
  );
};
