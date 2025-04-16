export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl items-start min-h-screen my-auto flex mx-auto flex-col gap-12 ">
      {children}
    </div>
  );
}
