interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="bg-green-500 hover:brightness-90 px-4 py-2 rounded text-white" {...props}>
      {children}
    </button>
  );
}
