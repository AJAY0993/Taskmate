function AppHeader({ children }) {
  return (
    <header className="relative min-h-40 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      {children}
    </header>
  );
}

export default AppHeader;
