interface FeatureCardProps {
  title: string;
  desc: string;
  icon: any;
}

export default function FeatureCard({ title, desc, icon }: FeatureCardProps) {
  return (
    <div className="relative backdrop-blur-sm bg-white/30 bg-opacity-20 p-5 rounded-lg">
      <dt className="flex flex-col items-center md:items-start">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#ED5032] text-white">
          {icon}
        </div>
        <p className="pt-5 text-lg leading-6 font-medium font-semibold text-[#FF684B]">
          {title}
        </p>
      </dt>
      <dd className="mt-2 text-base text-gray-600 text-center md:text-left">
        {desc}
      </dd>
    </div>
  );
}
