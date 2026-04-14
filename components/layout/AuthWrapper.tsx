export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Cột trái */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-tr from-indigo-700 to-indigo-500 items-center justify-center p-12 text-white">
        {/* Nội dung giới thiệu */}
        <div className="max-w-md space-y-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-indigo-600 font-bold text-xl">AI</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">
              SEO Dashboard
            </span>
          </div>
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold leading-tight">
              Unleash the Power of AI for your SEO
            </h1>
            <p className="text-indigo-100 text-lg leading-relaxed">
              Boost your rankings and streamline your content workflow with
              intelligent keyword analysis and real-time optimization.
            </p>
          </div>
          {/* Feature List */}
          <ul className="space-y-4 pt-4">
            {[
              "Real-time SEO content scoring",
              "AI-driven keyword suggestions",
              "Comprehensive growth analytics",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-indigo-50">
                <div className="w-5 h-5 rounded-full bg-indigo-400/30 flex items-center justify-center">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cột phải */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        {children}
      </div>
    </div>
  );
}
