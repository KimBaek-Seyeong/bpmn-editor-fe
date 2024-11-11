interface MainLayoutProps {
    children: React.ReactNode;
  }
  
  const MainLayout = ({ children }: MainLayoutProps) => {
    return (
      <div className="flex flex-col h-screen w-screen bg-gray-100">
        <header className="h-16 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <h1 className="text-xl font-bold">BPMN Editor</h1>
          </div>
        </header>
  
        <main className="flex-1 overflow-hidden p-4">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    );
  };
  
  export default MainLayout;