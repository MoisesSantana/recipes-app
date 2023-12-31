type MainContainerProps = {
  children: React.ReactNode;
}

export function MainContainer({ children }: MainContainerProps) {
  return (
    <main className="h-full min-h-[calc(100vh-80px)] mx-2">
      { children }
    </main>
  );
}