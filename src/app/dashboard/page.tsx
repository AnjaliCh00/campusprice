export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 bg-slate-900 text-white min-h-screen">
      {/* Top Cards */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {/* Card 1 */}
        <div className="bg-slate-800 rounded-lg shadow-lg p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-2">hello</h2>
          <p className="text-sm text-slate-400">
            A creative UI/UX designer passionate about crafting intuitive and
            modern web interfaces. Loves minimalist dark themes.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-800 rounded-lg shadow-lg p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-2">helloo</h2>
          <p className="text-sm text-slate-400">
            Full-stack developer who enjoys building robust and scalable apps
            with Next.js and Prisma. Prefers clean and efficient code.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-800 rounded-lg shadow-lg p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Campus Price Project</h2>
          <p className="text-sm text-slate-400">
            An innovative platform designed to compare and analyze college
            product pricing across India.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-slate-800 min-h-[100vh] flex-1 rounded-lg md:min-h-min shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">About the Team</h2>
        <p className="text-slate-300 leading-relaxed">
          Campus Price is a collaborative effort by Anjali Choudhary and Rahul Singh.
          Together they aim to simplify campus commerce through intelligent design
          and efficient engineering. Their mission is to create transparent,
          affordable, and accessible student solutions for all campuses across India.
        </p>
      </div>
    </div>
  );
}
