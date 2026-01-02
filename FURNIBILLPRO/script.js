const { useState, useEffect, useRef, createContext, useContext } = React;

/* ---------- Local Storage Helper ---------- */
const DB = {
  get: (key) => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key) => localStorage.removeItem(key),
};

/* ---------- Theme Context ---------- */
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(DB.get("theme") || "light");

  useEffect(() => {
    DB.set("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ---------- App ---------- */
function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">FurniBill Pro Loaded ✅</h1>
      </div>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
