interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="text-center mb-12">
      <h1 className="font-display text-5xl text-amber-900 mb-2">{title}</h1>
      <p className="text-amber-700/80 text-lg">{subtitle}</p>
    </header>
  );
}
